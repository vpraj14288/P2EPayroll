﻿function fnGetOutletsSuccess(data) {
    Outletddl = $("#ddlOutlet").kendoMultiSelect({
        optionLabel: "Select Outlet...",
        dataTextField: "OutletName",
        dataValueField: "UserID",
        dataSource: data.Result,
        placeholder: "Please Select Outlet..."
    }).data("kendoMultiSelect");
    if (data.RoleID == 3) {

        for (var i = 0; i < data.Result.length; i++) {
            valuesall.push(data.Result[i].UserID);
        }
        Outletddl.value(valuesall);
    }
    $("#ddlOutletFilter").append($("<option></option>").val(0).html("Select All"));

    $.each(data.Result, function (key, value) {
        $("#ddlOutletFilter").append($("<option></option>").val(value.UserID).html(value.OutletName));
    });
    //var Outletddlfilter = $("#ddlOutletFilter").kendoMultiSelect({
    //    optionLabel: "Select Outlet...",
    //    dataTextField: "OutletName",
    //    dataValueField: "UserID",
    //    dataSource: data.Result,
    //    select: onSelect,
    //    change: onChange
    //}).data("kendoMultiSelect");
    //Outletddlfilter.value(valuesall);
    //var OfferStatusddl = $("#ddlOfferStatus").kendoMultiSelect({
    //    select: onSelect,
    //    change: onChange
    //});
    //var ddlCustomers = $("#ddlOutlet");
    //$.each(data.Result, function () {
    //    ddlCustomers.append($("<option></option>").val(this.UserID).html(this.OutletName));
    //});
    if (data.RoleID == 3) {
        $("#dvOutletshowhide").hide();
    }
    //var values = $.map($("#ddlOutlet").kendoMultiSelect().data("kendoMultiSelect").dataSource.data(), function (dataItem) {
    //    return dataItem.value;
    //});
    //$("#ddlOutlet").kendoMultiSelect().data("kendoMultiSelect").value(values);
    Callback("Offer", "GetOfferList", fnGetOfferListSuccess, fail, "Outlet", $("#ddlOutletFilter").val(), "OfferStatus", $("#ddlOfferStatus").val())
    //Callback("Offer", "GetOfferList", fnGetOfferListSuccess, fail);
    if (data.RoleID == 3) {
        $("#dvOutletshowhide").hide();
        $("#dvOutletshowhide1").hide();
    }
    //var optional = $("#ddlOutlet").kendoMultiSelect({
    //    autoClose: false
    //}).data("kendoMultiSelect");
    //optional.dataSource.data = data;
}

function fnGetOfferListSuccess(data) {
    Callback("Offer", "GetGalleryDetails", fnGetGalleryDetailsSuccess, fail)
    if (!data || !data.length) {
        $('#tableid').html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No Offers found.</h2></center></div>"));
        return;
    }
    var columns = [];
    $.each(data[0], function (i, val) {
        if (i != "OfferID") {
            if (i != "Offer Status") {
                columns.push(
                    {
                        "title": "" + i,
                        "data": "" + i,
                        "render": function (data, type, row) {
                            return "<span class=\"moblie-align\" data-offerid=" + row.OfferID + ">" + row[i] + "</span>";
                        },
                        "createdCell": function (row, data, index) {
                            row.setAttribute('data-th', i);
                        }
                    });
            }
            else {
                columns.push(
                {
                    "title": "" + i,
                    "data": "" + i,
                    "render": function (data, type, row) {
                        return "<span class='off-status " + data + "' title='" + data + "'>" + row[i] + "</span>";
                    },
                    "createdCell": function (row, data, index) {
                        row.setAttribute('data-th', i);
                    }
                });

            }
        }
    });
    if (typeof (dtaTable) != "undefined") {
        dtaTable.fnDestroy();
    }
    $("#tableid").empty();
    //var userid = '';
    dtaTable = $('#tableid').dataTable({
        "data": data,
        "columns": columns,
        "createdRow": function (row, data, index) {
            row.setAttribute('data-offerid', data.OfferID);
        },
        "searchable": true,
        "pagingType": "full_numbers"
    });


    $("#tableid").on("click", ".moblie-align", function () {
        if (typeof ($(this).data("offerid")) !== "undefined") {
            $('#dvViewOffer').modal('show');
            Callback("Offer", "GetOfferDetail", fnGetOfferDetailSuccess, fail, "OfferID", $(this).data("offerid"))
        }
    });

    $("#tableid").removeClass("dataTable");
}

