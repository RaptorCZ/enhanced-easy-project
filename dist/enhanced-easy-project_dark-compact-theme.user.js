// ==UserScript==
// @name         Enhanced Easy Project - Dark Compact Theme
// @description  UI Mod for Easy Project
// @author       Raptor
// @namespace    eep
// @version      2.0.0
// @downloadURL  https://github.com/RaptorCZ/enhanced-easy-project/raw/master/dist/enhanced-easy-project_dark-compact-theme.user.js
// @updateURL    https://github.com/RaptorCZ/enhanced-easy-project/raw/master/dist/enhanced-easy-project_dark-compact-theme.user.js
// @supportURL   https://github.com/RaptorCZ/enhanced-easy-project/issues
// @homepage     https://github.com/RaptorCZ/enhanced-easy-project
// @icon         https://github.com/RaptorCZ/enhanced-easy-project/raw/master/dist/icon.png
// @match        http*://*creasoft.easyproject.cz/*
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
:root {
  --easy__px: 0.07142857rem;
  --easy__px--2: 0.14285714rem;
  --easy__px--3: 0.21428571rem;
  --easy__px--4: 0.28571429rem;
  --easy__px--5: 0.35714286rem;
  --easy__gap: 0.57142857rem;
  --easy__gap-const: 0.85714286rem;
  --easy__spacing--base: 1.14285714rem;
  --easy__spacing--ms--6: 0.07142857rem;
  --easy__spacing--ms--5: 0.10714286rem;
  --easy__spacing--ms--4: 0.14285714rem;
  --easy__spacing--ms--3: 0.21428571rem;
  --easy__spacing--ms--2: 0.28571429rem;
  --easy__spacing--ms--1: 0.42857143rem;
  --easy__spacing--ms-0: 0.57142857rem;
  --easy__spacing--ms-1: 0.85714286rem;
  --easy__spacing--ms-2: 1.14285714rem;
  --easy__spacing--ms-3: 1.71428571rem;
  --easy__spacing--ms-4: 2.28571429rem;
  --easy__spacing--ms-5: 3.42857143rem;
  --easy__spacing--ms-6: 4.57142857rem;
  --easy__spacing--ms-7: 6.85714286rem;
  --easy__spacing--ms-8: 9.14285714rem;
  --easy__spacing--ms-9: 13.71428571rem;
  --easy__spacing--ms-10: 18.28571429rem;
  --easy__line-height--base: 1.625;
  --easy__line-height--heading: 1.21875;
  --easy__font-scale: 1.125;
  --easy__font-size--base: 1rem;
  --easy__font-size--small: 0.85714286rem;
  --easy__font-size--smallest: 0.71428571rem;
  --easy__font-size--h4: 1.125rem;
  --easy__font-size--h3: 1.265625rem;
  --easy__font-size--h2: 1.42382813rem;
  --easy__font-size--h1: 1.80203247rem;
  --easy__icons-sizes-tiny: 1.28571429rem;
  --easy__icons-sizes-small: 1.71428571rem;
  --easy__icons-sizes-medium: 2.14285714rem;
  --easy__icons-sizes-large: 2.57142857rem;
  --easy__icons-sizes-xlarge: 3.42857143rem;
  --easy__logo-navbar: url("data:image/svg+xml,%3Csvg viewBox='0 0 46 46' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.7,45.4C35.2,45.4 45.4,35.2 45.4,22.7C45.4,10.2 35.2,0 22.7,0C10.2,0 0,10.2 0,22.7C0,35.2 10.2,45.4 22.7,45.4' style='fill:%23fff;fill-rule:nonzero;'/%3E%3Cpath d='M19.6,33.1L19.6,12.3C14.3,13.7 11.2,17.5 11.2,22.6C11.2,27.7 14.4,31.7 19.6,33.1M39.8,22.6C39.8,27.4 38.1,31.4 34.7,34.6C31.5,37.7 27,39.4 22.6,39.4C18,39.4 14,37.8 10.7,34.8C7.1,31.6 5.4,27.4 5.4,22.7C5.4,17 8.1,11.9 13,8.6C16,6.6 19.4,5.8 23.9,5.8L24.8,5.8L24.8,33.2C30.3,32.2 33.9,27.9 33.9,22.5C33.9,18.6 31.9,15.3 28.6,13.4L28.6,6.9C36,10 39.8,15.5 39.8,22.6' style='fill:%230080e5;fill-rule:nonzero;'/%3E%3Cg transform='matrix(1,0,0,1,0.757463,0.946523)'%3E%3Cpath d='M35.192,13.925L35.192,8.344L29.567,8.344L29.567,4.492L35.192,4.492L35.192,-1.089L38.942,-1.089L38.942,4.492L44.581,4.492L44.581,8.344L38.942,8.344L38.942,13.925L35.192,13.925Z' style='fill:%23ff0200;fill-rule:nonzero;'/%3E%3C/g%3E%3C/svg%3E%0A");
}
table.list > tbody > tr > td,
table.list > tbody > tr > th {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.easy-entity-list__item-attribute-content {
  margin: 0;
  padding: 0.125rem;
}
table.list td.easy-query-additional-ending-buttons .ending-buttons-fixed,
table.list td.easy-additional-ending-buttons .ending-buttons-fixed,
table.list th.easy-query-additional-ending-buttons .ending-buttons-fixed,
table.list th.easy-additional-ending-buttons .ending-buttons-fixed {
  padding: 0 !important;
}
/**
 * Odstranění znaku stromového zobrazení v gridech a samotných odsazení
 */
#custom_menu_settings .nested-fields ~ .nested-fields:first-of-type.splitcontentleft label::before,
.idnt .name::before,
.idnt .subject::before {
  content: none;
}
table.entities [class*="idnt-"] td.name,
table.entities [class*="idnt-"] td.subject,
table.entities [class*="idnt-"] th.name,
table.entities [class*="idnt-"] th.subject {
  padding-left: 0 !important;
}
/**
 * Kanban/Scrum board (Agile)
 */
.agile__col--side,
.agile__swimline .agile__col {
  min-width: 18.75rem !important;
}
.agile__main-col {
  min-width: auto;
}
.agile {
  overflow-x: scroll;
}
.agile__row {
  padding-bottom: 0;
}
.easy-col + .agile__main-col {
  min-width: unset;
  max-width: unset;
}
.agile__item {
  height: 9rem !important;
}
.agile__card__title {
  max-height: unset;
}
.agile__main-col .agile__list:before {
  display: none;
  content: none;
}
/**
 * EasyTooltip
 */
.easy-tooltip .issue-card {
  max-width: 400px;
}
.easy-tooltip .issue-card__label {
  min-width: 130px;
}
#loggedas,
#loggedas_controls {
  margin-right: var(--easy__spacing--ms-0);
}
/**
 * Danger theme 1
 * scheme-0 - červené bez pozadí
 */
