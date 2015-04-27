<?php
//Loads general libs and basic configurations
require_once ($_SERVER['DOCUMENT_ROOT'] ."/config.php");

//Load customer ressources
require_once $INCLUDE_PATH.'/sql/time.php';
require_once $INCLUDE_PATH.'/models/time.php';

//Create login
$login = new Login ();

// ... ask if we are logged in here:
if ($login->isUserLoggedIn () == true) {
	
	$sql_time_id;
	if (isset ( $_POST ['time_id'] )) {
		$sql_time_id = $_POST ['time_id'];
	}
	
	$sql_start;
	if (isset ( $_POST ['start'] )) {
		$sql_start = DateTime::createFromFormat('Y-m-d H:i:s', $_POST ['start']);
	}
	
	$sql_stop;
	if (isset ( $_POST ['stop'] )) {
		$sql_stop = DateTime::createFromFormat('Y-m-d H:i:s',  $_POST ['stop']);
	}
	
	$sql_timeActive;
	if (isset ( $_POST ['active'] )) {
		$sql_timeActive = $_POST ['active'];
	}
	
	$ergebnis = sql_time_Update($sql_time_id,$sql_start,$sql_stop,$sql_timeActive);
	
	
	
	echo '{"success":"true"}';
} 
?>
