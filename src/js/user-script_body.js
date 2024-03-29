var css = `
##CSS##
`;

var observer = new MutationObserver(mutationCallback);

// Injectneme CSS
GM_addStyle(css);

// https://stackoverflow.com/questions/26268816/how-to-get-a-greasemonkey-script-to-run-both-at-run-at-document-start-and-at-r
// https://stackoverflow.com/questions/39346747/tampermonkey-script-run-before-page-load
// https://github.com/greasemonkey/greasemonkey/issues/2515

(function() {
    "use strict";

    // Načteme a injectneme styly pro VisJS
    var visjscss = GM_getResourceText("visjscss");
    GM_addStyle(visjscss);

    startObserving();

    forceCollapsedSidebar();

    // Předepsaná doba
    fixEmptyEstimatedHours();

    // Nastavení role a aktivity na výkazu času
    const userId = getUserInfo();
    setDefaultRoleAndActivity(userId);

    // Header EP pro docházku, výkazy atd.
    prepareHeaderHtmlMarkup();

    // Spustíme počítadla
    getTodaysTimeEntries();
    generateUtilization();

    // Timeline v sekci "Moje výkazy"
    showTimeline(userId);
})();

/**
 * Callback pro observer - detekci změn v DOM
 */
function mutationCallback(mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList')
        {
            observer.disconnect();

            enhanceAgileCards();

            startObserving();
        }
    }
}

/**
 * Start sledování změn DOM
 */
function startObserving() {
    observer.observe(document, {childList: true, subtree: true});
}

/**
 * Rozšíření použitelnosti Scrum/Agile karet
 */
function enhanceAgileCards() {

    const cards = document.querySelectorAll(".agile__item");
    for (let i = 0; i < cards.length; i++) {

        let card = cards[i];

        $(card).off('mousedown.listItem');
        //card.removeEventListener('mousedown.listItem');

        // H3 element k modifikaci
        let title = card.querySelector('h3.agile__card__title');

        let itemId = card.classList[1].match('item_([0-9]+)')[1];
        if (itemId) {
            title.innerHTML = "<a href='https://creasoft.easyproject.cz/issues/" + itemId+ "'>" + title.innerText + "</a>";
        }
    }
}

/**
 * Přepne levé menu na minimalizované
 */
function forceCollapsedSidebar() {
    $("body").addClass("top_menu--collapsed");
    $("#top-menu").addClass("collapsed");
}

/**
 * Úprava zobrazení sloupce "Předepsaná doba". Místo "0 hodin" zobrazíme jen "---".
 */
function fixEmptyEstimatedHours() {
    // Zpozdíme, počkáme na načtení dat
    setTimeout(function() {
        const $elements = $("[data-name='issue[estimated_hours]'] > span, .total_estimated_hours > .easy-entity-list__item-attribute-content > span");
        if (!$elements) {
            return;
        }

        $elements.each(function(index, value) {
            var $value = $(value);
            if ($value.text() === "0 hodin") {
                $value.text("---");
            }
        });
    }, 1000);
}

/**
 * Funkce pro načtení informací o uživateli
 */
function getUserInfo() {
    // EP ukládá do global scope vlastní nastavení
    return EASY.currentUser.id;
}

/**
 * Nastavení stránky s výkazem času - Předvolení role
 * @param {number} userId Id uživatele, pro kterého chceme nastavit výchozí roli
 */
function setDefaultRoleAndActivity(userId) {
    if (!userId) {
        return;
    }

    // Zjistíme výchozí roli pro uživatele
    const roleToSelect = getDefaultRoleForUser(userId);
    if (!roleToSelect) {
        return;
    }

    // Radios root
    const isAnyRadioSelected =
        $(".timeentry-activities:input:checked").length !== 0;
    if (!isAnyRadioSelected) {
        // Předvyplníme automaticky zvolenou roli do radio buttonu
        const $roleRadio = document.getElementById(
            "radio-timeentry-time_entry-" + roleToSelect
        );
        if ($roleRadio) {
            $roleRadio.checked = true;
        }
    }
    // Nastavení aktivity
    setDefaultActivity(roleToSelect);
}

/**
 * Nastavení stránky s výkazem času - Předvolení aktivity + Tlačítka pro rychlý výběr
 * @param {number} roleId Id role, pro kterou budeme vracet výchozí aktivitu
 */
