// ==UserScript==
// @name         Enhanced Easy Project - Dark Theme
// @description  UI Mod for Easy Project
// @author       Raptor
// @namespace    eep
// @version      1.15.0
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
 * Toolbar pod modulem
 */
.module-content .toolbar {
  display: none;
}
.timelog-calendar-container .toolbar {
  display: block;
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
  transform: translateY(-2px);
}
table.list td.easy-query-additional-beginning-buttons .beginning-buttons-wrapper {
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
.ui-dialog #bulk-time-entry-form .splitcontent {
  display: block !important;
}
.ui-dialog #bulk-time-entry-form .splitcontent > div {
  float: none !important;
  width: auto !important;
}
.ui-dialog #bulk-time-entry-form .splitcontentright > div {
  float: none !important;
  width: auto !important;
}
.ui-dialog #bulk-time-entry-form select,
.ui-dialog #bulk-time-entry-form input[type="text"],
.ui-dialog #bulk-time-entry-form .easy-autocomplete-tag,
.ui-dialog #bulk-time-entry-form .easy-autocomplete-tag > input,
.ui-dialog #bulk-time-entry-form .input-append {
  max-width: 100% !important;
}
/**
 * Buttonky "filtrů" nahoře nad gridy
 */
.entity-array > a[class*="icon"],
.entity-array > span[class*="icon"] {
  padding-left: 0.3rem !important;
}
.entity-array > a[class*="icon-"],
.entity-array > span[class*="icon-"] {
  padding-left: 1.6rem !important;
}
/**
 * Sidebar a filtry + uživatelé
 */
#sidebar .box .module-heading {
  padding-right: 1.5rem;
}
#sidebar .box .expander.module-toggler {
  right: 0.5rem;
}
#sidebar_content .module-content {
  padding-right: 1.6rem;
}
#sidebar_content #user-query-automatic-filter a,
#sidebar_content .saved-queries a {
  float: none;
  width: 100%;
}
/**
 * Kanban/Scrum board (Agile)
 */
