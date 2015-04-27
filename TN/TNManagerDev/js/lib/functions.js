String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

function dateDiff(date1, date2) {
    var datediff = date1.diff(date2,'hours',true);
//    	date1.getTime() - date2.getTime(); //store the getTime diff - or +
//    datediff = (datediff / (1000*60*60));
    datediff = Math.round(datediff * 100) / 100 ;
    return datediff;  //Convert values to -/+ days and return value      
};

function lZ(number){
	return (number < 10 ? '0' + number : number);
	
	};
