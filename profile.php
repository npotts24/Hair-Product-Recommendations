<?php
session_start();
include('db_connect.php');

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];

$query = $conn->prepare("SELECT username, email, created_at FROM users WHERE id = ?");
$query->bind_param("i", $user_id);
$query->execute();
$result = $query->get_result();
$user = $result->fetch_assoc();
?>

<h1>Your Profile</h1>
<p><strong>Username:</strong> <?= $user['username'] ?></p>
<p><strong>Email:</strong> <?= $user['email'] ?></p>
<p><strong>Joined:</strong> <?= $user['created_at'] ?></p>

<a href="logout.php">Log Out</a>
