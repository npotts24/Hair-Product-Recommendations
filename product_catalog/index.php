<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product Catalog</title>
    <link rel="stylesheet" href="/product_catalog/styles.css">
</head>
<body>
    <h1>Our Product Catalog</h1>
    <div class="product-container">
        <?php include 'products.php'; ?>
    </div>
</body>
</html>
