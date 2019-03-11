var css = `
##CSS##
`;

// Injectneme CSS
GM_addStyle(css);

// https://stackoverflow.com/questions/26268816/how-to-get-a-greasemonkey-script-to-run-both-at-run-at-document-start-and-at-r
// https://stackoverflow.com/questions/39346747/tampermonkey-script-run-before-page-load
// https://github.com/greasemonkey/greasemonkey/issues/2515

(function() {
    'use strict';

    // Načteme a injectneme styly pro VisJS
    var visjscss = GM_getResourceText("visjscss");
    GM_addStyle(visjscss);

    // TODO
    //modGantt();

    // Předepsaná doba
    fixEmptyEstimatedHours();

    setActivityPage();

    // TODO
    //setAttendancePage();

    // Docházka a výkazy
    prepareTodayAttendance();

    // Timeline v sekci "Moje výkazy"
    showTimeline();
})();

/**
 * Úprava Gantt diagramu na stránce "Moje vytížení"
 */
function modGantt(){
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
        $("[data-name='issue[estimated_hours]'] > span").each(function( index, value ) {
            var $value = $(value)
            if ($value.text() === "0 hodin") {
                $value.text('---')
            }
        });
    }, 500);
}

/**
 * Nastavení stránky s výkazem času.
 * Tlačítka pro rychlý výběr aktivity a předvybrané hodnoty.
 */
function setActivityPage(){
    // <select name="time_entry[activity_id]" class="timeentry-activity" id="time_entry_activity_id">
    //     <option value="">&nbsp;</option>
    //     <option value="60">Administrátor IS/IT</option>
    //     <option value="61">Byznys analytik</option>
    //     <option value="62">Databázový specialista</option>
    //     <option value="63">Developer</option>
    //     <option value="64">IT analytik</option>
    //     <option value="65">Projektový mana\u017eer</option>
    //     <option value="66">Tester</option>
    //     <option value="67">Nedefinováno</option>
    // </select>

    $(".timeentry-activity").after('<button type="button" class="activity-set-developer button-positive">Developer</button>');
    $(document).on('click', '.activity-set-developer', function() {
        $("#time_entry_activity_id").val("63");
    });

    // Předvyplníme automaticky
    $("#time_entry_activity_id").val("63");

    // <select name="time_entry[custom_field_values][90]" class="list_cf" id="time_entry_custom_field_values_90_" data-internal-name="null">
    //     <option value="">--- Prosím vyberte ---</option>
    //     <option value="Analýza">Analýza</option>
    //     <option value="Administrace">Administrace</option>
    //     <option value="Byznys podpora">Byznys podpora</option>
    //     <option value="Dokumentace">Dokumentace</option>
    //     <option value="Interní porada">Interní porada</option>
    //     <option value="Jednání">Jednání</option>
    //     <option value="Konzultace se zákazníkem">Konzultace se zákazníkem</option>
    //     <option value="Konzultace s partnerem">Konzultace s partnerem</option>
    //     <option value="Maintenance">Maintenance</option>
    //     <option value="Marketing">Marketing</option>
    //     <option value="Nabídka">Nabídka</option>
    //     <option value="Nasazení">Nasazení</option>
    //     <option value="Prezentace">Prezentace</option>
    //     <option value="Projektové řízení">Projektové řízení</option>
    //     <option value="Řešení chyby">Řešení chyby</option>
    //     <option value="Studium">Studium</option>
    //     <option value="Školení zákazníka">Školení zákazníka</option>
    //     <option value="Testování">Testování</option>
    //     <option value="Vývoj">Vývoj</option>
    //     <option value="Dovolená">Dovolená</option>
    // </select>

    $("#time_entry_custom_field_values_90_").after('<button type="button" class="cf_90-set-analyza button-positive">Analýza</button>');
    $("#time_entry_custom_field_values_90_").after('<button type="button" class="cf_90-set-vyvoj button-positive">Vývoj</button>');

    $(document).on('click', '.cf_90-set-analyza', function() {
        $("#time_entry_custom_field_values_90_").val("Analýza");
    });

    $(document).on('click', '.cf_90-set-vyvoj', function() {
        $("#time_entry_custom_field_values_90_").val("Vývoj");
    });

    // Předvyplníme automaticky
    $("#time_entry_custom_field_values_90_").val("Vývoj");
}

/**
 * Nastavení popup okna s doch8zkou.
 * Předvybraná hodnota.
 */
