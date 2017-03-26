
function fnGetAdminGetGeneralUserSuccess(data) {
    var columns = [];
    var colind = 0;
    if (!data && !data.length) return;

    $.each(data[0], function (i, val) {
        if (colind == 0) {//UserID, Branch Area
        }
        else {
            if (colind == 1)
                //Outlet Name
            {
                columns.push(
                   {
                       "title": "" + i,
                       "data": "" + i,
                       "render": function (data, type, row) {
                           return "<span class=\"moblie-align\">" + row[i] + "</span>";
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
                       return "<span class=\"moblie-align\">" + row[i] + "</span>";
                   },
                   "createdCell": function (row, data, index) {
                       row.setAttribute('data-th', i);
                   }
               });

            }
        }
        colind = colind + 1;
    });

    if (typeof (dtaTable) != "undefined") {
        dtaTable.fnDestroy();
    }
    $("#tableid").empty();
    dtaTable = $('#tableid').dataTable({
        "data": data,
        "columns": columns,
        "createdRow": function (row, data, index) {
            row.setAttribute('data-userid', data.UserID);
        },
        "searchable": true,
        "bProcessing": true,
        "bPaginate": true,
        "pagingType": "full_numbers"
    });

    $("#tableid").removeClass("dataTable");
    $('#tableid thead th:eq(1)').addClass('text-center');
    $('#tableid thead th:eq(2)').addClass('text-center');

}
