<?php


/**
 * Updates a TN
 * @param unknown $tn_id
 * @param unknown $date
 * @param unknown $text
 */
function sql_tn_Update($tn_id, $date, $text) {
	global $database;
	//echo 'stop: '.$end;
	$database->update ( "tns", [
			"date" => $date->format("Y-m-d"),
			"text" => $text
			], [
			"id" => $tn_id
			] );
};


/**
 * Deletes a TN and the corresponding times
 * @param unknown $tn_id
 */
function sql_tn_Delete($tn_id) {
	global $database;
	
	$database->delete("times",["tn_id" =>$tn_id]);
	
	$database->delete("tns",["id" =>$tn_id]);
};


/**
 *  Looks after a TN for a specific date, if not found, the TN is created and the id returned
 * 
 * @param integer $kunde_id
 * @param date $date
 * @return id of TN
 */
function sql_getTN($kunde_id,$date){
	global $database;
	
	 $result = $database->select ( "tns","*",["AND" => [
			"user_id" => $_SESSION ['user_id'],
			"kunde_id" => $kunde_id,
	 		"date" => $date->format("Y-m-d")]]); 
	if (count($result) == 0) {
		$result =  $database->insert ( "tns", [ 
				"user_id" => $_SESSION ['user_id'],
				"kunde_id" => $kunde_id,
				"date" =>$date->format("Y-m-d") ]);
		
		$res = array("id" => $result, "date" => $date, "kunde_id" => $kunde_id, "text" => "");
		return $res;
	}else{
		return $result[0];
	}

};


function sql_getTns() {
	global $database;
	
	// Initialize
	$uid = $_SESSION ['user_id'];
	
// 	$tns = $database->select ( "times", 	// table
// 	[ 
// 			"[><]tns" => [ 
// 					"tn_id" => "id" 
// 			],
// 			"[><]kunden" => [ 
// 					"kunde_id" => "id" 
// 			] 
// 	], 	// join
// 	"*", 	// selected fields
// 	[ 
// 			"user_id" => $uid 
// 	] ); // where statement
	$tns = $database->query (
			"SELECT date , tns.id as tn_id , sum(TIME_TO_SEC(TIMEDIFF(times.end,times.start))) as time, kunden.name as name, kunden.id as cust_id, text FROM times
			 INNER JOIN tns ON times.tn_id = tns.id
			 INNER JOIN kunden ON tns.kunde_id = kunden.id WHERE user_id = '".$uid."' GROUP BY tns.id" );
	return $tns;
};


function sql_getActiveTns() {
	global $database;

	// Initialize
	$uid = $_SESSION ['user_id'];


	$tns = $database->query (
			"SELECT date , tns.id as tn_id , TIME_TO_SEC(TIMEDIFF(times.end,times.start)) as time, times.start as start, times.end as end, kunden.name as name, text, times.id as id FROM times
			 INNER JOIN tns ON times.tn_id = tns.id
			 INNER JOIN kunden ON tns.kunde_id = kunden.id WHERE user_id = '".$uid."' AND times.active = 1" );
	return $tns;
};


class EmptyTn {
	public $id = "";	
}


?>