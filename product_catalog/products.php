<?php
include 'Website/product_catalog/db.php';  // Including the database connection file

// Prepare the SQL query to select product details
$stmt = $conn->prepare("SELECT name, description, image_path FROM products");
$stmt->execute(); // Execute the query

// Bind the results to PHP variables
$stmt->bind_result($name, $description, $image_path);

$hasResults = false; // Flag to check if there are any results

// Loop through the fetched products and display them
while ($stmt->fetch()):
    $hasResults = true;  // Set the flag to true when a result is fetched
?>
    <!-- Display the product information -->
    <div class="product">
        <!-- Display the product image -->
        <img src="<?php echo htmlspecialchars($image_path); ?>" alt="<?php echo htmlspecialchars($name); ?>">

        <!-- Display the product name and description -->
        <div class="product-info">
            <h2><?php echo htmlspecialchars($name); ?></h2>
            <p><?php echo htmlspecialchars($description); ?></p>
        </div>
    </div>
<?php
endwhile;
// If no products were found, display a message
if (!$hasResults) {
    echo "<p>No products found.</p>";
}
// Close the prepared statement and the database connection
$stmt->close();
$conn->close();
?>