.color-scheme-item > .scheme-0 {
  border-left-color: rgba(231, 76, 60, 0.6) !important;
}
.scheme-0.color-scheme-modal {
  border-left-color: rgba(231, 76, 60, 0.6) !important;
}
.scheme-0 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0) !important;
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-0 td {
  color: #fff;
}
table.list > tbody .scheme-0 > td:first-child:before {
  background: rgba(231, 76, 60, 0.6) !important;
}
.scheme-0 .row-control > .expander:before,
.scheme-0 .row-control > .expander-root:before,
.scheme-0 .row-control > .expander-descendant:before {
  color: rgba(231, 76, 60, 0.6) !important;
}
@media only screen and (max-width: 480px) {
  .scheme-0 .easy-entity-list__item-attribute:before {
    background: rgba(231, 76, 60, 0.6) !important;
  }
}
.scheme-0 hr {
  border-color: #e43725 !important;
}
tr.scheme-0.context-menu-selection,
table.list > tbody > tr.scheme-0:hover {
  background: #e43725 !important;
}
.agile__card.scheme-0 {
  background-color: rgba(231, 76, 60, 0.4) !important;
}
.agile__card.scheme-0:before {
  background: rgba(231, 76, 60, 0.6) !important;
}
/**
 * Danger theme 2
 * scheme-1 - červené s pozadím
 */
