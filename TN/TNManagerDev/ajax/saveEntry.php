<?php
require_once ($_SERVER['DOCUMENT_ROOT'] ."/config.php");


// create a login object. when this object is created, it will do all login/logout stuff automatically
// so this single line handles the entire login process. in consequence, you can simply ...
$login = new Login ();

// ... ask if we are logged in here:
if ($login->isUserLoggedIn () != true) {
} else {
	
	// define variables
	// $sql_user_id = 0;
	// $sql_tn_id = 0;
	// $sql_kunde_id = 0;
	// $sql_start = "";
	// $sql_stop = "";
	// $sql_time = "";
	// $sql_text = '';
	// $sql_kulanz = false;
	
	$sql_user_id = null;
	$sql_tn_id = null;
	$sql_time_id = null;
	$sql_kunde_id = null;
	$sql_start = null;
	$sql_stop = null;
	$sql_time = null;
	$sql_text = null;
	$sql_kulanz = null;
	$sql_date = null;
	$sql_timeActive = null;
	$sql_method = 'insert';
	
	// Check post variables
	
	if (isset ( $_POST ['user_id'] )) {
		$sql_user_id = $_POST ['user_id'];
	}
	
	if (isset ( $_POST ['tn_id'] )) {
		$sql_tn_id = $_POST ['tn_id'];
	}
	
	if (isset ( $_POST ['kunde_id'] )) {
		$sql_kunde_id = $_POST ['kunde_id'];
	}
	
	if (isset ( $_POST ['start'] )) {
		//2014-04-08T16:27:41+02:00
		$sql_start = DateTime::createFromFormat('Y-m-d H:i:s', $_POST ['start']);
		//$sql_start = strtotime($_POST ['start']);
	}
	
	if (isset ( $_POST ['stop'] )) {
		$sql_stop = DateTime::createFromFormat('Y-m-d H:i:s',  $_POST ['stop']);
		//$sql_stop = strtotime($_POST ['stop']);
	}
	
	if (isset ( $_POST ['time'] )) {
		$sql_time = $_POST ['time'];
	}
	
	if (isset ( $_POST ['time_id'] )) {
		$sql_time_id = $_POST ['time_id'];
		$sql_method = 'update';
	}
	
	if (isset ( $_POST ['text'] )) {
		$sql_text = $_POST ['text'];
	}
	
	if (isset ( $_POST ['kulanz'] )) {
		$sql_kulanz = $_POST ['kulanz'];
	}
	
	if (isset ( $_POST ['date'] )) {
		$sql_date = DateTime::createFromFormat('Y-m-d',  $_POST ['date']);
	}
	
	if (isset ( $_POST ['active'] )) {
		$sql_timeActive = $_POST ['active'];
	}
	
	if (isset ( $_POST ['method'] )) {
		$sql_method = $_POST ['method'];
	}
	
	// run sql scripts
	$ergebnis;
	//run sql scripts
	if ($sql_method == 'insertTN') {
		$ergebnis = json_encode(getTN($sql_kunde_id,$sql_date));
	}
	elseif($sql_method == 'insertTime'){
		$ergebnis = sql_time_Insert($sql_tn_id,$sql_start);
	}
	elseif ($sql_method=='updateTN'){
		$ergebnis = sql_tn_Update($sql_tn_id,$sql_date,$sql_text);
	}
	else{
		$ergebnis = sql_time_Update($sql_time_id,$sql_start,$sql_stop,$sql_timeActive);
	}
	echo $ergebnis;
	//echo"**start*****". $sql_start."***stop****".$sql_stop."***time****".$sql_time."****kunde***".$sql_kunde_id."*******".$database->last_query();
	// // Initialize
	// $database = new medoo('tn');
	// $datas = $database->select("tns", "user_name", [
	// "user_id" => $_SESSION['user_id']
	// ]);
	
	// foreach($datas as $data)
	// {
	// echo "user_id:" . $data["user_id"];
	// }
}
?>