function setDefaultActivity(roleId) {
    if (!roleId) {
        return;
    }

    const $activityCombo = $("#time_entry_custom_field_values_90_");
    // Doplníme buttony na předvolení aktivit vedle komba
    if ($activityCombo) {
        generateQuickActivities();
    }

    // Zjistíme výchozí aktivitu pro uživatele
    const activityToSelect = getDefaultActivity(roleId);
    if (activityToSelect) {
        // Předvyplníme automaticky zvolenou aktivitu, pokud není kombo naplněno
        if ($activityCombo) {
            const hasValue = $activityCombo.val() !== "";

            if (!hasValue) {
                $activityCombo.val(activityToSelect);
            }
        }
    }
}

/**
 * Funkce na základě uživatele vrátí jeho default roli
 * @param {number} userId Id uživatele, pro kterého chceme nastavit výchozí roli
 */
function getDefaultRoleForUser(userId) {
    // Dostupné role:
    // -----------------------
    // 60 - Administrátor
    // 61 - Byznys analytik
    // 63 - Programátor
    // 64 - Analytik
    // 65 - Produktový manažer
    // 66 - Tester
    // 69 - Delivery manažer

    return 63;
}

/**
 * Funkce na základě uživatele a role vrátí default aktivitu
 * @param {number} roleId Id role, pro kterou budeme vracet výchozí aktivitu
 */
function getDefaultActivity(roleId) {
    // Dostupné aktivity:
    // ------------------
    // Maintenance
    // Operativní vývoj
    // Strategický vývoj

    return "Maintenance";
}

/**
 * Vygenerování rychlých buttonků k nastavení aktivit
 */
function generateQuickActivities() {
    const $activityCombo = $("#time_entry_custom_field_values_90_");
    if (!$activityCombo) {
        return;
    }

    // <select name="time_entry[custom_field_values][90]" class="list_cf" id="time_entry_custom_field_values_90_" >
    //     <option value="">--- Prosím vyberte ---</option>
    //     <option value="Maintenance">Maintenance</option>
    //     <option value="Operativní vývoj">Operativní vývoj</option>
    //     <option value="Strategický vývoj">Strategický vývoj</option>
    // </select>;

    // 3 - Strategický vývoj
    $activityCombo.after(
        '<button type="button" class="cf_90-set-strategicky-vyvoj button-positive">SV</button>'
    );
    $(document).on("click", ".cf_90-set-strategicky-vyvoj", function() {
        $activityCombo.val("Strategický vývoj");
    });

    // 2 - Operativní vývoj
    $activityCombo.after(
        '<button type="button" class="cf_90-set-operativni-vyvoj button-positive">OV</button>'
    );
    $(document).on("click", ".cf_90-set-operativni-vyvoj", function() {
        $activityCombo.val("Operativní vývoj");
    });

    // 1 - Maintenance
    $activityCombo.after(
        '<button type="button" class="cf_90-set-maintenance button-positive">M</button>'
    );
    $(document).on("click", ".cf_90-set-maintenance", function() {
        $activityCombo.val("Maintenance");
    });
}

/**
 * Vytvoří nový záznam docházky ve stavu "Kancelář" a refreshne stránku
 * Je to rychlá volba linku v headeru "Zapiš příchod"
 */
function setAttendance() {
    // <option value="1">Kancelář</option>
    // <option value="6">Práce mimo kancelář</option>
    // <option value="2">Home office</option>
    // <option value="3">Dovolená</option>
    // <option value="4">Nemoc</option>
    // <option value="5">Lékař</option>

    var params = $.param({
        "easy_attendance[easy_attendance_activity_id]": 1,
        "easy_attendance[arrival]": new moment().toString()
    });

    $.ajax({
        type: "POST",
        url: "/easy_attendances",
        data: params,
        contentType: "application/x-www-form-urlencoded",
        success: (window.location = window.location)
    });
}

/**
 * Funkce, která spočítá rozdíl mězi 2 daty v sekundách.
 * Pokud není datum do zadáno, bere se aktuální timestamp.
 * Vstup je datum jako string. Interně se převede na Date()
 */