.scheme-1 {
  background: rgba(231, 76, 60, 0.4) !important;
  border-color: rgba(231, 76, 60, 0.4) !important;
}
.color-scheme-item > .scheme-1 {
  border-left-color: rgba(231, 76, 60, 0.6) !important;
}
.scheme-1.color-scheme-modal {
  border-left-color: rgba(231, 76, 60, 0.6) !important;
}
.scheme-1 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0) !important;
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-1 td {
  color: #fff;
}
table.list > tbody .scheme-1 > td:first-child:before {
  background: rgba(231, 76, 60, 0.6) !important;
}
.scheme-1 .row-control > .expander:before,
.scheme-1 .row-control > .expander-root:before,
.scheme-1 .row-control > .expander-descendant:before {
  color: rgba(231, 76, 60, 0.6) !important;
}
@media only screen and (max-width: 480px) {
  .scheme-1 .easy-entity-list__item-attribute:before {
    background: rgba(231, 76, 60, 0.6) !important;
  }
}
.scheme-1 hr {
  border-color: #e43725 !important;
}
tr.scheme-1.context-menu-selection,
table.list > tbody > tr.scheme-1:hover {
  background: #e43725 !important;
}
.agile__card.scheme-1 {
  background-color: rgba(231, 76, 60, 0.4) !important;
}
.agile__card.scheme-1:before {
  background: rgba(231, 76, 60, 0.6) !important;
}
/**
 * Success theme 1
 * scheme-2 - zelené bez pozadí
 */
.color-scheme-item > .scheme-2 {
  border-left-color: rgba(0, 188, 140, 0.5) !important;
}
.scheme-2.color-scheme-modal {
  border-left-color: rgba(0, 188, 140, 0.5) !important;
}
.scheme-2 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0) !important;
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-2 td {
  color: #fff;
}
table.list > tbody .scheme-2 > td:first-child:before {
  background: rgba(0, 188, 140, 0.5) !important;
}
.scheme-2 .row-control > .expander:before,
.scheme-2 .row-control > .expander-root:before,
.scheme-2 .row-control > .expander-descendant:before {
  color: rgba(0, 188, 140, 0.5) !important;
}
@media only screen and (max-width: 480px) {
  .scheme-2 .easy-entity-list__item-attribute:before {
    background: rgba(0, 188, 140, 0.5) !important;
  }
}
.scheme-2 hr {
  border-color: #00a379 !important;
}
tr.scheme-2.context-menu-selection,
table.list > tbody > tr.scheme-2:hover {
  background: #00a379 !important;
}
.agile__card.scheme-2 {
  background-color: rgba(0, 188, 140, 0.4) !important;
}
.agile__card.scheme-2:before {
  background: rgba(0, 188, 140, 0.5) !important;
}
/**
 * Success theme 2
 * scheme-3 - zelené s pozadím
 */
