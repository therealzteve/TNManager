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
	
	$sql_tn_id;
	if (isset ( $_POST ['tn_id'] )) {
		$sql_tn_id = $_POST ['tn_id'];
	}
	
	$sql_start;
	if (isset ( $_POST ['start'] )) {
		$sql_start = DateTime::createFromFormat('Y-m-d H:i:s', $_POST ['start']);
	}
	
	$ergebnis = sql_time_Insert($sql_tn_id,$sql_start);
	
	$time = new Time();
	$time->id = $ergebnis;
	$time->tn_id = $sql_tn_id;
	$time->start = $sql_start;
	$time->stop = "";
	$time->active = "";
	
	echo json_encode($time);
} 
?>