function getSecondsFromDateInterval(dateFromString, dateToString) {
    // Převedene vstupní string na datum
    const dateFrom = new Date(dateFromString);
    var dateTo = null;

    // Pokud není koncové datum definované, bereme aktuální timestamp
    if (!dateToString) {
        // EP používá knihovnu MomentJS - super :-)
        dateTo = new moment();
    } else {
        dateTo = new Date(dateToString);
    }

    // Celkový rozdíl mezi daty v sekundách
    var seconds = Math.abs(dateTo - dateFrom) / 1000;

    return seconds;
}

/**
 * Funkce, která převede sekundy na formát string hh:mm
 */
function getHoursAndMinutesFromSeconds(delta) {
    // Spočítáme (a odečteme) celé dny
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // Spočítáme (a odečteme) celé hodiny
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // Spočítáme (a odečteme) celé minuty
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // A zůstanou nám sekundy
    const seconds = delta % 60;

    // Naformátujeme výstup
    return days * 24 + hours + "h " + minutes + "m";
}

/**
 * Funkce, která převede sekundy na hodiny a vrátí des. číslo
 */
function getHoursFromSeconds(delta) {
    const hours = delta / 3600;
    return hours;
}

/**
 * Příprava html elementu, kam se bude zapisovat docházka a vykázaný čas
 */
function prepareHeaderHtmlMarkup() {
    const attendanceHtml =
        '<div class="easy-calendar-upcoming__texts">' +
        '    <span class="icon icon-timer todays-time"></span>' +
        "</div>";

    const utilizationHtml =
        '<div class="easy-calendar-upcoming__texts">' +
        '    <span class="js-workdays"></span>' +
        '    <span class="block"></span>' +
        '    <span class="js-workdays-detail"></span>' +
        "</div>";

    // Připravíme html element pro data
    $(".easy-calendar-upcoming")
        .after(utilizationHtml)
        .after(attendanceHtml);
}

/**
 * Převede objekt parametrů na url search string
 * @param {any} params
 */
function makeUrlSearchString(params) {
    return params ? "?" + Object.keys(params).map(key => [key, params[key]].map(encodeURIComponent).join("=")).join("&") : "";
}

/**
 * Volání API EP a získání informací o odpracovaném čase
 * time_entries > time_entry > hours
 */
function getTodaysTimeEntries() {
    const params = {
        spent_on: "today",
        set_filter: 1,
        user_id: getUserInfo(),
        _: new Date().getTime() // Cache busting
    };

    // Stáhneme data
    $.getJSON("/time_entries.json", params, function(data) {
        // Žádný záznam - konec
        if (data.time_entries.length === 0) {
            const noTimeEntry = "zapiš si čas... ";
            $(".todays-time").html(noTimeEntry);

            // Za minutu opakujeme
            setTimeout(getTodaysTimeEntries, 60 * 1000);

            return;
        }

        var totalSeconds = 0;

        // Enumerate time_entries
        $.each(data.time_entries, function(index, timeEntry) {
            // V datech jsou hodiny jako desetinné číslo
            const hours = timeEntry.hours;

            // Převedeme je na minuty
            const minutes = 60 * Number(hours);
            totalSeconds += minutes * 60;
        });

        const result =
            "Vykázáno: " + getHoursAndMinutesFromSeconds(totalSeconds);
        $(".todays-time").html(result);

        // Za minutu opakujeme
        setTimeout(getTodaysTimeEntries, 60 * 1000);
    }); // getJSON
}

/**
 * Vrátí, kolikátý je dnes pracovní den v měsíci a kolik pracovních dnů měsíc má.
 * Pokud je víkend, počítá se jako poslední den pátek.
 * Vrací objekt { currentWeekday, totalWeekdays }
 */