.scheme-3 {
  background: rgba(0, 188, 140, 0.4) !important;
  border-color: rgba(0, 188, 140, 0.4) !important;
}
.color-scheme-item > .scheme-3 {
  border-left-color: rgba(0, 188, 140, 0.5) !important;
}
.scheme-3.color-scheme-modal {
  border-left-color: rgba(0, 188, 140, 0.5) !important;
}
.scheme-3 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0) !important;
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-3 td {
  color: #fff;
}
table.list > tbody .scheme-3 > td:first-child:before {
  background: rgba(0, 188, 140, 0.5) !important;
}
.scheme-3 .row-control > .expander:before,
.scheme-3 .row-control > .expander-root:before,
.scheme-3 .row-control > .expander-descendant:before {
  color: rgba(0, 188, 140, 0.5) !important;
}
@media only screen and (max-width: 480px) {
  .scheme-3 .easy-entity-list__item-attribute:before {
    background: rgba(0, 188, 140, 0.5) !important;
  }
}
.scheme-3 hr {
  border-color: #00a379 !important;
}
tr.scheme-3.context-menu-selection,
table.list > tbody > tr.scheme-3:hover {
  background: #00a379 !important;
}
.agile__card.scheme-3 {
  background-color: rgba(0, 188, 140, 0.4) !important;
}
.agile__card.scheme-3:before {
  background: rgba(0, 188, 140, 0.5) !important;
}
/**
 * Info theme 1
 * scheme-4 - modré bez pozadí
 */
/**
 * Info theme 2
 * scheme-5 - modré s pozadím
 */
/**
 * Warning theme 1
 * scheme-6 - oranžové bez pozadí
 */
.color-scheme-item > .scheme-6 {
  border-left-color: rgba(243, 156, 18, 0.8) !important;
}
.scheme-6.color-scheme-modal {
  border-left-color: rgba(243, 156, 18, 0.8) !important;
}
.scheme-6 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0) !important;
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-6 td {
  color: #fff;
}
table.list > tbody .scheme-6 > td:first-child:before {
  background: rgba(243, 156, 18, 0.8) !important;
}
.scheme-6 .row-control > .expander:before,
.scheme-6 .row-control > .expander-root:before,
.scheme-6 .row-control > .expander-descendant:before {
  color: rgba(243, 156, 18, 0.8) !important;
}
@media only screen and (max-width: 480px) {
  .scheme-6 .easy-entity-list__item-attribute:before {
    background: rgba(243, 156, 18, 0.8) !important;
  }
}
.scheme-6 hr {
  border-color: #e08e0b !important;
}
tr.scheme-6.context-menu-selection,
table.list > tbody > tr.scheme-6:hover {
  background: #e08e0b !important;
}
.agile__card.scheme-6 {
  background-color: rgba(243, 156, 18, 0.6) !important;
}
.agile__card.scheme-6:before {
  background: rgba(243, 156, 18, 0.8) !important;
}
/**
 * Warning theme 2
 * scheme-7 - oranžové s pozadím
 */
.scheme-7 {
  background: rgba(243, 156, 18, 0.6) !important;
  border-color: rgba(243, 156, 18, 0.6) !important;
}
.color-scheme-item > .scheme-7 {
  border-left-color: rgba(243, 156, 18, 0.8) !important;
}
.scheme-7.color-scheme-modal {
  border-left-color: rgba(243, 156, 18, 0.8) !important;
}
.scheme-7 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0) !important;
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-7 td {
  color: #fff;
}
table.list > tbody .scheme-7 > td:first-child:before {
  background: rgba(243, 156, 18, 0.8) !important;
}
.scheme-7 .row-control > .expander:before,
.scheme-7 .row-control > .expander-root:before,
.scheme-7 .row-control > .expander-descendant:before {
  color: rgba(243, 156, 18, 0.8) !important;
}
@media only screen and (max-width: 480px) {
  .scheme-7 .easy-entity-list__item-attribute:before {
    background: rgba(243, 156, 18, 0.8) !important;
  }
}
.scheme-7 hr {
  border-color: #e08e0b !important;
}
tr.scheme-7.context-menu-selection,
table.list > tbody > tr.scheme-7:hover {
  background: #e08e0b !important;
}
.agile__card.scheme-7 {
  background-color: rgba(243, 156, 18, 0.6) !important;
}
.agile__card.scheme-7:before {
  background: rgba(243, 156, 18, 0.8) !important;
}

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
