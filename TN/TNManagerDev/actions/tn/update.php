<?php
//Loads general libs and basic configurations
require_once ($_SERVER['DOCUMENT_ROOT'] ."/config.php");

//Load customer ressources
require_once $INCLUDE_PATH.'/sql/tn.php';
require_once $INCLUDE_PATH.'/models/tn.php';

//Create login
$login = new Login ();

// ... ask if we are logged in here:
if ($login->isUserLoggedIn () == true) {
	
	$sql_tn_id;
	if (isset ( $_POST ['tn_id'] )) {
		$sql_tn_id = $_POST ['tn_id'];
	}
	
	$sql_text;
	if (isset ( $_POST ['text'] )) {
		$sql_text = $_POST ['text'];
	}
	
	$sql_date;
	if (isset ( $_POST ['date'] )) {
		$sql_date = DateTime::createFromFormat('Y-m-d',  $_POST ['date']);
	}
	
	//gets an existing of current date or creates a new one
	sql_tn_Update($sql_tn_id,$sql_date,$sql_text);
	
	echo '{"success":"true"}';
} 
?>