.agile__col--side,
.agile__swimline .agile__col {
  min-width: 300px !important;
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
.stickyClones {
  display: none;
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
  background-color: #10171e !important;
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
table.list .group .count,
.badge {
  color: #fff !important;
  border-color: #fff;
}
.easy-entity-list__item-group-count > :nth-child(2) {
  display: none !important;
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
 * Kalendář (popup dialog)
 */
.ui-datepicker .ui-widget-header {
  background: #1c2938;
  border-color: #38444d;
}
.ui-datepicker .ui-datepicker-week-col {
  background: #1c2938;
}
.ui-datepicker .ui-state-default,
.ui-datepicker .ui-widget-content .ui-state-default,
.ui-datepicker .ui-widget-header .ui-state-default {
  color: #8899a6;
}
.ui-datepicker tbody .ui-datepicker-week-col {
  border-right: 1px solid #38444d !important;
}
.ui-datepicker .ui-datepicker-calendar thead tr {
  border-bottom: 1px solid #38444d !important;
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
.entity-array > span {
  background-color: #1c2938;
  border-color: #38444d;
}
#search-results-counts li a,
#user-query-automatic-filter a,
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
#sidebar_content:before,
#easy_grid_sidebar_content:before,
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
 * Tooltipy
 */
.journal-tools .menu-more ul li > .menu-children,
.message-tools .menu-more ul li > .menu-children,
.menu--tooltip ul li > .menu-children,
.button-group .menu-more ul li > .menu-children,
#context-menu ul li > .menu-children,
.main_menu__settings ul li > .menu-children,
.main_menu__more ul li > .menu-children,
#top-menu-container > ul > li ul li > .menu-children,
#top-menu-rich-more .top-menu-rich-more-item > li:hover ul li > .menu-children,
#top-menu-rich-more .top-menu-rich-more-item > li.open ul li > .menu-children,
.menu-user-profile > li ul li > .menu-children,
.easy-gantt__menu-group--tooltiped ul li > .menu-children,
#top-menu-rich-more .top-menu-rich-more-item > li > ul.menu-children,
.journal-tools > a > .tooltip,
.message-tools > a > .tooltip,
.list-item-actions a > .tooltip,
table.list .easy-query-additional-ending-buttons a > .tooltip,
table.list .easy-query-additional-ending-buttons > span > .tooltip,
table.list .easy-additional-ending-buttons a > .tooltip,
table.list .easy-additional-ending-buttons > span > .tooltip,
legend a.icon > .tooltip,
.input-append > a > .tooltip,
.box .module-heading-links a > .tooltip,
.easy-query-heading-controls a > .tooltip,
.tooltip-left > .tooltip,
.easy-entity-details .easy-contextual a > .tooltip,
.easy-entity-card-actions a > .tooltip,
.row-control > .expander > .tooltip,
.row-control > .expander-root > .tooltip,
.row-control > .expander-descendant > .tooltip,
div.easy-calendar table td .day-num > .tooltip,
div > .fc-grid .fc-day-number > .tooltip,
.easy-query-heading-wrapper > .tooltip,
.tooltip-bottom > .tooltip,
.tooltip-parent > .tooltip,
.agile__col-sort > .tooltip,
#invited_colleague_change_user_type_modal .icon-help-bubble > .tooltip,
.journal-tools .menu-more ul,
.message-tools .menu-more ul,
.menu--tooltip ul,
.button-group .menu-more ul,
#context-menu ul,
.main_menu__settings ul,
.main_menu__more ul,
#top-menu-container > ul > li ul,
#top-menu-rich-more .top-menu-rich-more-item > li:hover ul,
#top-menu-rich-more .top-menu-rich-more-item > li.open ul,
.menu-user-profile > li ul,
.easy-gantt__menu-group--tooltiped ul,
table.list td.assigned_to .avatar-container + span,
table.list td.author .avatar-container + span,
table.list th.assigned_to .avatar-container + span,
table.list th.author .avatar-container + span,
.tooltip-content,
[aria-describedby="invited_colleague_onboard_modal"] .tooltip {
  color: #8899a6;
}
/**
 * Buttony na konci řádku v gridu
 */
table.list td.easy-query-additional-ending-buttons .ending-buttons-fixed,
table.list td.easy-additional-ending-buttons .ending-buttons-fixed,
table.list th.easy-query-additional-ending-buttons .ending-buttons-fixed,
table.list th.easy-additional-ending-buttons .ending-buttons-fixed {
  background: #1c2938;
  padding: 0 0.4rem;
}
table.list td.easy-query-additional-ending-buttons .ending-buttons-fixed .toggle-favorite:hover:before,
table.list td.easy-additional-ending-buttons .ending-buttons-fixed .toggle-favorite:hover:before,
table.list th.easy-query-additional-ending-buttons .ending-buttons-fixed .toggle-favorite:hover:before,
table.list th.easy-additional-ending-buttons .ending-buttons-fixed .toggle-favorite:hover:before {
  background: #10171e !important;
}
/**
 * Filtry (z menu nad moduly)
 */
#filters,
#filters_settings {
  background-color: #1c2938;
  margin: 0;
}
/**
 * Okna nastaveí v administraci obsahu (např. editace )
 */
.easy-entity-cards-container,
.form-box,
#filters,
#filters_settings,
#custom_formatting,
#modal_selectorfilters,
#modal_selectorcustom_formatting,
#modal_selectorfilters_settings,
.easy-query-type-settings-container > div,
.easy-page-module-form,
#new_dmsf_workflow,
#edit_dmsf_workflow {
  background-color: #10171e;
}
/**
  * Projektový backlog - scrum/kanbal
  */
.sticky_agile_backlog_autocomplete_wrap {
  background-color: #15202b;
}
/**
 * Scroll modal
 */
.vue-modal__container {
  background-color: #10171e;
}
.vue-modal__sidebar-button {
  background: #1c2938 !important;
}
.vue-modal__sidebar-button:hover {
  background: #15202b !important;
}
.vue-modal__main {
  background: #15202b;
}
.vue-modal__overview,
.vue-modal__attributes,
.cf_buttonPanel {
  background: #1c2938 !important;
  border-bottom-color: #38444d;
}
/**
 * Našeptávač (jmen) v editoru
 */
.cke_autocomplete_panel,
#cke_autocomplete_panel {
  border-color: #38444d !important;
  background: #10171e !important;
}
.cke_autocomplete_panel > li,
#cke_autocomplete_panel > li {
  background: #10171e !important;
}
.cke_autocomplete_panel > li:hover,
.cke_autocomplete_panel > li .cke_autocomplete_selected,
#cke_autocomplete_panel > li:hover,
#cke_autocomplete_panel > li .cke_autocomplete_selected {
  background: #15202b !important;
}
/**
 * Popup kalendář a plánovač schůzek
 */
#top__tools .easy-calendar-upcoming__calendar-content {
  background: #10171e;
}
#top__tools .easy-calendar-upcoming__calendar-trigger.w-toggleable__trigger--active:before {
  background: #10171e;
}
#top__tools .easy-calendar-upcoming__calendar-trigger.w-toggleable__trigger--active:after {
  background: #10171e;
}
#top__tools .easy-calendar-upcoming__calendar-content .fc-content {
  background: #1c2938;
}
#top__tools .easy-calendar-upcoming__calendar-content.w-toggleable__content--active {
  color: #fff;
}
.fc-state-highlight {
  background: #1da1f2 !important;
}
div.easy-calendar-fc .fc-widget-header {
  border-color: #38444d !important;
}
.fc-agenda-divider-inner {
  background: #10171e !important;
}
div.easy-calendar-fc td,
div.easy-calendar-fc th {
  border-color: #38444d !important;
}
div.easy-calendar table tbody th,
div.easy-calendar-fc table tbody th {
  background: #1c2938;
}
/**
 * Danger theme 1
 * scheme-0 - červené bez pozadí
 */
