<?php
//Loads general libs and basic configurations
include_once $_SERVER['DOCUMENT_ROOT'] ."/config.php";

//Load customer ressources
include_once $INCLUDE_PATH.'/sql/customer.php';
include_once $INCLUDE_PATH.'/models/customer.php';

//Create login
$login = new Login ();

// ... ask if we are logged in here:
if ($login->isUserLoggedIn () == true) {
	
	$sql_kunde;
	if (isset ( $_POST ['kunde_name'] )) {
		$sql_kunde = $_POST ['kunde_name'];
	}
	$id = sql_addCustomer($sql_kunde);
	
	$customer = new Customer();
	$customer->id = $id;
	$customer->name = $sql_kunde;
	
	echo json_encode($customer);
} 
?>
