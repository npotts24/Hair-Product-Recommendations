<?php
$servername = "localhost/Website/product_catalog/index.php";
$username = "root";
$password = "root";
$dbname = "Customer";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