function getWeekdaysOfCurrentMonth() {
    // Svátky, které nejsou pracovním dnem.
    // Chybí výpočet data pro Velikonoce - zatím fixně
    // formát je [měsíc, den]

    // rok 2023
    const holidays = [
        [1, 1], // Nový rok
        [4, 7], // Velký pátek - TODO (dynamicky)
        [4, 10], // Velikonoční pondělí - TODO (dynamicky)
        [5, 1], // Svátek práce
        [5, 8], //  Den vítězství
        [7, 5], // Den věrozvěstů Cyrila a Metoděje
        [7, 6], // Den upálení mistra Jana Husa
        [9, 28], // Den české státnosti
        [10, 28], // Den vzniku Československa
        [11, 17], // Den boje za svobodu a demokracii
        [12, 24], // Štědrý den
        [12, 25], // 1. svátek vánoční
        [12, 26] // 2. svátek vánoční
    ];

    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var year = currentDate.getYear() + 1900;
    var month = currentDate.getMonth();

    var totalWeekdays = 0;
    var currentWeekday = 0;

    for (var day = 1; day <= 31; day++) {
        var t = new Date(year, month, day);

        // Měsíc má méně než 31 dní
        if (t.getMonth() > month) {
            break;
        }

        // Je to víkend (0 = neděle, 6 = sobota)
        if (t.getDay() == 0 || t.getDay() == 6) {
            continue;
        }

        // Svátek
        if (holidays.some(h => h[0] - 1 === month && h[1] === day)) {
            continue;
        }

        // Celkově pracovní dny v měsíci
        totalWeekdays++;

        // Uplynulé pracovní dny
        if (t.getDate() <= currentDay) {
            currentWeekday++;
        }
    }

    return {
        currentWeekday,
        totalWeekdays
    };
}

/**
 * Načtení jedné stránky Time Entries
 */
async function getTimeEntriesAsync(url, params) {
    const urlWithParams = url + makeUrlSearchString(params);
    const response = await fetch(urlWithParams);
    const data = await response.json();

    return data;
}

/**
 * Rekurzivní načtení všech stránek Time Entries dle parametru
 */
async function getTimeEntriesRecursiveAsync(url, params) {
    const data = await getTimeEntriesAsync(url, params);
    var results = data.time_entries;

    // Kolik položek je na dalších stranách?
    const toProcessOnNextPages =
        data.total_count - (data.offset + 1) * data.limit;

    // Je více stránek k dotažení?
    if (toProcessOnNextPages > 0) {
        // Posuneme offset o velikost stránky
        params.offset = data.offset + data.limit;

        // a načteme další data
        const nextPageData = await getTimeEntriesAsync(url, params);
        const nextPageResults = nextPageData.time_entries;

        return results.concat(nextPageResults);
    } else {
        return results;
    }
}

/**
 * Načtení jedné stránky Attendances
 */
async function getAttendancesAsync(url, params) {
    const urlWithParams = url + makeUrlSearchString(params);
    const response = await fetch(urlWithParams);
    const data = await response.json();

    return data;
}

/**
 * Rekurzivní načtení všech stránek Attendances dle parametru
 */
async function getAttendancesRecursiveAsync(url, params) {
    const data = await getAttendancesAsync(url, params);
    var results = data.easy_attendances;

    // Kolik položek je na dalších stranách?
    const toProcessOnNextPages =
        data.total_count - (data.offset + 1) * data.limit;

    // Je více stránek k dotažení?
    if (toProcessOnNextPages > 0) {
        // Posuneme offset o velikost stránky
        params.offset = data.offset + data.limit;

        // a načteme další data
        const nextPageData = await getAttendancesAsync(url, params);
        const nextPageResults = nextPageData.easy_attendances;

        return results.concat(nextPageResults);
    } else {
        return results;
    }
}

/**
 * Vygeneruje utilizaci a vypíše detail o aktuálním měsíci.
 * Počet pracovních dnů, vykázaná doba, ...
 */
