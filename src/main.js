/**
 * Created by arnab on 2/11/15.
 */
import $ from 'jquery';
import 'jquery-ui';
import $growl from 'jquery-growl';
import 'modernizr';

/*
 * patch for jquery growl functions.
 * do not to show multiple growls with the same content.
 * add more info to messages realted to websocket "rate limit"
 */
["error", "notice", "warning"].forEach(function(name) {
    var perv = $.growl[name].bind($.growl);
    $.growl[name] = function(options) {
        if (options.message.indexOf("rate limit") > -1) {
            options.message += " Please try again after 1 minute.".i18n();
        }
        if (!options.title) { options.title = ""; /* remove title */ }
        /* remove current growl with the same message */
        $("#growls .growl:contains(\"" + options.message + "\")").remove();
        perv(options);
    };
});

var Modernizr = window.Modernizr;
if (!Modernizr.svg || !Modernizr.websockets || (Modernizr.touch && window.isSmallView()) ||
    !Modernizr.localstorage || !Modernizr.webworkers || !Object.defineProperty) {
    window.location.assign("unsupported_browsers/unsupported_browsers.html");
}

/*Trigger T&C check, self-exclusion, reality check, chrome extension check, csr_tax_information check*/
import "selfexclusion/selfexclusion";
import "chrome/chrome";
import "accountstatus/accountstatus";
import "realitycheck/realitycheck";
import "websitestatus/websitestatus";

/* Initialize the websocket as soon as possible */
import "./websockets/binary_websockets";

/* main.css overrides some classes in jquery-ui.css, make sure to load it after jquery-ui.css file */
import 'jquery-ui-dist/jquery-ui.min.css';
import 'jquery-ui-iconfont/jquery-ui.icon-font.css';
import 'chosen-js/chosen.css';
import 'growl/stylesheets/jquery.growl.css';
//fix this later when bower_components is removed - TODO
import '../bower_components/datatables/media/css/jquery.dataTables.min.css';
import '../bower_components/datatables/media/css/dataTables.jqueryui.min.css';
import 'colorpicker/jquery.colorpicker.css';
import './main.css';

import windows from 'windows/windows';
import navigation from 'navigation/navigation';
import instruments from "instruments/instruments";
import trade from "trade/tradeMenu";

/* example: load_ondemand(li,"click","tradingtimes/tradingtimes",callback) */
function load_ondemand(element, event_name, msg, module_name, callback) {
    var func_name = null;
    element.one(event_name, func_name = function() {

        //Ignore click event, if it has disabled class
        if (element.hasClass("disabled")) {
            element.one(event_name, func_name);
            return;
        }

        System.import(module_name).then(function(module) {
            msg && $.growl.notice({ message: msg });
            callback && callback(module);
        });

    });
}

