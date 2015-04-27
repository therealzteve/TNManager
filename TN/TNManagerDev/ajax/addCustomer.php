<?php

//require_once ("/frameworks/login/index.php");
// include the configs / constants for the database connection
require_once ("../frameworks/login/config/db.php");

// load the login class
require_once ("../frameworks/login/classes/Login.php");


require_once '../frameworks/medoo.min.php';

//Functions for insert/update tn table
require_once '../sql/sql_kunde.php';

// create a login object. when this object is created, it will do all login/logout stuff automatically
// so this single line handles the entire login process. in consequence, you can simply ...
$login = new Login ();

// ... ask if we are logged in here:
if ($login->isUserLoggedIn () != true) {

} else {

	$sql_kunde;
	
	if (isset ( $_POST ['kunde_name'] )) {
		$sql_kunde = $_POST ['kunde_name'];
	}
	
	//run sql scripts
	$database = new medoo('tn');
	
		
	$id = $database->insert("kunden", [
			"name" => $sql_kunde
	]);

	echo $id;

}
?>
