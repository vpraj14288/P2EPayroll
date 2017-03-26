$(document).ready(function () {
    $("#btnEdit").click(function () {
        $("#savesection").show();
    })
    $("#btnIndEdit").click(function () {
        $("#Indsavesection").show();
    })
    $("#btnClear").click(function () {
        $("#savesection").hide();
        Callback("Outlet", "GetCusine", fnGetCusineSuccess, fail)
    })
    $("#btnIndClear").click(function () {
        $("#Indsavesection").hide();
        Callback("Outlet", "GetCusine", fnGetCusineSuccess, fail)
    })
    $("#imageUploadForm").change(function () {
        var formData = new FormData();
        var totalFiles = document.getElementById("imageUploadForm").files.length;
        for (var i = 0; i < totalFiles; i++) {
            var file = document.getElementById("imageUploadForm").files[i];
            formData.append("imageUploadForm", file);
        }
        $.ajax({
            type: "POST",
            url: '/Users/UploadImage',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
                $('#uploadimage-popup').modal('hide')
                Callback("Users", "GetUploadImage", fnGetUploadImageSuccess, fail, "Image", response);
            },
            error: function (error) {
                alert("errror");
            }
        });
    });
    $("#btnSave").click(function () {

        //var UserProfileDetails = {
        //    EmployeeCode: $("#txtEmployeeCode").val(),
        //    Idea: $("#txtIdea").val(),
        //    LocationName: "Testlocation",
        //    IPConfig: "TestIP",
        //    DeviceType: "TestDevicename"
        //}

        var form = $("#frmmgUsrProfile");
        form.validate();
        if (form.valid()) {
            var UserProfileDetails = new Object();
            UserProfileDetails.CompanyName = $("#txtCompanyName").val();
            UserProfileDetails.EmailID = $("#txtEmailID").val();
            UserProfileDetails.FirstName = $("#txtFirstName").val();
            UserProfileDetails.LastName = $("#txtLastName").val();
            UserProfileDetails.Designation = $("#txtDesignation").val();
            UserProfileDetails.CompanyPhoneNo = $("#txtCompanyPhoneNo").val();
            UserProfileDetails.CompanyAddress1 = $("#txtAddress1").val();
            UserProfileDetails.CompanyAddress2 = $("#txtAddress2").val();
            UserProfileDetails.City = $("#txtCity").val();
            UserProfileDetails.ZipCode = $("#txtZipCode").val();
            UserProfileDetails.CompanyDescription = $("#txtCompnayDescription").val();

            stringifyCallback("Users", "SaveUserDetails", fn_SaveUserDetailsSuccess, fn_Failure, "UserProfileDetails",
                      JSON.stringify(UserProfileDetails));
        }
    });

    $("#btnIndividualSave").click(function () {

        var form = $("#frmmgUsrIndividualProfile");
        form.validate();
        if (form.valid()) {
            var IndividualUsersProfile = new Object();
            IndividualUsersProfile.CompanyName = $("#txtOutletName").val();
            IndividualUsersProfile.EmailID = $("#txtIndividualEmailID").val();
            IndividualUsersProfile.CusineType = $("#txtCusineType").val();
            IndividualUsersProfile.CompanyPhoneNo = $("#txtIndividualPhoneNo").val();

            stringifyCallback("Users", "SaveIndividualUserDetails", fn_SaveUserDetailsSuccess, fn_Failure, "UserProfileDetails",
                      JSON.stringify(IndividualUsersProfile));
        }
    });
})