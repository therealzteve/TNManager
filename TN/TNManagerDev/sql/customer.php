<?php

	/**
	 * Adds a customer to the database
	 * 
	 * @param string $kunde
	 * @return string
	 */
	function sql_addCustomer($kunde){
		
		global $database;
		$id = $database->insert("kunden", [
				"name" => $kunde
		]);
		
		return $id;
		
	}
	
	/**
	 *  Get all customers from database
	 * 
	 * @return customer array
	 */
	function sql_getCustomers(){
		
		global $database;
		$kunden = $database->select ( "kunden", [
				"id",
				"name"
				],["ORDER"=> "name ASC"] );
		return $kunden;
	}

?>