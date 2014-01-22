var csv = '';
var nl = '\n';
var $table = $('table:not(".extPibTable")');
var statement_date = $('.extContentHighlightPib:eq(1) .extPibRow:eq(0) .hsbcTextRight').html();
var year = statement_date.substr(statement_date.length-4);

var statement_date_parts = statement_date.split(" ");
var statement_date_day = statement_date_parts[0];
var statement_date_month = statement_date_parts[1].replace('Jan', '01').replace('Feb', '02').replace('Mar', '03').replace('Apr', '04').replace('May', '05').replace('Jun', '06').replace('Jul', '07').replace('Aug', '08').replace('Sep', '09').replace('Oct', '10').replace('Nov', '11').replace('Dec', '12');
var statement_date_year = statement_date_parts[2];
var statement_date_chron = statement_date_year + '-' + statement_date_month + '-' + statement_date_day;

// build header
$('thead th', $table).each(function(){
	if($('a', $(this)).length) {
		csv = csv + '"' + $('strong', $(this)).html() + '",';
	} else {
		csv = csv + '"' + $(this).html() + '"';
	}
});

csv = csv + nl;

// get rest of data

// loop rows
$('tbody tr', $table).each(function(){
	
	// loop cells
	var cell_count = 0;
	$('td', $(this)).each(function(){
		
		if(cell_count==0) {
			// this is the date
			csv = csv + '"' + $('p', $(this)).html().trim() + ' ' + year + '",';
		} else if(cell_count==5) {
			// this is the balance
			
			var balance = $('p', $(this)).html().trim().replace('<b>', '').replace('</b>', '');
			if($('p', $(this).next()).html().trim()=='D') {
				balance = '-' + balance;
			}
			csv = csv + '"' + balance + '"';
			
		} else if(cell_count!=6) {
			
			if($('a', $(this)).length) {
				csv = csv + '"' + $('a', $(this)).html().trim() + '",';
			} else {
				
				if($('strong', $(this)).length) {
					csv = csv + '"' + $('strong', $(this)).html().trim().replace('<b>', '').replace('</b>', '') + '",';
				} else {
					csv = csv + '"' + $('p', $(this)).html().trim().replace('&nbsp;', '').replace('<b>', '').replace('</b>', '') + '",';
				}
				
			}
		}
		
		cell_count++;
	});
	
	csv = csv + nl;
	
});

var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

$('body').append('<a href="'+data+'" download="statement-'+(statement_date_chron.replace(' ', '-'))+'.csv" id="download-statement" style="display: none;">Download</a>');

$('#download-statement')[0].click();
