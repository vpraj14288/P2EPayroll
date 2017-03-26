$(document).ready(function () {

    $("#imageUploadForm").change(function () {
        var formData = new FormData();
        var totalFiles = document.getElementById("imageUploadForm").files.length;
        for (var i = 0; i < totalFiles; i++) {
            var file = document.getElementById("imageUploadForm").files[i];
            formData.append("imageUploadForm", file);
        }
        $.ajax({
            type: "POST",
            url: '/Gallery/Upload',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
                $(".gllpImage").val(response);
            },
            error: function (error) {
                alert("errror");
            }
        });
    });
    var form = $("#frmmgGallery");
    form.validate();

    $("#btnSave").click(function () {
        if (form.valid()) {
            if ($(".gllpImage").val() !== '') { 
                var GalleryDetails = new Object();
                GalleryDetails.ImageTitle = $("#txtImageTitle").val();
                GalleryDetails.OfferDescription = $("#txtOfferDescription").val();
                GalleryDetails.Image = $(".gllpImage").val();

                stringifyCallback("Gallery", "SaveGalleryDetails", fn_SaveUserDetailsSuccess, fn_Failure, "GalleryDetails",
                              JSON.stringify(GalleryDetails));
            }
            else {
                toastr.error('Please Select Image');
            }
        }
    });
    //$("#btnSave").click(function () {

    //    //var UserProfileDetails = {
    //    //    EmployeeCode: $("#txtEmployeeCode").val(),
    //    //    Idea: $("#txtIdea").val(),
    //    //    LocationName: "Testlocation",
    //    //    IPConfig: "TestIP",
    //    //    DeviceType: "TestDevicename"
    //    //}

    //    var UserProfileDetails = new Object();
    //    UserProfileDetails.CompanyName = $("#txtCompanyName").val();
    //    UserProfileDetails.EmailID = $("#txtEmailID").val();
    //    UserProfileDetails.FirstName = $("#txtFirstName").val();
    //    UserProfileDetails.LastName = $("#txtLastName").val();
    //    UserProfileDetails.Designation = $("#txtDesignation").val();
    //    UserProfileDetails.CompanyPhoneNo = $("#txtCompanyPhoneNo").val();
    //    UserProfileDetails.CompanyAddress1 = $("#txtAddress1").val();
    //    UserProfileDetails.CompanyAddress2 = $("#txtAddress2").val();
    //    UserProfileDetails.City = $("#txtCity").val();
    //    UserProfileDetails.ZipCode = $("#txtZipCode").val();
    //    UserProfileDetails.CompanyDescription = $("#txtCompnayDescription").val();

    //    stringifyCallback("Users", "SaveUserDetails", fn_SaveUserDetailsSuccess, fn_Failure, "UserProfileDetails",
    //              JSON.stringify(UserProfileDetails));
    //});
})