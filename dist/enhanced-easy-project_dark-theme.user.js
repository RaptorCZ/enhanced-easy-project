// ==UserScript==
// @name         Enhanced Easy Project - Dark Theme
// @description  UI Mod for Easy Project
// @author       Raptor
// @namespace    eep
// @version      1.6.1
// @downloadURL  https://github.com/RaptorCZ/enhanced-easy-project/raw/master/dist/enhanced-easy-project_dark-theme.user.js
// @updateURL    https://github.com/RaptorCZ/enhanced-easy-project/raw/master/dist/enhanced-easy-project_dark-theme.user.js
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
/**
 * Zrušení 2 sloupců na modalu "Zápis času"
 */
#bulk-time-entry-form .splitcontent {
  display: block !important;
}
#bulk-time-entry-form .splitcontent > div {
  float: none !important;
  width: auto !important;
}
#bulk-time-entry-form .splitcontentright > div {
  float: none !important;
  width: auto !important;
}
#bulk-time-entry-form select,
#bulk-time-entry-form input[type="text"],
#bulk-time-entry-form .easy-autocomplete-tag,
#bulk-time-entry-form .easy-autocomplete-tag > input,
#bulk-time-entry-form .input-append {
  max-width: 100% !important;
}
#easy_servicebar,
#header,
.box,
body {
  background-color: #10171e;
}
html {
  color: #8899a6;
}
/**
 * Page header
 */
#top-menu {
  background-color: #1c2938;
}
/**
 * Sidebar menu
 */
#top-menu-container > ul > li .easy-top-menu-more-toggler,
#top-menu-container > ul > li .easy-top-menu-more-toggler:hover,
#top-menu-container > ul > li > a,
#top-menu-container > ul > li > a:hover {
  background-color: #1c2938;
  color: #8899a6;
}
#top-menu-container > ul > li {
  border-color: #1c2938 !important;
}
/**
 * Headery, nadpisy atd.
 */
.easy-chart-listing-links > .easy-cal-title,
.easy-chart-listing-links > .easy-calendar__calendar-listing-date,
.easy-chart-listing-links > .period,
.easy-query-listing-links > .easy-cal-title,
.easy-query-listing-links > .easy-calendar__calendar-listing-date,
.easy-query-listing-links > .period,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
.journal-byline,
.message-authoring,
div.easy-calendar-listing-links > .easy-cal-title,
div.easy-calendar-listing-links > .easy-calendar__calendar-listing-date,
div.easy-calendar-listing-links > .period,
h1,
h2,
h3,
h4,
h5,
h6,
table.list .group > td.inline_expander {
  color: #fff;
}
/**
 * Breadcrumb s projekty na detailu
 */
#header h1 {
  color: #fff;
  background-color: #15202b;
}
#header h1 > .self a {
  color: #1da1f2;
}
/**
 * Widgets (např. zápis času)
 */
.ui-dialog .ui-dialog-titlebar,
.ui-dialog-titlebar,
.ui-widget-content {
  color: #fff;
  background: #1c2938;
}
.ui-widget.ui-widget-content {
  border-color: #38444d;
}
.form-box {
  background-color: #10171e;
}
/**
 * Autocomplete (hledání)
 */
.ui-autocomplete-category {
  background: #10171e;
  border-color: #38444d;
}
.ui-autocomplete-category.ui-state-focus,
.ui-autocomplete-category:hover {
  background: #10171e !important;
  border-color: #38444d !important;
}
.ui-autocomplete-category + .ui-menu-item {
  border-top-color: #38444d;
}
.ui-autocomplete-category.ui-state-focus + .ui-menu-item,
.ui-autocomplete-category:hover + .ui-menu-item {
  border-top-color: #38444d !important;
}
.ui-menu .ui-menu-item a {
  color: #fff;
}
.ui-menu .ui-menu-item:hover {
  background-color: #10171e;
}
.ui-menu .ui-menu-item-wrapper.ui-state-active {
  background-color: #10171e;
}
/**
 * Pravý sidebar (Aktivity, Kontakty, ToDo)
 */
