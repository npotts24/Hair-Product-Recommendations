<?php
// Login: use central DB connection and avoid variable name collisions
require_once __DIR__ . '/../product_catalog/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email'] ?? '');
    $user_password = trim($_POST['password'] ?? '');

    if ($email === '' || $user_password === '') {
        die('Email and password are required.');
    }

    $sql = "SELECT id, password FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die('Prepare failed: ' . $conn->error);
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hashed_password);
        $stmt->fetch();

        if (password_verify($user_password, $hashed_password)) {
            echo "Login successful!";
        } else {
            echo "Invalid credentials.";
        }
    } else {
        echo "No account found with that email.";
    }
    $stmt->close();
}

$conn->close();
?>
