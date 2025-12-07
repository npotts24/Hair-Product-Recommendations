<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../product_catalog/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = trim($_POST['firstname'] ?? '');
    $lastname = trim($_POST['lastname'] ?? '');
   
    $user_username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $raw_password = trim($_POST['password'] ?? '');

    if ($firstname === '' || $lastname === '' || $user_username === '' || $email === '' || $raw_password === '') {
        die('All fields are required.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Invalid email format.');
    }

    $passwordHash = password_hash($raw_password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die('Prepare failed: ' . $conn->error);
    }

  
    $stmt->bind_param("sssss", $firstname, $lastname, $user_username, $email, $passwordHash);

    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();
?>