function setAttendancePage(){

    // <option value="1">Kancelář</option>
    // <option value="6">Práce mimo kancelář</option>
    // <option value="2">Home office</option>
    // <option value="3">Dovolená</option>
    // <option value="4">Nemoc</option>
    // <option value="5">Lékař</option>

    $("#easy_attendance_easy_attendance_activity_id").after('<button type="button" class="attendance-set-kancelar button-positive">Kancelář</button>');

    $(document).on('click', '.attendance-set-kancelar', function() {
        $("#easy_attendance_easy_attendance_activity_id").val("1");
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
    }
    else {
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
    return hours + "h " + minutes + "m";
 }

/**
 * Příprava html elementu, kam se bude zapisovat docházka a vykázaný čas
 */
function prepareTodayAttendance() {

    // Připravíme html element pro data
    $(".easy-calendar-upcoming").after(
        '<div class="easy-calendar-upcoming">' +
        '  <div class="easy-calendar-upcoming__texts">' +
        '    <span class="icon icon-calendar todays-attendance"></span>' +
        '    <span class="block"></span>' +
        '    <span class="icon icon-timer todays-time"></span>' +
        '  </div>' +
        '</div>');

    // Spustíme počítadla
    getTodaysAttendance();
    getTodaysTimeEntries();
}

/**
 * Volání API EP a získání informací o docházce
 * easy_attendances > easy_attendance > arrival, departure
 */
function getTodaysAttendance() {

    const params = {
        arrival: "today"
    }

    // Stáhneme data
    $.getJSON("/easy_attendances.json", params, function(data) {

        // Žádný záznam - konec
        if (data.easy_attendances.length === 0) {
            const noAttendance = "zapiš si příchod... ";
            $(".todays-attendance").html(noAttendance);

            // Za minutu opakujeme
            setTimeout(getTodaysAttendance, 60 * 1000);

            return;
        }

        var totalSeconds = 0;

        // Enumerate easy_attendances
        $.each(data.easy_attendances, function(index, easyAttendance) {

            // Pro každý interval spočteme sekundy
            const arrival = easyAttendance.arrival;
            const departure = easyAttendance.departure;

            totalSeconds += getSecondsFromDateInterval(arrival, departure);
        });

        // Výsledek převedeme na hh:mm formát a zobrazíme
        const result = "Docházka: " + getHoursAndMinutesFromSeconds(totalSeconds);
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
    }

    // Stáhneme data
    $.getJSON("/time_entries.json", params, function (data) {

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

        const result = "Odpracovaný čas: " + getHoursAndMinutesFromSeconds(totalSeconds);
        $(".todays-time").html(result);

        // Za minutu opakujeme
        setTimeout(getTodaysTimeEntries, 60 * 1000);

    }); // getJSON
}

/**
 * Zobrazení odpracovaného času v grafu
 * TODO: Využít data z getTodaysTimeEntries
 */
function showTimeline() {
    // Budeme zobrazovat jen na stránce "Moje výkazy"
    var testUrl = window.location.href.search("[?&]t=5") != -1;

    //if(window.location != "https://creasoft.easyproject.cz/?t=5") {
    if (!testUrl) {
        return;
    }

    // Vygenerujeme DIV, kam se vloží Timeline, pokud ještě neexistuje
    var container = document.getElementById('visualization-timeline');
    if (container == null)
    {
        $("#tab5-list-top-middle").before('<div id="visualization-timeline"></div>');
        container = document.getElementById('visualization-timeline');
    }

    // -------------------------------------------------------
    // Todays Attendance
    // -------------------------------------------------------

    // -------------------------------------------------------
    // Time Entries
    // -------------------------------------------------------

    // Natáhneme data
    const params = {
        spent_on: "today"
    }

    $.getJSON("/time_entries.json", params, function (data) {

        // Žádný záznam - konec
        if (data.time_entries.length === 0) {
            return;
        }

        //  {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
        var visData = $.map(data.time_entries, function(timeEntry, index) {

            var item = {};

            // V datech jsou hodiny jako desetinné číslo
            var hours = timeEntry.hours;

            // Převedeme je na minuty
            var minutes = 60 * Number(hours);

            // Pro tooltip p5evedeme na formát hh:mm
            var timeString = getHoursAndMinutesFromSeconds(minutes * 60);

            // Datum vytvoření odpovídá konci času
            var end = new Date(timeEntry.created_on);
            var start = moment(end).subtract(minutes, 'm').toDate();

            // texty k zobrazení
            // TODO: Issue text, bug/issue icon, project link

            // text do buňky (rozhodujeme zda link je na projekt, nebo na issue)
            var text = timeEntry.custom_fields[0].value;
            if (timeEntry.issue) {
                text = "<a href='/issues/" + timeEntry.issue.id + "' >" + timeEntry.custom_fields[0].value + "</a>";
            }

            // tooltip
            var tooltip =
                "<span><strong>Projekt: </strong>" + timeEntry.project.name + "</span><br />" +
                "<span><strong>Od-do: </strong>" + moment(start).format('HH:mm:ss') + " - " + moment(end).format('HH:mm:ss') + " [" + timeString + "]</span><br />" +
                "<span><strong>Aktivita: </strong>" + timeEntry.custom_fields[0].value + "</span>";

            item.id = timeEntry.id;
            item.content = text;
            item.title = tooltip;
            item.start = start;
            item.end = end;

            return item;
        });

        // Create a DataSet (allows two way data-binding)
        var items = new vis.DataSet(visData);

        // Configuration for the Timeline
        var options = {
            locale: 'cs',
            start: moment().startOf('day').toDate().setHours(6),
            end: moment().startOf('day').toDate().setHours(18),
            zoomable: false
        };

        // Create a Timeline
        var timeline = new vis.Timeline(container, items, options);

    }); // getJSON
}
