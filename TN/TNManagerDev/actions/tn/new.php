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
	
	$sql_kunde_id;
	if (isset ( $_POST ['kunde_id'] )) {
		$sql_kunde_id = $_POST ['kunde_id'];
	}
	
	$sql_date;
	if (isset ( $_POST ['date'] )) {
		$sql_date = DateTime::createFromFormat('Y-m-d',  $_POST ['date']);
	}
	
	//gets an existing of current date or creates a new one
	$ergebnis  = sql_getTN($sql_kunde_id,$sql_date);
	
	$tn = new TN();
	$tn->id = $ergebnis["id"];
	$tn->date = $ergebnis["date"];
	$tn->customer = $ergebnis["kunde_id"];
	$tn->text = $ergebnis["text"];
	
	echo json_encode($tn);
} 
?>
