using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace P2EPayroll
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region Common CSS
            bundles.Add(new StyleBundle("~/content/css/bootstrap/bootstrapcss").Include(
                "~/Content/css/bootstrap/bootstrap.min.css",
                "~/Content/css/bootstrap/font-awesome.css",
                "~/Content/css/bootstrap/datepicker.css",
                "~/Content/css/toastr/toastr.css"));

            bundles.Add(new StyleBundle("~/content/css/layoutcss").Include(
                //"~/Content/css/Tour/introjs.css",
                //"~/Content/css/reset.css",
                "~/Content/css/style.css",
                "~/Content/css/jquery.dataTables.min.css"));

            bundles.Add(new StyleBundle("~/Content/css/kendoui/kendocss").Include(
             "~/Content/css/kendoui/kendo.common.min.css",
             "~/Content/css/kendoui/kendo.default.min.css",
             "~/Content/css/kendoui/kendo.common-material.min.css",
             "~/Content/css/kendoui/kendo.material.min.css",
             "~/Content/css/kendoui/kendo.material.mobile.min.css",
             "~/Content/css/kendoui/kendo.dataviz.default.min.css",
             "~/Content/css/KendochartCSS/kendo.dataviz.min.css"));
            #endregion

            #region Common JS

            bundles.Add(new ScriptBundle("~/content/js/layoutjs").Include(
                "~/Content/js/toastr/toastr.js",
                "~/Content/js/jquery/jquery-migrate.js",
                "~/Content/js/jquery/jquery-ui.js",
                "~/Content/js/bootstrap/bootstrap.min.js",
                "~/Content/js/bootstrap/bootstrap-typeahead.js",
                "~/Content/js/bootstrap/bootstrap-datepicker.js",
                "~/Content/js/jquery/scriptbreaker-multiple-accordion-1.js",
                "~/Content/js/jquery/bootbox.min.js",
                "~/Content/js/jquery/jquery.shortcut.js",
                 "~/Content/js/jquery/jquery.placeholder.js",
                "~/Content/js/Tour/intro.js",
                 "~/Content/js/kendoui/kendo.web.min.js",
                 "~/Content/js/kendoui/kendo.culture.en-GB.min.js"
                ));
            bundles.Add(new ScriptBundle("~/Content/js/validatejs").Include(
                  "~/Content/js/jquery/validation/jquery.validate.min.js"
                ));
            bundles.Add(new ScriptBundle("~/content/js/Commonjs").Include(
               "~/Content/js/common.js",
               "~/Content/js/jquery.dataTables.min.js",
               "~/Content/js/jquery/jquery.blockUI.js"
               ));

            bundles.Add(new ScriptBundle("~/content/js/jquery/slimscroll/slimscrolljs").Include(
                "~/Content/js/jquery/slimscroll/jquery.slimscroll.js"));


            bundles.Add(new ScriptBundle("~/content/js/jquery/sortable/sortablejs").Include(
                "~/Content/js/jquery/sortable/sortable.js",
                "~/Content/js/jquery/sortable/sortable-animate.js"));

            bundles.Add(new ScriptBundle("~/Content/js/kendoui/kendojs").Include(
                 "~/Content/js/KendochartJs/jszip.min.js",
                 "~/Content/js/KendochartJs/kendo.all.min.js",
                 "~/Content/js/KendochartJs/kendo.pdf.min.js"));



            bundles.Add(new ScriptBundle("~/Content/js/jquery/datatablejs").Include(
             "~/Content/js/jquery/jquery.dataTables.js",
             "~/Content/js/bootstrap/dataTable-bootstrap.js",
             "~/Content/js/jquery/ZeroClipboard.js",
             "~/Content/js/jquery/TableTools.js",
              "~/Content/js/bootstrap/DataTableCurrency.js"));

            #endregion
            
            bundles.Add(new ScriptBundle("~/KiwiScripts/Loginjs").Include(
               "~/KiwiScripts/Logins/Login/Init.js",
               "~/KiwiScripts/Logins/Login/Handlers.js",
               "~/KiwiScripts/Logins/Login/Functions.js"
               ));
            bundles.Add(new ScriptBundle("~/KiwiScripts/Registrationjs").Include(
               "~/KiwiScripts/Logins/Registration/Functions.js",
               "~/KiwiScripts/Logins/Registration/Handlers.js",
               "~/KiwiScripts/Logins/Registration/Init.js"
            ));
            bundles.Add(new ScriptBundle("~/KiwiScripts/UserProfilejs").Include(
               "~/KiwiScripts/Users/UserProfile/Init.js",
               "~/KiwiScripts/Users/UserProfile/Handlers.js",
               "~/KiwiScripts/Users/UserProfile/Functions.js"
               ));
            bundles.Add(new ScriptBundle("~/KiwiScripts/ChangePasswordjs").Include(
               "~/KiwiScripts/Users/ChangePassword/Init.js",
               "~/KiwiScripts/Users/ChangePassword/Handlers.js",
               "~/KiwiScripts/Users/ChangePassword/Functions.js"
            ));
        }
    }
}