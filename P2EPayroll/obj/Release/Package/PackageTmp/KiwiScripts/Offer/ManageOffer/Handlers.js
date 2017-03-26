$(document).ready(function () {
    $("#btnNext").click(function () {

        $('#entryoffer-panel').hide();
        //$("#ddlOutlet").
        $('#selectimage-panel').show();
        $('ul#status-bar').addClass('imageactive');
    });
    $("#ddlOutletFilter").change(function () {
        Callback("Offer", "GetOfferList", fnGetOfferListSuccess, fail, "Outlet", $("#ddlOutletFilter").val(), "OfferStatus", $("#ddlOfferStatus").val())
    })
    $("#ddlOfferStatus").change(function () {
        Callback("Offer", "GetOfferList", fnGetOfferListSuccess, fail, "Outlet", $("#ddlOutletFilter").val(), "OfferStatus", $("#ddlOfferStatus").val())
    })
    $("#rdOutlet, #rdBroadcast").change(function () {
        if ($("#rdOutlet").is(":checked")) {
            var dropdownlist = $("#ddlOutlet").data("kendoMultiSelect");
            dropdownlist.enable(true);
        }
        else if ($("#rdBroadcast").is(":checked")) {
            var dropdownlist = $("#ddlOutlet").data("kendoMultiSelect");
            dropdownlist.enable(false);
        }
        Outletddl.value(valuesall);

        //var ddlOutlet = $("#ddlOutlet").kendoMultiSelect().data("kendoMultiSelect");
        //ddlOutlet.value(valuesall);
        //console.log($("#ddlOutlet").kendoMultiSelect().data("kendoMultiSelect").dataSource.data());
        //var ddlOutlet = $("#ddlOutlet").kendoMultiSelect().data("kendoMultiSelect");
        //var values = $.map(ddlOutlet.dataSource.data(), function (dataItem) {
        //    return dataItem.value;
        //});
        //ddlOutlet.value(values);
    });
    $("#btnSave").click(function () {
        if (SelectedImage == 0) {
            toastr.error("Please Select the offer Image");
        }
        else {
            var multiselect = $("#ddlOutlet").data("kendoMultiSelect");
            var selectedData = [];
            var items = multiselect.value();
            $.each(items, function (i, v) {
                selectedData.push({ OutLetID: v });
            });
            var offerModel = {
                OfferName: $("#txtOfferName").val(),
                OrderAvailable: $("#txtOrderAvailable").val(),
                OfferCost: $("#txtOfferCost").val(),
                StartDate: $("#txtStartDate").val(),
                EndDate: $("#txtEndDate").val(),
                OfferDescription: $("#txtOfferDescription").val(),
                GalleryID: SelectedImage[0],
                OutLetIDs: selectedData
            };
            stringifyCallback(
               "Offer",
                  "SaveOffers",
              SaveOffersSuccess,
               fail,
               "offerModel", JSON.stringify(offerModel)
               );
        }

    })
    var form = $("#frmmgOffer");
    form.validate();
    $("#btnNextSave").click(function () {

        var multiselect = $("#ddlOutlet").data("kendoMultiSelect");
        var selectedData = [];
        var items = multiselect.value();
        $.each(items, function (i, v) {
            selectedData.push({ OutLetID: v });
        });
        if (selectedData.length == 0) {
            $("#txtOutletError").show();

        }
        else {
            $("#txtOutletError").hide(); if (form.valid()) {

                $('#entryoffer-panel').hide();
                //$("#ddlOutlet").
                $('#selectimage-panel').show();
                $('ul#status-bar').addClass('imageactive');
            }
        }

    });
})