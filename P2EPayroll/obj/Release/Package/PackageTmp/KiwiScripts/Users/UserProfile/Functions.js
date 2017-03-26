function fnGetUserProfileSuccess(data) {
    //$(".imgCompany").attr("src", "data:image/png;base64," + data[0].Image);
    $("#txtCompanyName").val(data[0].CompanyName);
    $("#txtOutletName").val(data[0].CompanyName);
    $("#txtEmailID").val(data[0].EmailID);
    $("#txtIndividualEmailID").val(data[0].EmailID);
    $("#txtFirstName").val(data[0].FirstName);
    $("#txtLastName").val(data[0].LastName);
    $("#txtDesignation").val(data[0].Designation);
    $("#txtCompanyPhoneNo").val(data[0].CompanyPhoneNo);
    $("#txtIndividualPhoneNo").val(data[0].CompanyPhoneNo);
    $("#txtRestaurantName").val(data[0].RestaurantName);
    if ($("#txtRole").val() != 2) {
        var ddl = $('#txtCusineType').data('kendoDropDownList');
        ddl.select(function (dataItem) {
            return dataItem.CusineID.toString() === data[0].CusineType;
        });
    }

    $(".gllpLatitude").val(data[0].Lattitude);
    $(".gllpLongitude").val(data[0].Longitude);
    $(document).gMapsLatLonPicker().init($(".gllpLatlonPicker"));
    $("#txtAddress1").val(data[0].CompanyAddress1);
    $("#txtAddress2").val(data[0].CompanyAddress2);
    $("#txtCity").val(data[0].City);
    $("#txtZipCode").val(data[0].ZipCode);
    $("#txtCompnayDescription").val(data[0].CompanyDescription);
}

function fn_SaveUserDetailsSuccess(data) {
    toastr.success('Saved Successfully');
}
function fnGetUploadImageSuccess(data) {
    $(".imgCompany").attr("src", data[0].Image);
}


function fnGetCusineSuccess(data) {
    Callback("Users", "GetUserProfile", fnGetUserProfileSuccess, fail)
    $("#txtCusineType").kendoDropDownList({
        optionLabel: "Select Cusine...",
        dataTextField: "Cusine",
        dataValueField: "CusineID",
        dataSource: data,
        index: 0
    });
}