async function generateUtilization() {
    var totalSeconds = 0;

    const attendanceParams = {
        arrival: "current_month",
        limit: 100, // max limit, EP API víc nepovolí
        offset: 0,
        set_filter: 1,
        user_id: getUserInfo(),
        _: new Date().getTime() // Cache busting
    };

    const timeEntriesParams = {
        spent_on: "current_month",
        limit: 100, // max limit, EP API víc nepovolí
        offset: 0,
        set_filter: 1,
        user_id: getUserInfo(),
        _: new Date().getTime() // Cache busting
    };

    const attendances = await getAttendancesRecursiveAsync(
        "/easy_attendances.json",
        attendanceParams
    );
    const timeEntries = await getTimeEntriesRecursiveAsync(
        "/time_entries.json",
        timeEntriesParams
    );

    // Nepřítomnost (k dnešnímu dni) - dovolená/lékař/nemoc
    var absence = 0;

    // Nepřítomnost (naplánovaná dále v měsíci)- dovolená/lékař/nemoc
    var absenceFuture = 0;

    const today = new moment();

    // Enumerate easy_attendances
    $.each(attendances, function(index, attendance) {

        // Pouze do dnešního dne, EP vrací data za celý měsíc
        const arrival = moment(attendance.arrival);

        // Hledáme nepřítomnost
        // 5 - Lékař
        // 4 - Nemoc
        // 3 - Dovolená
        if (attendance.easy_attendance_activity.id === 3 || attendance.easy_attendance_activity.id === 4) {
            if (arrival.isSameOrBefore(today)) {
                absence++;
            } else {
                absenceFuture++;
            }
        }

    });

    // Enumerate time_entries
    $.each(timeEntries, function(index, timeEntry) {
        // Pouze do dnešního dne, EP vrací data za celý měsíc
        const spentOn = moment(timeEntry.spent_on);
        if (spentOn.isSameOrBefore(today)) {
            // V datech jsou hodiny jako desetinné číslo
            const hours = timeEntry.hours;

            // Převedeme je na minuty
            const minutes = 60 * Number(hours);
            totalSeconds += minutes * 60;
        }
    });

    // Očekává se vykázáno 7 hodin denně
    const expectedSecondsPerDay = 7 * 60 * 60;

    // Kolikátý pracovní den dneska je a kolik je jich v měsíci
    const weekDays = getWeekdaysOfCurrentMonth();

    // Kolik se očekává vykázáno k dnešnímu dni (bere jen pracovní)
    const expectedSeconds = expectedSecondsPerDay * weekDays.currentWeekday;

    // Kolik zbývá do naplnění požadované doby?
    const missingSeconds = Math.abs(Math.max(0, expectedSeconds - totalSeconds));
    const missingHours = getHoursAndMinutesFromSeconds(missingSeconds);

    const hours = getHoursFromSeconds(totalSeconds);
    const daysWithoutVacations = weekDays.currentWeekday; // - absence;
    const average = daysWithoutVacations > 0 ? (hours / daysWithoutVacations) : 0;
    const utilization = daysWithoutVacations > 0 ? Math.floor((hours / (daysWithoutVacations * 8)) * 100) : 0;

    // Fond pracovní doby počítá s 8 hodinami na den
    const workdaysInfo =
        "Pracovní dny: " + weekDays.currentWeekday + "/" + weekDays.totalWeekdays + ", " +
        "nepřítomnost (dny): " + absence + "/" + absenceFuture + ", " +
        "fond prac. doby (h): " +  weekDays.currentWeekday * 8 + "/" + weekDays.totalWeekdays * 8;

    const workdaysDetailInfo =
        "Vykázáno celkem: " + getHoursAndMinutesFromSeconds(totalSeconds) + ", " + "tj. průměr/MD " + average.toFixed(2) + "h [" + utilization + "%], " +
        "zbývá vykázat: " + missingHours;

    $(".js-workdays").html(workdaysInfo);
    $(".js-workdays-detail").html(workdaysDetailInfo);
}

/**
 * Zobrazení odpracovaného času v grafu pro uživatele a datum
 * TODO: Využít data z getTodaysTimeEntries
 * @param {number} userId Id uživatele, pro kterého chceme zobrazit timeline
 * @param {string} forDateAsString Datum, ve formátu "YYYY-MM-DD", pro které chceme zobrazit timeline
 */
