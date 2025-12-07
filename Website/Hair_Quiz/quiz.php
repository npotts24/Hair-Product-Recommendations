<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $hair_type = $_POST["hair_type"];
    $concern = $_POST["concern"];
    $goal = $_POST["goal"];


    echo "<h1>Your Hair Quiz Results</h1>";
    echo "<p><strong>Hair Type:</strong> $hair_type</p>";
    echo "<p><strong>Concern:</strong> $concern</p>";
    echo "<p><strong>Goal:</strong> $goal</p>";

   
?>
