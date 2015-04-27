<?php 
require_once ($_SERVER ['DOCUMENT_ROOT'] . "/config.php");
?>

function addNewCustomer(name,callback) {
	showLoadingScreen();
	$.ajax({
		type : "POST",
		url : "<?=$CONTEXT_PATH?>/actions/customer/insert.php",
		data : {
			kunde_name : name
		},
		success : function(data) {
			hideLoadingScreen();
			callback($.parseJSON(data));
		}
	});
};

function synchronizeTN(tnId, date, text, callback) {
	showLoadingScreen();
	$.ajax({
		type : "POST",
		url : "<?php echo $CONTEXT_PATH; ?>/actions/tn/update.php",
		data : {
			"tn_id" : tnId,
			"date" : moment(date).format('YYYY-MM-DD'),
			"text" : text,
		},
		success : function(data) {
			hideLoadingScreen();
			callback(data);
		}
	});
};


function deleteTn(tnId,callback) {
	showLoadingScreen();
	$.ajax({
		type : "POST",
		url : "<?php echo $CONTEXT_PATH; ?>/actions/tn/delete.php",
		data : {
			"tn_id" : tnId
		},
		success : function(data) {
			hideLoadingScreen();
			callback(data);
		}
	});
};


function addAjaxTN(customer, date) {
	showLoadingScreen();
	var tn;
	$.ajax({
		type : "POST",
		async : false,
		url : "<?php echo $CONTEXT_PATH; ?>/actions/tn/new.php",
		data : {
			'kunde_id' : customer.getId(),
			'date' : moment(date).format('YYYY-MM-DD'),
			'text' : "test",
		},
		success : function(data) {
			hideLoadingScreen();
			tn = $.parseJSON(data);

		}
	});
	return tn;
};

function addAjaxTime(tn_id,start) {
	showLoadingScreen();
	var id;
	$.ajax({
		type : "POST",
		async : false,
		url : "<?php echo $CONTEXT_PATH; ?>/actions/time/insert.php",
		data : {
			'tn_id' : tn_id,
			'start' : moment(start).format('YYYY-MM-DD HH:mm:ss'),
		},
		success : function(data) {
			hideLoadingScreen();
			id = $.parseJSON(data);

		}
	});
	return id;
};

function synchronizeTime(id, tn_id,start,end,active, callback){
	showLoadingScreen();
	var activeInt = 0;
	if(active){
		activeInt = 1;
	}
	$.ajax({
		type : "POST",
		url : "<?php echo $CONTEXT_PATH; ?>/actions/time/update.php",
		data : {
			"time_id" : id,
			"tn_id" : tn_id,
			"start" : moment(start).format('YYYY-MM-DD HH:mm:ss'),
			"stop" : moment(end).format('YYYY-MM-DD HH:mm:ss'),
			"active" : activeInt,
		},
		success : function(data) {
			hideLoadingScreen();
			callback(data);
		}
	});
};

function showLoadingScreen(){
	var img = $("<img id='ajaxLoadGif' src='<?php echo $CONTEXT_PATH; ?>/images/712.GIF' />");
	$("body").append(img);
};

function hideLoadingScreen(){
	$("#lastSync").html(moment().format("HH:mm:ss"));
	$("#ajaxLoadGif").remove();
};