#easy_servicebar_component {
  background: #1c2938;
  border-color: #38444d;
}
#easy_servicebar_component_body {
  color: #8899a6;
}
#easy_grid_sidebar_inner > .primary-actions .button-positive.button-outlined,
#sidebar_inner > .primary-actions .button-positive.button-outlined {
  background-color: transparent !important;
}
#easy_servicebar_component_body .servicebar-actions {
  background: #15202b;
}
/**
 * Infinite scroll
 */
.infinite-scroll-load-next-page-trigger-container {
  background: #15202b;
  border-top-color: #38444d;
}
/**
 * Dialog tasku
 */
#easy_servicebar_component_body .list-item,
#easy_servicebar_component_body .ui-state-default {
  background-color: #10171e;
}
#easy_servicebar_component_body .timer-time {
  color: #fff;
}
/**
 * Přehled aktivit (pravá strana)
 */
.easy-activity-feed-activity-event,
.easy-activity-feed__activity-event {
  background: #10171e;
}
.easy-activity-feed__activity-event .issue-closed {
  background-color: #10171e;
}
.easy-activity-feed__activity-event .issue-closed:after {
  border-right-color: #38444d;
  border-left-color: #38444d;
}
.easy-activity-feed-activity-event dt:not(:first-child) {
  border-top: 1px solid #38444d;
}
.easy-activity-feed-activity-event dt .project {
  font-weight: 700;
  color: #fff;
}
/**
  * Journal
  */
#easy_sequence_designer .entity_container,
.easy-instant-message-list-item-message,
.journal-details-container .wiki,
.message-body .wiki {
  background: #10171e;
}
.journal,
.message {
  background: #15202b;
}
.help-block,
.info,
.nodata {
  background: #15202b;
  border: 1px solid #38444d;
  color: #fff;
}
/**
 * Tabs
 */
#main-menu > ul > li > a.selected,
#main-menu > ul > li > a:hover,
.tabs > ul > li > a.selected,
.tabs > ul > li > a:hover {
  color: #1da1f2;
}
/**
 * Modul (jednotlivé panely) - orámování + headery
 */
.box.easy-page-module {
  background-color: #1c2938 !important;
  border: 1px solid #38444d;
}
.easy-page-module .module-heading {
  background-color: #15202b !important;
  color: #fff;
}
.easy-page-module .module-heading a {
  color: #fff;
}
.easy-content-page .box .module-heading h3 {
  color: #fff;
}
/**
 * Gridy jako takové
 */
table thead td,
table thead th {
  color: #fff;
}
table.list > thead > tr .affix-cell-wrap {
  background-color: #1c2938;
}
table.list td a,
table.list th a {
  color: #fff;
}
table.list > thead > tr > th.checkbox ~ th a::before {
  border-bottom-color: #fff;
  opacity: 1;
}
table.list > thead > tr > th.checkbox ~ th a::after {
  border-top-color: #fff;
  opacity: 1;
}
table.list > thead > tr > td,
table.list > thead > tr > th {
  background: #15202b;
}
table.list > tbody {
  color: #fff;
  background: #1c2938;
}
table.list > tbody > tr:hover,
tr.context-menu-selection {
  background: #1c2938 !important;
}
table.list > tbody > tr.group:hover,
table.list tr.group {
  background-color: #10171e !important;
}
table.list tr.group span.count {
  color: #fff;
  border-color: #fff;
}
table.list tr.group td.group-name > :nth-child(3) {
  display: none;
}
/**
 * Kalendáře
 */
div.easy-attendance {
  border: 1px solid #38444d;
}
div.easy-attendance-calendar-item > a {
  text-align: left;
  color: #fff !important;
}
div.easy-calendar table td {
  background: #1c2938;
}
div.easy-calendar table td.odd,
div.easy-calendar table td.weekend {
  background: #10171e;
}
div.easy-calendar table td.week-number,
div.easy-calendar table td.day-number,
div.easy-calendar table td.month-number,
div.easy-calendar table td.week-total {
  background: #10171e;
  border-right: 1px solid #38444d !important;
}
div.easy-calendar table {
  border-bottom: 1px solid #38444d;
}
div.easy-calendar table tbody td + td {
  border-left: 1px solid #38444d;
}
div.easy-calendar table td.today {
  background: #15202b;
}
/**
 * Odpracovaný čas
 */
