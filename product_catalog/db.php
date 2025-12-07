<?php
$servername = "localhost";
$username = "root";
$dbname = "Customers";

// Try password from environment first, then common local defaults.
$candidates = [];
$envPassword = getenv('DB_PASSWORD');
if ($envPassword !== false) $candidates[] = $envPassword;
$candidates = array_merge($candidates, array('root', '', 'password'));

$conn = null;
$lastError = null;
foreach ($candidates as $password) {
    $conn = @new mysqli($servername, $username, $password, $dbname);
    if (!$conn->connect_error) {
        break;
    }
    $lastError = $conn->connect_error;
}

if ($conn === null || $conn->connect_error) {
    die("Connection failed (tried multiple passwords). Last error: " . $lastError);
}
?>