function fnUpdatedGetOutletsSuccess(data) {
    if (!data || !data.length) {
        $('#tableid').html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No Offers found.</h2></center></div>"));
        return;
    }
    if (data.length > 0) {
        var table = $('#tableid').DataTable();

        table.destroy();

        var columns = [];
        $.each(data[0], function (i, val) {
            if (i != "OfferID") {
                if (i != "Offer Status") {
                    columns.push(
                        {
                            "title": "" + i,
                            "data": "" + i,
                            "render": function (data, type, row) {
                                return "<span class=\"moblie-align\" data-offerid=" + row.OfferID + ">" + row[i] + "</span>";
                            },
                            "createdCell": function (row, data, index) {
                                row.setAttribute('data-th', i);
                            }
                        });
                }
                else {
                    columns.push(
                    {
                        "title": "" + i,
                        "data": "" + i,
                        "render": function (data, type, row) {
                            return "<span class='off-status " + data + "' title='" + data + "'>" + row[i] + "</span>";
                        },
                        "createdCell": function (row, data, index) {
                            row.setAttribute('data-th', i);
                        }
                    });

                }
            }
        });

        $("#tableid").empty();
        //var userid = '';
        $('#tableid').dataTable({
            "data": data,
            "columns": columns,
            "createdRow": function (row, data, index) {
                row.setAttribute('data-offerid', data.OfferID);
            },
            //"columnDefs": [
            //    {
            //        "render": function (data, type, row) {
            //            //return "<span>" + data + ' (' + row[3] + ')' + "</span>";
            //            return "<span class='off-status " + data + "' title='Completed Offers'>Completed Offers</span>"
            //        },
            //        "targets": -1,
            //        "orderable": false
            //    }
            //    //{ "orderable": false, "targets": '_all' }
            //],
            "searchable": true,
            "pagingType": "full_numbers"
        });
        $("#tableid").on("click", ".moblie-align", function () {
            if (typeof ($(this).data("offerid")) !== "undefined") {
                $('#dvViewOffer').modal('show');
                Callback("Offer", "GetOfferDetail", fnGetOfferDetailSuccess, fail, "OfferID", $(this).data("offerid"))
            }
        });
        $("#tableid").removeClass("dataTable");
    }
    else {
        $("#tableid").empty();
    }
}

function fnGetOfferDetailSuccess(data) {
    if (data.length > 0) {
        $("#imgOfferDetail").attr("src", data[0].ImagePath);
        $("#txtVOfferName").val(data[0].OfferName);
        $("#txtVStartDate").val(data[0].StartDate);
        $("#txtVEndDate").val(data[0].EndDate);
        $("#txtVOrdersAvailable").val(data[0].OrderAvailable);
        $("#txtVOfferCost").val(data[0].OfferCost);
        $("#txtVOfferDescription").val(data[0].OfferLongDescription);
    }
}

function fnGetGalleryDetailsSuccess(data) {
    var dataSource = new kendo.data.DataSource({
        data: data,
        pageSize: 3
    });

    $("#pager").kendoPager({
        dataSource: dataSource
    });

    $("#listView").kendoListView({
        dataSource: dataSource,
        selectable: true,
        change: onChange,
        template: kendo.template($("#template").html())
    });

    $("#listView").removeClass('k-widget');

    function onChange() {
        var data = dataSource.view(),
            selected = $.map(this.select(), function (item) {
                return data[$(item).index()].GalleryID;
            });
        SelectedImage = selected;
    }
    //$(".imgCompany").attr("src", "data:image/png;base64," + data[0].Image);
    //$("#txtCompanyName").val(data[0].CompanyName);
    //$("#txtEmailID").val(data[0].EmailID);
    //$("#txtFirstName").val(data[0].FirstName);
    //$("#txtLastName").val(data[0].LastName);
    //$("#txtDesignation").val(data[0].Designation);
    //$("#txtCompanyPhoneNo").val(data[0].CompanyPhoneNo);
    //$("#txtAddress1").val(data[0].CompanyAddress1);
    //$("#txtAddress2").val(data[0].CompanyAddress2);
    //$("#txtCity").val(data[0].City);
    //$("#txtZipCode").val(data[0].ZipCode);
    //$("#txtCompnayDescription").val(data[0].CompanyDescription);
}
function SaveOffersSuccess(msg) {

    if (msg[0].SuccessMessage == 2) {
        toastr.warning(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == -1) {
        toastr.error(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == 1) {
        $('#entryoffer-panel').show();
        //$("#ddlOutlet").
        $('#selectimage-panel').hide();
        $("#txtOfferName").val("");
        $("#txtOrderAvailable").val("");
        $("#txtOfferCost").val("");
        $("#txtOfferDescription").val("");
        $('#create-newoffer-popup').modal('hide');
        $("#rdOutlet").attr('checked', true).trigger('click');
        var dropdownlist = $("#ddlOutlet").data("kendoMultiSelect");
        dropdownlist.enable(true);
        Outletddl.value(valuesall);
        toastr.success(msg[0].Alert);
        Callback("Offer", "GetOfferList", fnGetOfferListSuccess, fail, "Outlet", $("#ddlOutletFilter").val(), "OfferStatus", $("#ddlOfferStatus").val())
    }


    //if (typeof (data.error) == "undefined") {
    //    $('#entryoffer-panel').show();
    //    //$("#ddlOutlet").
    //    $('#selectimage-panel').hide();
    //    $("#txtOfferName").val("");
    //    $("#txtOrderAvailable").val("");
    //    $("#txtOfferCost").val("");
    //    $("#txtOfferDescription").val("");
    //    $('#create-newoffer-popup').modal('hide');
    //    $("#rdOutlet").attr('checked', true).trigger('click');
    //    var dropdownlist = $("#ddlOutlet").data("kendoMultiSelect");
    //    dropdownlist.enable(true);
    //    Outletddl.value(valuesall);
    //    toastr.success(data[0].SuccessMessage);
    //}
    //else {
    //    if (data.error) {
    //        toastr.error(data.message);
    //    }
    //}
}