.time-entries .odd,
.time-entries .odd:hover {
  background: #10171e !important;
}
/**
 * Detail tasku
 */
.easy-content-page {
  background: #10171e;
  border: 1px solid #38444d;
}
.easy-content-page .box.module {
  border: 1px solid #38444d;
  background: #15202b;
}
hr {
  border-bottom: 1px solid #38444d;
}
.issue-detail-header {
  color: #8899a6;
}
.easy-entity-details-header {
  color: #fff;
}
.easy-entity-details-header-attributes {
  border: 1px solid #38444d;
  background-color: #10171e;
}
.easy-entity-details-header-attributes::after {
  border-bottom: 0;
  background-image: none;
}
.easy-entity-details .easy-contextual {
  background: #10171e;
  border: 1px solid #38444d;
  border-bottom: none;
}
.easy-entity-details-description {
  background: #10171e;
}
.attribute > div.label,
.attribute > div.value {
  color: #fff !important;
}
/**
 * Profil uživatele
 */
#user_detail_header {
  background: none;
  background-color: #1c2938;
}
/**
 * Spodní panel, obvykle obsahuje tlačítka pro nějaké uložení atd.
 */
#modal_selectorfilter_buttons,
.easy-query-filter-settings + #filter_buttons,
.form-actions,
.ui-dialog .ui-dialog-buttonpane {
  background: #15202b;
}
/**
 * Pole tlačítek - queries, filtry atd.
 */
#search-results-counts li a,
#user-query-automatic-filter a,
.entity-array > a,
.entity-array > span,
.multigrouping .multigroup_element,
.saved-queries a,
.tags a,
.version-list a {
  color: #fff;
}
#search-results-counts li a,
#user-query-automatic-filter a,
.entity-array > a,
.entity-array > span,
.multigrouping .multigroup_element,
.saved-queries a,
.tags a,
.version-list a {
  background: #1c2938;
  border-color: #38444d;
  color: #8899a6;
}
/**
 * Menu/tlačítka (Další akce)
 */
#admin-menu a,
#easy_grid_sidebar .menu-manager a,
#easy_grid_sidebar .menu-more a,
#sidebar .menu-manager a,
#sidebar .menu-more a,
.attachment-header .contextual a,
.box .easy-entity-details-sidebar-attributes + .menu-more > ul a,
.button,
.button-2,
.button-icon-only,
.contextual a,
.demo-login-buttons a,
.demo-login-tabs a,
.easy-entity-card-actions a,
.easy-panel-handler,
.input-append > a,
.input-append > button,
.input-append__addon,
.menu-user-profile > li > a,
input[type="submit"] {
  background: #1c2938;
  border-color: #38444d;
  color: #8899a6;
}
/**
 * Menu/tlačítka (Další akce) - hover efekt
 */
#admin-menu a:hover,
#easy_grid_sidebar .menu-manager a:hover,
#easy_grid_sidebar .menu-more a:hover,
#sidebar .menu-manager a:hover,
#sidebar .menu-more a:hover,
.box .easy-entity-details-sidebar-attributes + .menu-more > ul a:hover,
.button-2:hover,
.button-icon-only:hover,
.button:hover,
.contextual a:hover,
.demo-login-buttons a:hover,
.demo-login-tabs a:hover,
.easy-entity-card-actions a:hover,
.easy-panel-handler:hover,
.input-append > a:hover,
.input-append > button:hover,
.input-append__addon:hover,
.menu-user-profile > li > a:hover,
input[type="submit"]:hover {
  color: #fff;
  background: #15202b;
  border-color: #38444d;
}
#easy_grid_sidebar .box .module-heading-links,
#sidebar .box .module-heading-links {
  background: #10171e;
}
/**
 * Boxík s celkovým časem na úkolu
 */
.easy-entity-details-sidebar-attributes {
  border: 1px solid #38444d;
  background: #10171e;
}
.easy-entity-details-sidebar-attributes table.highlight tr + tr {
  border-top: 1px solid #38444d;
}
/**
 * Box Exporty (dole)
 */
#easy_grid_sidebar_content::after,
#easy_grid_sidebar_footer::after,
#sidebar_content::after,
#sidebar_footer::after {
  background-image: none !important;
}
#easy_grid_sidebar_footer,
#sidebar_footer {
  background: #15202b;
}
.other-formats a,
div.easy-calendar-export a {
  color: #8899a6;
}
/**
 * Agile (Kanban)
 */
