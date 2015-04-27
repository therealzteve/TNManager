<?php
function sql_time_Insert($tn_id, $time) {
	global $database;
	
	// insert tn in times list
	$time_id = $database->insert ( "times", [ 
			"tn_id" => $tn_id,
			"start" => $time->format("Y-m-d H:i:s"),
			"end" =>  $time->format("Y-m-d H:i:s") 
	] );
	return $time_id;
};

function sql_time_Update($time_id, $start, $end, $active) {
	global $database;
	//echo 'stop: '.$end;
	$database->update ( "times", [ 
			"start" => $start->format("Y-m-d H:i:s"),
			"end" => $end->format("Y-m-d H:i:s"),
			"active"=>$active  
	], [ 
			"id" => $time_id 
	] );
};



?>