var i18n_name = (window.local_storage.get("i18n") || { value: "en" }).value;
System.import("i18n/" + i18n_name + ".json").then(function(lang_json) {
    "use strict";
    /* setup translating string literals */
    window.setup_i18n_translation(JSON.parse(lang_json));
    if (i18n_name === "ar") {
        $("body").addClass("rtl-direction");
    }

    /* We do not allow entire webtrader.binary.com to be included in IFRAME */
    if (self !== top) {
        top.location = self.location;
        return;
    }

    /* this callback is executed right after the navigation module
       has been loaded & initialized. register your menu click handlers here */
    var registerMenusCallback = function($navMenu) {

        //Register async loading of tradingTimes sub-menu
        load_ondemand($navMenu.find("a.tradingTimes"), "click", "Loading Trading Times ...".i18n(), "tradingtimes/tradingTimes", function(tradingTimes) {
            var elem = $navMenu.find("a.tradingTimes");
            tradingTimes.init(elem);
            elem.click();
        });

        //Register async loading of token-management sub-menu
        load_ondemand($navMenu.find("a.token-management"), "click", "Loading Token management ...".i18n(), "token/token", function(tokenMangement) {
            var elem = $navMenu.find("a.token-management");
            tokenMangement.init(elem);
            elem.click();
        });

        //Register async loading of change-password sub-menu
        load_ondemand($navMenu.find("a.change-password"), "click", "Loading Password dialog ...".i18n(), "password/password", function(password) {
            var elem = $navMenu.find("a.change-password");
            password.init(elem);
            elem.click();
        });

        //Register async loading of window asset-index
        load_ondemand($navMenu.find("a.assetIndex"), "click", "Loading Asset Index ...".i18n(), "assetindex/assetIndex",
            function(assetIndex) {
                var elem = $navMenu.find("a.assetIndex");
                assetIndex.init(elem);
                elem.click();
            });

        //Register async loading of portfolio window
        load_ondemand($navMenu.find("a.portfolio"), "click", "Loading portfolio ...".i18n(), "portfolio/portfolio",
            function(portfolio) {
                var elem = $navMenu.find("a.portfolio");
                portfolio.init(elem);
                elem.click();
            });

        //Register async loading of real account opening window
        load_ondemand($navMenu.find("a.real-account"), "click", "Loading Real account opening ...".i18n(), "realaccount/realaccount",
            function(real) {
                var elem = $navMenu.find("a.real-account");
                real.init(elem);
                elem.click();
            });

        //Register async loading of real account opening window
        load_ondemand($navMenu.find("a.deposit"), "click", "Loading Deposit funds ...", "cashier/deposit",
            function(deposit) {
                var elem = $navMenu.find("a.deposit");
                deposit.init(elem);
                elem.click();
            });

        //Register async loading of real account opening window
        load_ondemand($navMenu.find("a.withdraw"), "click", "Loading Withdraw funds ...", "cashier/withdraw",
            function(withdraw) {
                withdraw = withdraw.default || withdraw;
                var elem = $navMenu.find("a.withdraw");
                withdraw.init(elem);
                elem.click();
            });

        //Register async loading of window profit-table
        load_ondemand($navMenu.find("a.profitTable"), "click", "Loading Profit Table ...".i18n(), "profittable/profitTable",
            function(profitTable) {
                var elem = $navMenu.find("a.profitTable");
                profitTable.init(elem);
                elem.click();
            });

        //Register async loading of statement dialog
        load_ondemand($navMenu.find("a.statement"), "click", "Loading Statement Table ...".i18n(), "statement/statement",
            function(statement) {
                var elem = $navMenu.find("a.statement");
                statement.init(elem);
                elem.click();
            });

        //Register async loading of historical-data dialog
        load_ondemand($navMenu.find("a.historical-data"), 'click', 'Loading Download/View Data ...'.i18n(), 'historical-data/historical-data',
            function(historicalData) {
                var elem = $navMenu.find("a.historical-data");
                historicalData.init(elem);
                elem.click();
            });

        //Register async loading of self-exclusion dialog
        load_ondemand($navMenu.find("a.selfexclusion"), "click", "Loading Self-Exclusion ...".i18n(), "selfexclusion/selfexclusion",
            function(selfexclusion) {
                var elem = $navMenu.find("a.selfexclusion");
                selfexclusion.init(elem);
                elem.click();
            });

        //Register async loading of config dialog
        load_ondemand($navMenu.find("a.config"), "click", "Loading Configurations ...".i18n(), "config/config",
            function(config) {
                var elem = $navMenu.find("a.config");
                config.init(elem);
                elem.click();
            });

        //Register async loading of custom theme dialog
        load_ondemand($navMenu.find("a.theme_custom"), "click", "Loading custom theme configuration...".i18n(), "themes/custom_theme/custom_theme",
            function(custom_theme) {
                var elem = $navMenu.find("a.theme_custom");
                custom_theme.init(elem);
                elem.click();
            });

        //Register async loading of help dialog
        load_ondemand($navMenu.find("a.help"), "click", "Loading help docs...".i18n(), "help/help",
            function(help) {
                var elem = $navMenu.find("a.help");
                help.init_help(elem);
                elem.click();
            });


    };

    navigation.init(registerMenusCallback);

    /* initialize the top menu because other dialogs
     * will assume an initialized top menu */
    $("#menu").menu();

    //Trigger async loading of instruments and trade menu and refresh
    $.growl.notice({ message: "Loading chart and trade menus ...".i18n() });

    instruments.init();
    trade.init();

    //Trigger async loading of window sub-menu
    var $windowsLI = $("#nav-menu .windows");
    windows.init($windowsLI);
    // hide the main loading spinner,
    // after the `last module` has been loaded.
    $(".sk-spinner-container").hide();
    $("body > .footer").show();

});