.agile__item {
  background: #10171e;
  border: 1px solid #38444d;
  height: 8rem;
}
.agile__list {
  border: 1px dashed #38444d;
  border-top: 3px solid #38444d;
  background: #1c2938;
}
.agile__list:hover,
.droppable-hover.agile__list {
  background: #15202b;
}
.agile__col__title {
  background: #15202b;
}
.agile__col__title__details {
  color: #8899a6;
}
.agile__card__subtitle {
  color: #8899a6;
}
.agile__sticky-lane {
  background: #15202b;
  border: 1px solid #38444d;
}
.agile__sticky-selector {
  background: #15202b;
  border: 1px solid #38444d;
}
/**
 * Obecný tooltip
 */
.easy-tooltip {
  background: #10171e;
  border: 1px solid #38444d;
}
/**
 * Right click menu
 */
#context-menu ul,
#context-menu ul li > .menu-children,
#invited_colleague_change_user_type_modal .icon-help-bubble > .tooltip,
#top-menu-container > ul > li ul,
#top-menu-container > ul > li ul li > .menu-children,
#top-menu-rich-more .top-menu-rich-more-item > li > ul.menu-children,
#top-menu-rich-more .top-menu-rich-more-item > li.open ul,
#top-menu-rich-more .top-menu-rich-more-item > li.open ul li > .menu-children,
#top-menu-rich-more .top-menu-rich-more-item > li:hover ul,
#top-menu-rich-more .top-menu-rich-more-item > li:hover ul li > .menu-children,
.agile__col-sort > .tooltip,
.box .module-heading-links a > .tooltip,
.button-group .menu-more ul,
.button-group .menu-more ul li > .menu-children,
.easy-entity-card-actions a > .tooltip,
.easy-entity-details .easy-contextual a > .tooltip,
.easy-gantt__menu-group--tooltiped ul,
.easy-gantt__menu-group--tooltiped ul li > .menu-children,
.easy-query-heading-controls a > .tooltip,
.easy-query-heading-wrapper > .tooltip,
.input-append > a > .tooltip,
.journal-tools .menu-more ul,
.journal-tools .menu-more ul li > .menu-children,
.journal-tools > a > .tooltip,
.list-item-actions a > .tooltip,
.main_menu__more ul,
.main_menu__more ul li > .menu-children,
.main_menu__settings ul,
.main_menu__settings ul li > .menu-children,
.menu--tooltip ul,
.menu--tooltip ul li > .menu-children,
.menu-user-profile > li ul,
.menu-user-profile > li ul li > .menu-children,
.message-tools .menu-more ul,
.message-tools .menu-more ul li > .menu-children,
.message-tools > a > .tooltip,
.row-control > .expander > .tooltip,
.row-control > .expander-descendant > .tooltip,
.row-control > .expander-root > .tooltip,
.tooltip-bottom > .tooltip,
.tooltip-content,
.tooltip-left > .tooltip,
.tooltip-parent > .tooltip,
[aria-describedby="invited_colleague_onboard_modal"] .tooltip,
div > .fc-grid .fc-day-number > .tooltip,
div.easy-calendar table td .day-num > .tooltip,
legend a.icon > .tooltip,
table.list .easy-additional-ending-buttons > span > .tooltip,
table.list .easy-additional-ending-buttons a > .tooltip,
table.list .easy-query-additional-ending-buttons > span > .tooltip,
table.list .easy-query-additional-ending-buttons a > .tooltip,
table.list td.assigned_to .avatar-container + span,
table.list td.author .avatar-container + span,
table.list th.assigned_to .avatar-container + span,
table.list th.author .avatar-container + span {
  background-color: #10171e;
}
#context-menu ul li:hover,
#top-menu-container > ul > li ul li:hover,
#top-menu-rich-more .top-menu-rich-more-item > li.open ul li:hover,
#top-menu-rich-more .top-menu-rich-more-item > li:hover ul li:hover,
.button-group .menu-more ul li:hover,
.easy-gantt__menu-group--tooltiped ul li:hover,
.journal-tools .menu-more ul li:hover,
.main_menu__more ul li:hover,
.main_menu__settings ul li:hover,
.menu--tooltip ul li:hover,
.menu-user-profile > li ul li:hover,
.message-tools .menu-more ul li:hover {
  border-color: #15202b !important;
  background: #15202b !important;
}
#context-menu ul a,
#invited_colleague_change_user_type_modal .icon-help-bubble > .tooltip a,
#top-menu-container > ul > li ul a,
#top-menu-rich-more .top-menu-rich-more-item > li > ul.menu-children a,
#top-menu-rich-more .top-menu-rich-more-item > li.open ul a,
#top-menu-rich-more .top-menu-rich-more-item > li:hover ul a,
.agile__col-sort > .tooltip a,
.box .module-heading-links a > .tooltip a,
.button-group .menu-more ul a,
.easy-entity-card-actions a > .tooltip a,
.easy-entity-details .easy-contextual a > .tooltip a,
.easy-gantt__menu-group--tooltiped ul a,
.easy-gantt__menu-group--tooltiped ul li > .menu-children a,
.easy-query-heading-controls a > .tooltip a,
.easy-query-heading-wrapper > .tooltip a,
.input-append > a > .tooltip a,
.journal-tools .menu-more ul a,
.journal-tools > a > .tooltip a,
.list-item-actions a > .tooltip a,
.main_menu__more ul a,
.main_menu__more ul li > .menu-children a,
.main_menu__settings ul a,
.main_menu__settings ul li > .menu-children a,
.menu--tooltip ul a,
.menu--tooltip ul li > .menu-children a,
.menu-user-profile > li ul a,
.menu-user-profile > li ul li > .menu-children a,
.message-tools .menu-more ul a,
.message-tools > a > .tooltip a,
.row-control > .expander > .tooltip a,
.row-control > .expander-descendant > .tooltip a,
.row-control > .expander-root > .tooltip a,
.tooltip-bottom > .tooltip a,
.tooltip-content a,
.tooltip-left > .tooltip a,
.tooltip-parent > .tooltip a,
[aria-describedby="invited_colleague_onboard_modal"] .tooltip a,
div > .fc-grid .fc-day-number > .tooltip a,
div.easy-calendar table td .day-num > .tooltip a,
legend a.icon > .tooltip a,
table.list .easy-additional-ending-buttons > span > .tooltip a,
table.list .easy-additional-ending-buttons a > .tooltip a,
table.list .easy-query-additional-ending-buttons > span > .tooltip a,
table.list .easy-query-additional-ending-buttons a > .tooltip a,
table.list td.assigned_to .avatar-container + span a,
table.list td.author .avatar-container + span a,
table.list th.assigned_to .avatar-container + span a,
table.list th.author .avatar-container + span a {
  color: #8899a6;
}
#context-menu ul li a::before,
#top-menu-container > ul > li ul li a::before,
#top-menu-rich-more .top-menu-rich-more-item > li.open ul li a::before,
#top-menu-rich-more .top-menu-rich-more-item > li:hover ul li a::before,
.button-group .menu-more ul li a::before,
.easy-gantt__menu-group--tooltiped ul li a::before,
.journal-tools .menu-more ul li a::before,
.main_menu__more ul li a::before,
.main_menu__settings ul li a::before,
.menu--tooltip ul li a::before,
.menu-user-profile > li ul li a::before,
.message-tools .menu-more ul li a::before {
  color: #8899a6;
}
#context-menu .easy-autocomplete-tag,
#context-menu input {
  color: #8899a6;
}
#context-menu ul::after,
#top-menu-container > ul > li ul::after,
#top-menu-rich-more .top-menu-rich-more-item > li.open ul::after,
#top-menu-rich-more .top-menu-rich-more-item > li:hover ul::after,
.button-group .menu-more ul::after,
.easy-gantt__menu-group--tooltiped ul::after,
.journal-tools .menu-more ul::after,
.main_menu__more ul::after,
.main_menu__settings ul::after,
.menu--tooltip ul::after,
.menu-user-profile > li ul::after,
.message-tools .menu-more ul::after {
  border-left: 1px solid #38444d;
}
/**
 * Úkolové stopky
 */
