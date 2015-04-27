<?php

$url = $_SERVER['REQUEST_URI']; //returns the current URL
$parts = explode('/',$url); //Wether TNManagerDEV or TNManager

$INCLUDE_PATH = $_SERVER['DOCUMENT_ROOT'].'/'.$parts[1];
$CONTEXT_PATH = '/'.$parts[1];
require_once $INCLUDE_PATH.'/imports.php';
?>