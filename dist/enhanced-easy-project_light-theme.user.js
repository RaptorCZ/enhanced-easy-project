// ==UserScript==
// @name         Enhanced Easy Project - Light Theme
// @description  UI Mod for Easy Project
// @author       Raptor
// @namespace    eep
// @version      1.3.0
// @downloadURL  https://github.com/RaptorCZ/enhanced-easy-project/raw/master/dist/enhanced-easy-project_light-theme.user.js
// @updateURL    https://github.com/RaptorCZ/enhanced-easy-project/raw/master/dist/enhanced-easy-project_light-theme.user.js
// @supportURL   https://github.com/RaptorCZ/enhanced-easy-project/issues
// @homepage     https://github.com/RaptorCZ/enhanced-easy-project
// @icon         https://github.com/RaptorCZ/enhanced-easy-project/raw/master/dist/icon.png
// @include      *creasoft.easyproject.cz*
// @run-at       document-end
// @require      https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js
// @resource     visjscss https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==
/*
Changelog:

    https://github.com/RaptorCZ/enhanced-easy-project/blob/master/CHANGELOG.md

*/

var css = `
/**
 * Page header
 */
#top-menu {
  position: fixed !important;
}
#easy_page_tabs {
  margin-top: 5rem !important;
}
#header {
  padding-top: 5.5rem !important;
}
.easy-content-page {
  margin-top: 4rem !important;
}
/**
 * Odstranění znaku stromového zobrazení v gridech a samotných odsazení
 */
#custom_menu_settings .nested-fields ~ .nested-fields:first-of-type.splitcontentleft label::before,
.idnt .name::before,
.idnt .subject::before {
  content: none;
}
table:not(#projects_table) [class*="idnt-"] td.name,
table:not(#projects_table) [class*="idnt-"] td.subject,
table:not(#projects_table) [class*="idnt-"] th.name,
table:not(#projects_table) [class*="idnt-"] th.subject {
  padding-left: 0 !important;
}
/**
 * Modul (jednotlivé panely) - orámování + headery
 */
.box .module-heading {
  padding: 0.5rem 0.4rem;
}
.box .module-toggle-button .expander {
  top: 0.6rem;
  right: 0.6rem;
}
.box .expander.module-toggler {
  top: 0.6rem;
}
.box .module-heading-links {
  padding: 0;
}
/**
 * Gridy jako takové
 */
table thead tr:first-child th {
  padding-top: 1rem;
}
table.list td,
table.list th {
  padding-left: 0 !important;
}
table.list > tbody > tr > td,
table.list > tbody > tr > th {
  padding-top: 0;
  padding-bottom: 0;
}
table.list td.checkbox input[type="checkbox"] {
  -webkit-transform: translateY(-2px);
          transform: translateY(-2px);
}
table.list td.easy-query-additional-beginning-buttons .beginning-buttons-wrapper {
  -webkit-transform: none;
          transform: none;
  position: static;
}
.icon__stack > [class*="icon"]:nth-child(n + 2) {
  left: 0.75em;
}
table.list td.easy-query-additional-beginning-buttons,
table.list th.easy-query-additional-beginning-buttons {
  padding-right: 0.5rem !important;
}
table.list > tbody > tr.issue {
  height: 34px;
}
table.list th.assigned_to .affix-cell-wrap,
table.list th.author .affix-cell-wrap,
table.list th.due_date .affix-cell-wrap,
table.list th.easy_indicator .affix-cell-wrap,
table.list th.estimated_hours .affix-cell-wrap,
table.list th.priority .affix-cell-wrap,
table.list th.project .affix-cell-wrap,
table.list th.start_date .affix-cell-wrap,
table.list th.status .affix-cell-wrap,
table.list th.subject .affix-cell-wrap,
table.list th.tracker .affix-cell-wrap,
table.list th.updated_on .affix-cell-wrap,
table.list th.user .affix-cell-wrap {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
table.list th.assigned_to .affix-cell-wrap,
table.list th.author .affix-cell-wrap,
table.list th.due_date .affix-cell-wrap,
table.list th.start_date .affix-cell-wrap {
  text-align: center;
}
table.list th.updated_on .affix-cell-wrap {
  text-align: right;
}
table.list td.assigned_to,
table.list td.author {
  text-align: center;
}
table.list td.updated_on {
  text-align: right;
}
table.list tr:hover .easy-panel-handler {
  opacity: 0 !important;
}
/**
 * Přidání spolupracovníku
 */
#modal_watchers_user_select .avatar-container img {
  max-width: none;
}
/**
 * Gravatar - ikonka usera
 */
.gravatar {
  padding: 0;
}
/**
 * Odpracovaný čas
 */
.time-entry .subject {
  display: flex;
}
.time-entry .subject > span {
  width: 300px;
}
.time-entry .subject > a {
  flex: 1 0 0;
}
/**
 * Detail tasku
 */
.easy-content-page .box.module {
  margin: 0.5rem -1.2rem;
}
/**
 * Tab Projekty
 */
.project-tree .project {
  height: 34px;
}
.project-tree .project .name {
  line-height: 2.2em;
}
.project-tree .row-control + a {
  line-height: 2.2em;
}
/**
 * Agile (Kanban)
 */
.agile__col__title {
  display: flex;
  flex-direction: column;
}
/**
 * UI Dialog "Zápis času"
 */
#easy_project_com-ajax_modal-time_entries-new .splitcontent {
  margin-left: 0;
  margin-right: 0;
}
#easy_project_com-ajax_modal-time_entries-new .splitcontent .splitcontentleft {
  float: none;
  width: auto;
}
#easy_project_com-ajax_modal-time_entries-new #main .select2-container,
#easy_project_com-ajax_modal-time_entries-new .easy-autocomplete-tag,
#easy_project_com-ajax_modal-time_entries-new .easy-lookup-values-wrapper,
#easy_project_com-ajax_modal-time_entries-new .uneditable-input,
#easy_project_com-ajax_modal-time_entries-new select {
  width: 100%;
  max-width: 100%;
}
/**
 * Kalendáře
 */
div.easy-attendance-calendar-item > a {
  display: block;
  width: 100%;
}
/**
 * Plugin s docházkou a odpracovaným časem
 */
.easy-calendar-upcoming .todays-attendance,
.easy-calendar-upcoming .todays-time {
  display: flex;
  align-items: center;
}
.easy-calendar-upcoming .todays-attendance::before,
.easy-calendar-upcoming .todays-time::before {
  margin-right: 0.4rem;
}
/**
 * Oprava chybějící třídy .issue v sidebaru "Přehled aktivit"
 */
.easy-activity-feed-activity-event dt {
  font-size: 0.89em;
}
.easy-activity-feed-activity-event dt .time {
  float: right;
}
.easy-activity-feed-activity-event dt .author .avatar-container {
  margin-right: 0.8rem;
  float: none;
}
.easy-activity-feed-activity-event dt .author .name {
  display: inline-block;
  margin-top: 0.2rem;
}
.easy-activity-feed-activity-event dt .project {
  clear: both;
  display: block;
  margin-top: 0.8rem;
}
.easy-activity-feed-activity-event dt .issue-link {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.easy-activity-feed-activity-event dt:not(:first-child) {
  margin-top: 1em;
  padding-top: 1em;
}
/**
 * Úkolové stopky
 */
#easy_issue_timer_notify_container .issue {
  font-weight: normal;
}
.easy-issue-timers-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
}
.easy-issue-timers-item-breadcrumb > a:last-child {
  padding: 0.4rem;
  margin: 1rem 0 0;
}
.easy-issue-timers-item-buttons {
  flex-grow: 1;
  padding-left: 0px;
  margin-top: 1rem;
  width: 100%;
}
.easy-issue-timers-item-buttons span {
  margin-top: 0;
  margin-left: 0;
  margin-right: 0.8rem;
}

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
        $("[data-name='issue[estimated_hours]'] > span").each(function(
            index,
            value
        ) {
            var $value = $(value);
            if ($value.text() === "0 hodin") {
                $value.text("---");
            }
        });
    }, 500);
}

/**
 * Nastavení stránky s výkazem času.
 * Tlačítka pro rychlý výběr aktivity a předvybrané hodnoty.
 */
function setActivityPage() {
    // Dostupné role:
    // 60 - Administrátor
    // 61 - Byznys analytik
    // 63 - Programátor
    // 64 - Analytik
    // 65 - Produktový manažer
    // 66 - Tester
    // 69 - Delivery manažer

    // Předvyplníme automaticky zvolenou roli do radio buttonu
    const $roleRadio = document.getElementById("radio-timeentry-time_entry-63");
    if ($roleRadio) {
        $roleRadio.checked = true;
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

    // Doplníme buttony na předvolení aktivit vedle komba
    const $activityCombo = $("#time_entry_custom_field_values_90_");
    if ($activityCombo) {
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

        // Předvyplníme automaticky zvolenou aktibitu
        $activityCombo.val("Vývoj");
    }
}

/**
 * Nastavení popup okna s doch8zkou.
 * Předvybraná hodnota.
 */
function setAttendancePage() {
    // <option value="1">Kancelář</option>
    // <option value="6">Práce mimo kancelář</option>
    // <option value="2">Home office</option>
    // <option value="3">Dovolená</option>
    // <option value="4">Nemoc</option>
    // <option value="5">Lékař</option>

    $("#easy_attendance_easy_attendance_activity_id").after(
        '<button type="button" class="attendance-set-kancelar button-positive">Kancelář</button>'
    );

    $(document).on("click", ".attendance-set-kancelar", function() {
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
    return hours + "h " + minutes + "m";
}

/**
 * Příprava html elementu, kam se bude zapisovat docházka a vykázaný čas
 */
function prepareTodayAttendance() {
    // https://creasoft.easyproject.cz/easy_attendances/arrival?arrival_at=2019-03-16&back_url=https%3A%2F%2Fcreasoft.easyproject.cz%2F%3Ft%3D5

    // Připravíme html element pro data
    $(".easy-calendar-upcoming").after(
        '<div class="easy-calendar-upcoming">' +
            '  <div class="easy-calendar-upcoming__texts">' +
            '    <span style="display: flex;">' +
            '      <span class="icon icon-calendar todays-attendance"></span>' +
            '      <a class="todays-attendance-link" style="margin-left: 1rem;" href="#"></a>' +
            "    </span>" +
            '    <span class="block"></span>' +
            '    <span class="icon icon-timer todays-time"></span>' +
            "  </div>" +
            "</div>"
    );

    // Spustíme počítadla
    getTodaysAttendance();
    getTodaysTimeEntries();
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

    // Link na zápis
    $todaysAttendanceLink.attr(
        "href",
        "/easy_attendances/arrival?&back_url=" + returnUrl
    );
    $todaysAttendanceLink.attr("data-remote", true);
    $todaysAttendanceLink.html("[Zapiš příchod]");

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
            "Odpracovaný čas: " + getHoursAndMinutesFromSeconds(totalSeconds);
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
    var container = document.getElementById("visualization-timeline");
    if (container == null) {
        $("#tab5-list-top-middle").before(
            '<div id="visualization-timeline"></div>'
        );
        container = document.getElementById("visualization-timeline");
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
    };

    $.getJSON("/time_entries.json", params, function(data) {
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

            return item;
        });

        // Create a DataSet (allows two way data-binding)
        var items = new vis.DataSet(visData);

        // Configuration for the Timeline
        var options = {
            locale: "cs",
            start: moment()
                .startOf("day")
                .toDate()
                .setHours(6),
            end: moment()
                .startOf("day")
                .toDate()
                .setHours(18),
            zoomable: false
        };

        // Create a Timeline
        var timeline = new vis.Timeline(container, items, options);
    }); // getJSON
}
