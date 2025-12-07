<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../product_catalog/db.php';
$data = json_decode(file_get_contents('php://input'), true);
$answers = $data['answers'] ?? null;
$email = isset($data['email']) && $data['email'] !== '' ? $data['email'] : null;
if (!$answers || !is_array($answers)) {
    echo json_encode(['success' => false, 'error' => 'Invalid answers']);
    exit;
}
$create = "CREATE TABLE IF NOT EXISTS quiz_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) DEFAULT NULL,
    answers JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
$conn->query($create);
$sql = "INSERT INTO quiz_responses (email, answers) VALUES (?, ? )";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'error' => $conn->error]);
    exit;
}
$answers_json = json_encode($answers);
$stmt->bind_param('ss', $email, $answers_json);
$ok = $stmt->execute();
if ($ok) {
    echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}
$stmt->close();
$conn->close();
?>