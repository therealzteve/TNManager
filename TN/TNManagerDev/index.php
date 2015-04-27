<?php
include_once $_SERVER ['DOCUMENT_ROOT'] . "/config.php";

$login = new Login ();
if ($login->isUserLoggedIn() == true) {
    include_once $INCLUDE_PATH."/TN_Manager.php";
} else {
    include_once $INCLUDE_PATH."/frameworks/login/views/not_logged_in.php";
}
?>