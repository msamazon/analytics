// Userlist data array for filling in info box
var uListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the  table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    
    
        // THE DATE OBJECT.
        var dt = new Date();

        // GET THE MONTH AND YEAR OF THE SELECTED DATE.
        var month = dt.getMonth(),
            year = dt.getFullYear();

        // GET THE FIRST AND LAST DATE OF THE MONTH.
        var FirstDay = formatDate(new Date(year, month, 1));
        var LastDay = formatDate(new Date(year, month + 1, 0));

    console.log('firstday:' + FirstDay)
    console.log('lastday:' + LastDay)

    // jQuery AJAX call for JSON
    $.post( '/cntMileageMonth',{dStartd:FirstDay,dEndd:LastDay}, function( data ) {
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            console.log('Dados de cntMileageMonth:' + JSON.stringify(data))
            // tableContent += '<tr>';
            // tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            // tableContent += '<td>' + this.email + '</td>';
            // tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            // tableContent += '</tr>';
            tableContent += data
        });

        // Inject the whole content string into our existing HTML table
        $('#SumCurMileage').html(tableContent);
    });
};

function pad(n) {
    return n < 10 ? "0"+n : n;
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
}