.easy-issue-timers-item {
  border: 1px solid #38444d !important;
}
/**
 * Danger theme
 */
.scheme-1 {
  background: rgba(231, 76, 60, 0.4);
  border-color: rgba(231, 76, 60, 0.4) !important;
  color: #fff !important;
}
.scheme-1 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-1 td {
  color: #fff;
}
table.list > tbody > tr.scheme-1.context-menu-selection,
table.list > tbody > tr.scheme-1:hover {
  background: #e43725 !important;
}
table.list > tbody .scheme-1 > td:first-child::before {
  background: rgba(231, 76, 60, 0.6) !important;
}
.agile__card.scheme-1 {
  background-color: rgba(231, 76, 60, 0.4) !important;
}
.agile__card.scheme-1 .agile__card__context-menu,
.agile__card.scheme-1 .agile__card__icons,
.agile__card.scheme-1 .agile__card__summable {
  color: #e43725;
}
/**
 * Success theme
 */
.scheme-3 {
  background: rgba(0, 188, 140, 0.4);
  border-color: rgba(0, 188, 140, 0.4) !important;
  color: #fff !important;
}
.scheme-3 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-3 td {
  color: #fff;
}
table.list > tbody > tr.scheme-3.context-menu-selection,
table.list > tbody > tr.scheme-3:hover {
  background: #00a379 !important;
}
table.list > tbody .scheme-3 > td:first-child::before {
  background: rgba(0, 188, 140, 0.5) !important;
}
.agile__card.scheme-3 {
  background-color: rgba(0, 188, 140, 0.4) !important;
}
.agile__card.scheme-3 .agile__card__context-menu,
.agile__card.scheme-3 .agile__card__icons,
.agile__card.scheme-3 .agile__card__summable {
  color: #00a379;
}
/**
 * Warning theme
 */
