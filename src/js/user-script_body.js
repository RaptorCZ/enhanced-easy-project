var css = `
##CSS##
`;

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

    // TODO
    //modGantt();

    // Předepsaná doba
    fixEmptyEstimatedHours();

    // Nastavení role a aktivity na výkazu času
    const userId = getUserInfo();
    setDefaultRoleAndActivity(userId);

    // Header EP pro docházku, výkazy atd.
    prepareHeaderHtmlMarkup();

    // Spustíme počítadla
    getTodaysAttendance();
    getTodaysTimeEntries();
    generateUtilization();

    // Timeline v sekci "Moje výkazy"
    showTimeline();
})();

/**
 * Úprava Gantt diagramu na stránce "Moje vytížení"
 */
function modGantt() {
    // Aktivace 'Zobrazit projekty' v Ganttu Osobní vytížení zdrojů
    $("#button_resource_with_projects").click();

    // Rozbalení všech projektů
    setTimeout(function() {
        $(".gantt_grid .gantt_open").click();
    }, 500);
}

/**
 * Úprava zobrazení sloupce "Předepsaná doba". Místo "0 hodin" zobrazíme jen "---".
 */
function fixEmptyEstimatedHours() {
    // Zpozdíme, počkáme na načtení dat
    setTimeout(function() {
        const $elements = $("[data-name='issue[estimated_hours]'] > span");
        if (!$elements) {
            return;
        }

        $elements.each(function(index, value) {
            var $value = $(value);
            if ($value.text() === "0 hodin") {
                $value.text("---");
            }
        });
    }, 500);
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

    // 103 - René
    if (userId === 103) {
        return 63;
    }

    // 105 - Martin
    if (userId === 105) {
        return 66;
    }

    return null;
}

/**
 * Funkce na základě uživatele a role vrátí default aktivitu
 * @param {number} roleId Id role, pro kterou budeme vracet výchozí aktivitu
 */
