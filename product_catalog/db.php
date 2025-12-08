<?php
$servername = "localhost";
$username = "dev";
$dbname = "Customers";

// Try password from environment first, then common local defaults.
$candidates = [];
$envPassword = getenv('DB_PASSWORD');
if ($envPassword !== false) $candidates[] = $envPassword;
$candidates = array_merge($candidates, array(''));

$conn = null;
$lastError = null;
foreach ($candidates as $password) {
    try {
        $conn = new mysqli($servername, $username, $password, $dbname);
        if (!$conn->connect_error) {
            break;
        }
        $lastError = $conn->connect_error;
    } catch (mysqli_sql_exception $e) {
        $lastError = $e->getMessage();
        // try next password
        continue;
    }
}

if ($conn === null || $conn->connect_error) {
    die("Connection failed (tried multiple passwords). Last error: " . $lastError);
}
?>