.scheme-7 {
  background: rgba(243, 156, 18, 0.6);
  border-color: rgba(243, 156, 18, 0.6) !important;
  color: #fff !important;
}
.scheme-7 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-7 td {
  color: #fff;
}
table.list > tbody > tr.scheme-7.context-menu-selection,
table.list > tbody > tr.scheme-7:hover {
  background: #e08e0b !important;
}
table.list > tbody .scheme-7 > td:first-child::before {
  background: rgba(243, 156, 18, 0.8) !important;
}
.agile__card.scheme-7 {
  background-color: rgba(243, 156, 18, 0.6) !important;
}
.agile__card.scheme-7 .agile__card__context-menu,
.agile__card.scheme-7 .agile__card__icons,
.agile__card.scheme-7 .agile__card__summable {
  color: #e08e0b;
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

    // Nastavení role a aktivity na výkazu času
    const userId = getUserInfo();
    setDefaultRoleAndActivity(userId);

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
        const $elements = $("[data-name='issue[estimated_hours]'] > span");
        if (!$elements) {
            return;
        }

        $elements.each(function(
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

    // Předvyplníme automaticky zvolenou roli do radio buttonu
    const $roleRadio = document.getElementById("radio-timeentry-time_entry-" + roleToSelect);
    if ($roleRadio) {
        $roleRadio.checked = true;
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

        // Předvyplníme automaticky zvolenou aktivitu
        if ($activityCombo) {
            $activityCombo.val(activityToSelect);
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
        return "Administrace"
    }

    // 61 - Byznys analytik
    if (roleId === 61) {
        return "Analýza"
    }

    // 63 - Programátor
    if (roleId === 63) {
        return "Vývoj"
    }

    // 64 - Analytik
    if (roleId === 64) {
        return "Analýza"
    }

    // 65 - Produktový manažer
    if (roleId === 65) {
        return "Projektové řízení"
    }

    // 66 - Tester
    if (roleId === 66) {
        return "Testování"
    }

    // 69 - Delivery manažer
    if (roleId === 69) {
        return "Nasazení"
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
        "easy_attendance[easy_attendance_activity_id]" : 1,
        "easy_attendance[arrival]": new moment().toString()
    })

    $.ajax({
        type: "POST",
        url: "/easy_attendances",
        data: params,
        contentType: "application/x-www-form-urlencoded",
        success: window.location = window.location
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

    // Pro jistotu
    $todaysAttendanceLink.off('click');

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
                $todaysAttendanceLink.off('click');

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