function getDefaultActivity(roleId) {
    // Dostupné aktivity:
    // ------------------
    // Analýza
    // Administrace
    // Dokumentace
    // Meeting
    // Nacenění
    // Nasazení
    // Projektové řízení
    // Řešení chyby
    // Testování
    // Vývoj
    // Vzdělávání
    // Dovolená

    // 60 - Administrátor
    if (roleId === 60) {
        return "Administrace";
    }

    // 61 - Byznys analytik
    if (roleId === 61) {
        return "Analýza";
    }

    // 63 - Programátor
    if (roleId === 63) {
        return "Vývoj";
    }

    // 64 - Analytik
    if (roleId === 64) {
        return "Analýza";
    }

    // 65 - Produktový manažer
    if (roleId === 65) {
        return "Projektové řízení";
    }

    // 66 - Tester
    if (roleId === 66) {
        return "Testování";
    }

    // 69 - Delivery manažer
    if (roleId === 69) {
        return "Nasazení";
    }

    return null;
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
    //     <option value="Analýza">Analýza</option>
    //     <option value="Administrace">Administrace</option>
    //     <option value="Dokumentace">Dokumentace</option>
    //     <option value="Meeting">Meeting</option>
    //     <option value="Nacenění">Nacenění</option>
    //     <option value="Nasazení">Nasazení</option>
    //     <option value="Projektové řízení">Projektové řízení</option>
    //     <option value="Řešení chyby">Řešení chyby</option>
    //     <option value="Testování">Testování</option>
    //     <option value="Vývoj">Vývoj</option>
    //     <option value="Vzdělávání">Vzdělávání</option>
    //     <option value="Dovolená">Dovolená</option>
    // </select>;

    // 3 - Řešení chyby
    $activityCombo.after(
        '<button type="button" class="cf_90-set-reseni-chyby button-positive">Řešení chyby</button>'
    );
    $(document).on("click", ".cf_90-set-reseni-chyby", function() {
        $activityCombo.val("Řešení chyby");
    });

    // 2 - Vývoj
    $activityCombo.after(
        '<button type="button" class="cf_90-set-vyvoj button-positive">Vývoj</button>'
    );
    $(document).on("click", ".cf_90-set-vyvoj", function() {
        $activityCombo.val("Vývoj");
    });

    // 1 - Analýza
    $activityCombo.after(
        '<button type="button" class="cf_90-set-analyza button-positive">Analýza</button>'
    );
    $(document).on("click", ".cf_90-set-analyza", function() {
        $activityCombo.val("Analýza");
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
        '    <span style="display: flex;">' +
        '        <span class="icon icon-calendar todays-attendance"></span>' +
        '        <a class="todays-attendance-link" style="margin-left: 1rem;" href="#"></a>' +
        "    </span>" +
        '    <span class="block"></span>' +
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
 * Volání API EP a získání informací o docházce
 * easy_attendances > easy_attendance > arrival, departure
 * /easy_attendances/arrival?arrival_at=2019-03-17&back_url=https%3A%2F%2Fcreasoft.easyproject.cz%2F%3Ft%3D5
 * /easy_attendances/4962/departure?back_url=https%3A%2F%2Fcreasoft.easyproject.cz%2F%3Ft%3D5
 */
function getTodaysAttendance() {
    const params = {
        arrival: "today"
    };

    const $todaysAttendanceLink = $(".todays-attendance-link");
    const returnUrl = encodeURIComponent(window.location.href);

    // Pro jistotu
    $todaysAttendanceLink.off("click");

    // Link na zápis
    $todaysAttendanceLink.click(function() {
        setAttendance();
    });

    $todaysAttendanceLink.html("[Zapiš příchod do kanceláře]");

    // Stáhneme data
    $.getJSON("/easy_attendances.json", params, function(data) {
        // Žádný záznam - konec
        if (data.easy_attendances.length === 0) {
            const noAttendance = "zapiš si příchod...";
            $(".todays-attendance").html(noAttendance);

            // Za minutu opakujeme
            setTimeout(getTodaysAttendance, 60 * 1000);

            return;
        }

        var totalSeconds = 0;
        var displayDepartureLink = false;

        // Enumerate easy_attendances
        $.each(data.easy_attendances, function(index, easyAttendance) {
            // Pro každý interval spočteme sekundy
            const arrival = easyAttendance.arrival;
            const departure = easyAttendance.departure;

            totalSeconds += getSecondsFromDateInterval(arrival, departure);

            // Pokud není hodnota "departure" nastavena, znamená to, že je tato plložka "in progress"
            // a tedy si vezmeme její "id" a to použijeme do linku na konec
            if (!easyAttendance.departure && !displayDepartureLink) {
                // Pro jistotu
                $todaysAttendanceLink.off("click");

                const departureLink =
                    "/easy_attendances/" +
                    easyAttendance.id +
                    "/departure?back_url=" +
                    returnUrl;

                $todaysAttendanceLink.attr("href", departureLink);
                $todaysAttendanceLink.removeAttr("data-remote");
                $todaysAttendanceLink.html("[Zapiš odchod]");

                displayDepartureLink = true;
            }
        });

        // Výsledek převedeme na hh:mm formát a zobrazíme
        var result = "Docházka: " + getHoursAndMinutesFromSeconds(totalSeconds);
        $(".todays-attendance").html(result);

        // Za minutu opakujeme
        setTimeout(getTodaysAttendance, 60 * 1000);
    }); // getJSON
}

/**
 * Volání API EP a získání informací o odpracovaném čase
 * time_entries > time_entry > hours
 */
function getTodaysTimeEntries() {
    const params = {
        spent_on: "today"
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
    const holidays = [
        [1, 1], // Nový rok
        [4, 19], // Velký pátek
        [4, 22], // Velikonoční pondělí - TODO
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

    // Cache busting
    const ts = new Date().getTime();
    const urlWithParams = url + "?spent_on=" + params.spent_on + "&limit=" + params.limit + "&offset=" + params.offset + "&_=" + ts;

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
    const toProcessOnNextPages = data.total_count - (data.offset + 1) * data.limit;

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

    // Cache busting
    const ts = new Date().getTime();
    const urlWithParams = url + "?arrival=" + params.arrival + "&limit=" + params.limit + "&offset=" + params.offset + "&_=" + ts;

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
    const toProcessOnNextPages = data.total_count - (data.offset + 1) * data.limit;

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
    // Nepřítomnost - dovolená/lékař/nemoc
    var absence = 0;

    const attendanceParams = {
        arrival: "current_month",
        limit: 100, // max limit, EP API víc nepovolí
        offset: 0
    };

    const timeEntriesParams = {
        spent_on: "current_month",
        limit: 100, // max limit, EP API víc nepovolí
        offset: 0
    };

    const attendances = await getAttendancesRecursiveAsync("/easy_attendances.json", attendanceParams);
    const timeEntries = await getTimeEntriesRecursiveAsync("/time_entries.json", timeEntriesParams);

    // Enumerate easy_attendances
    $.each(attendances, function(index, attendance) {
        // Hledáme nepřítomnost
        // 5 - Lékař
        // 4 - Nemoc
        // 3 - Dovolená
        if (attendance.easy_attendance_activity.id === 3 || attendance.easy_attendance_activity.id === 4) {
            absence++;
        }
    });

    // Enumerate time_entries
    $.each(timeEntries, function(index, timeEntry) {
        // V datech jsou hodiny jako desetinné číslo
        const hours = timeEntry.hours;

        // Převedeme je na minuty
        const minutes = 60 * Number(hours);
        totalSeconds += minutes * 60;
    });

    const weekDays = getWeekdaysOfCurrentMonth();
    const hours = getHoursFromSeconds(totalSeconds);
    const daysWithoutVacations = weekDays.currentWeekday - absence;
    const average = hours / daysWithoutVacations;
    const utilization = Math.floor(
        (hours / (daysWithoutVacations * 8)) * 100
    );

    // Fond pracovní doby počítá s 8 hodinami na den
    const workdaysInfo =
        "Pracovní dny: " + weekDays.currentWeekday + "/" + weekDays.totalWeekdays + ", " +
        "Nepřítomnost (dny): " + absence + ", " +
        "Fond prac. doby (h): " + weekDays.currentWeekday * 8 + "/" + weekDays.totalWeekdays * 8;

    const workdaysDetailInfo =
        "Vykázáno celkem: " + getHoursAndMinutesFromSeconds(totalSeconds) + ", " +
        "tj. průměr/MD " + average.toFixed(2) + "h [" + utilization + "%]";

    $(".js-workdays").html(workdaysInfo);
    $(".js-workdays-detail").html(workdaysDetailInfo);
}

/**
 * Zobrazení odpracovaného času v grafu
 * TODO: Využít data z getTodaysTimeEntries
 */
function showTimeline() {
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
    const timeEntriesParams = {
        spent_on: "today"
    };

    const todaysAttendanceParams = {
        arrival: "today"
    };

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