function showTimeline(userId, forDateAsString) {
    // Budeme zobrazovat jen na stránce "Moje výkazy"
    var testUrl = window.location.href.search("[?&]t=6") != -1;

    //if(window.location != "https://creasoft.easyproject.cz/?t=5") {
    if (!testUrl) {
        return;
    }

    // Vygenerujeme DIV, kam se vloží Timeline, pokud ještě neexistuje
    var container = document.getElementById("visualization-timeline");
    if (container == null) {
        $("#tab6-list-top-middle").before(
            '<div id="visualization-timeline"></div>'
        );
        container = document.getElementById("visualization-timeline");
    }

    // Parametry pro queries
    var timeEntriesParams;
    if (forDateAsString) {
        timeEntriesParams = {
            period_type: 2,
            from: forDateAsString,
            to: forDateAsString,
            set_filter: 1,
            user_id: userId,
            _: new Date().getTime() // Cache busting
        };
    }
    else
    {
        timeEntriesParams = {
            spent_on: "today",
            set_filter: 1,
            user_id: userId,
            _: new Date().getTime() // Cache busting
        };
    }

    var todaysAttendanceParams;
    if (forDateAsString) {
        todaysAttendanceParams = {
            arrival: forDateAsString + "|" + forDateAsString,
            set_filter: 1,
            user_id: userId,
            _: new Date().getTime() // Cache busting
        };
    }
    else {
        todaysAttendanceParams = {
            arrival: "today",
            set_filter: 1,
            user_id: userId,
            _: new Date().getTime() // Cache busting
        };
    }

    // Natáhneme data
    $.when(
        $.getJSON("/easy_attendances.json", todaysAttendanceParams),
        $.getJSON("/time_entries.json", timeEntriesParams)
    ).done(function(todaysAttendance, timeEntries) {
        var todaysAttendanceData = generateTodaysAttendanceVisData(
            todaysAttendance
        );
        var timeEntriesData = generateTimeEntriesVisData(timeEntries);

        var visData = [];
        if (timeEntriesData.length > 0) {
            visData = visData.concat(timeEntriesData);
        }

        if (todaysAttendanceData.length > 0) {
            visData = visData.concat(todaysAttendanceData);
        }

        // Create a DataSet (allows two way data-binding)
        var items = new vis.DataSet(visData);

        // Configuration for the Timeline
        var options = {
            locale: "cs",
            zoomable: false
        };

        var groups = new vis.DataSet([
            { id: 1, content: "Docházka" },
            { id: 2, content: "Výkazy" }
        ]);

        // Create a Timeline
        var timeline = new vis.Timeline(container, items, groups, options);
    });
}

/**
 * Transformuje Today Attendance na data pro zobrazení v grafu
 */
function generateTodaysAttendanceVisData(data) {
    var visData = $.map(data[0].easy_attendances, function(
        todayAttendance,
        index
    ) {
        var item = {};

        // Pro každý interval spočteme sekundy
        const start = todayAttendance.arrival;
        const end = todayAttendance.departure || new moment();

        item.id = todayAttendance.id;
        item.content = todayAttendance.easy_attendance_activity.name;
        //item.title = tooltip;
        item.type = "background";
        //item.className = "negative";
        item.start = start;
        item.end = end;
        item.group = 1;

        return item;
    });

    return visData;
}

/**
 * Transformuje Time Entries na data pro zobrazení v grafu
 */
function generateTimeEntriesVisData(data) {
    //  {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
    var visData = $.map(data[0].time_entries, function(timeEntry, index) {
        var item = {};

        // V datech jsou hodiny jako desetinné číslo
        var hours = timeEntry.hours;

        // Převedeme je na minuty
        var minutes = 60 * Number(hours);

        // Pro tooltip převedeme na formát hh:mm
        var timeString = getHoursAndMinutesFromSeconds(minutes * 60);

        // Datum vytvoření odpovídá konci času
        var end = new Date(timeEntry.created_on);
        var start = moment(end)
            .subtract(minutes, "m")
            .toDate();

        // texty k zobrazení
        // TODO: Issue text, bug/issue icon, project link

        // text do buňky (rozhodujeme zda link je na projekt, nebo na issue)
        var text = timeEntry.custom_fields[0].value;
        if (timeEntry.issue) {
            text =
                "<a href='/issues/" +
                timeEntry.issue.id +
                "' >" +
                timeEntry.custom_fields[0].value +
                "</a>";
        }

        // tooltip
        var tooltip =
            "<span><strong>Projekt: </strong>" +
            timeEntry.project.name +
            "</span><br />" +
            "<span><strong>Od-do: </strong>" +
            moment(start).format("HH:mm:ss") +
            " - " +
            moment(end).format("HH:mm:ss") +
            " [" +
            timeString +
            "]</span><br />" +
            "<span><strong>Aktivita: </strong>" +
            timeEntry.custom_fields[0].value +
            "</span>";

        item.id = timeEntry.id;
        item.content = text;
        item.title = tooltip;
        item.start = start;
        item.end = end;
        item.group = 2;

        return item;
    });

    return visData;
}