.scheme-0 {
  color: #fff !important;
}
.scheme-0 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-0 td {
  color: #fff;
}
table.list > tbody > tr.scheme-0.context-menu-selection,
table.list > tbody > tr.scheme-0:hover {
  background: #10171e !important;
}
table.list > tbody .scheme-0 > td:first-child::before {
  background: rgba(231, 76, 60, 0.6) !important;
}
.agile__card.scheme-0 {
  background-color: rgba(231, 76, 60, 0.4) !important;
}
.agile__card.scheme-0 .agile__card__context-menu,
.agile__card.scheme-0 .agile__card__icons,
.agile__card.scheme-0 .agile__card__summable {
  color: #e43725;
}
/**
 * Danger theme 2
 * scheme-1 - červené s pozadím
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
 * Success theme 1
 * scheme-2 - zelené bez pozadí
 */
.scheme-2 {
  color: #fff !important;
}
.scheme-2 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-2 td {
  color: #fff;
}
table.list > tbody > tr.scheme-2.context-menu-selection,
table.list > tbody > tr.scheme-2:hover {
  background: #10171e !important;
}
table.list > tbody .scheme-2 > td:first-child::before {
  background: rgba(0, 188, 140, 0.5) !important;
}
.agile__card.scheme-2 {
  background-color: rgba(0, 188, 140, 0.4) !important;
}
.agile__card.scheme-2 .agile__card__context-menu,
.agile__card.scheme-2 .agile__card__icons,
.agile__card.scheme-2 .agile__card__summable {
  color: #00a379;
}
/**
 * Success theme 2
 * scheme-3 - zelené s pozadím
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
.scheme-6 {
  color: #fff !important;
}
.scheme-6 a {
  color: #fff !important;
  background: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0) !important;
}
.scheme-6 td {
  color: #fff;
}
table.list > tbody > tr.scheme-6.context-menu-selection,
table.list > tbody > tr.scheme-6:hover {
  background: #10171e !important;
}
table.list > tbody .scheme-6 > td:first-child::before {
  background: rgba(243, 156, 18, 0.8) !important;
}
.agile__card.scheme-6 {
  background-color: rgba(243, 156, 18, 0.6) !important;
}
.agile__card.scheme-6 .agile__card__context-menu,
.agile__card.scheme-6 .agile__card__icons,
.agile__card.scheme-6 .agile__card__summable {
  color: #e08e0b;
}
/**
 * Warning theme 2
 * scheme-7 - oranžové s pozadím
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

    // TODO
    //modGantt();

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
    getTodaysAttendance();
    getTodaysTimeEntries();
    generateUtilization();

    // Timeline v sekci "Moje výkazy"
    showTimeline();
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

        var card = cards[i];

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
 * Převede objekt parametrů na url search string
 * @param {any} params
 */
function makeUrlSearchString(params) {
    return params ? "?" + Object.keys(params).map(key => [key, params[key]].map(encodeURIComponent).join("=")).join("&") : "";
}

/**
 * Volání API EP a získání informací o docházce
 * easy_attendances > easy_attendance > arrival, departure
 * /easy_attendances/arrival?arrival_at=2019-03-17&back_url=https%3A%2F%2Fcreasoft.easyproject.cz%2F%3Ft%3D5
 * /easy_attendances/4962/departure?back_url=https%3A%2F%2Fcreasoft.easyproject.cz%2F%3Ft%3D5
 */
function getTodaysAttendance() {
    const params = {
        arrival: "today",
        set_filter: 1,
        user_id: getUserInfo(),
        _: new Date().getTime() // Cache busting
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
    // Nepřítomnost - dovolená/lékař/nemoc
    var absence = 0;

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

    // Enumerate easy_attendances
    $.each(attendances, function(index, attendance) {
        // Hledáme nepřítomnost
        // 5 - Lékař
        // 4 - Nemoc
        // 3 - Dovolená
        if (
            attendance.easy_attendance_activity.id === 3 ||
            attendance.easy_attendance_activity.id === 4
        ) {
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
        "Pracovní dny: " +
        weekDays.currentWeekday +
        "/" +
        weekDays.totalWeekdays +
        ", " +
        "nepřítomnost (dny): " +
        absence +
        ", " +
        "fond prac. doby (h): " +
        weekDays.currentWeekday * 8 +
        "/" +
        weekDays.totalWeekdays * 8;

    const workdaysDetailInfo =
        "Vykázáno celkem: " +
        getHoursAndMinutesFromSeconds(totalSeconds) +
        ", " +
        "tj. průměr/MD " +
        average.toFixed(2) +
        "h [" +
        utilization +
        "%], " +
        "zbývá vykázat: " + missingHours;

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
        spent_on: "today",
        set_filter: 1,
        user_id: getUserInfo(),
        _: new Date().getTime() // Cache busting
    };

    const todaysAttendanceParams = {
        arrival: "today",
        set_filter: 1,
        user_id: getUserInfo(),
        _: new Date().getTime() // Cache busting
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
