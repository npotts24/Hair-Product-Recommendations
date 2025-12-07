<!DOCTYPE html>
<html>
<head>
     <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hair Quiz</title>
        <link rel="stylesheet" href="/Hair-Product-Recommendations/SignUp_Login/style.css">
        <link rel="stylesheet" href="/Hair-Product-Recommendations/Hair_Quiz/quiz.css">
</head>
<body>
        <nav class="topnav" id="myTopnav">
            <ul class="nav-list">
                <li class="nav-item"><a href="../Dashboard_Home/home.html">Home</a></li>
                <li class="nav-item"><a href="quiz.php" class="active">Hair Quiz</a></li>
                <li class="nav-item"><a href="../product_catalog/index.php">Products</a></li>
                <li class="nav-item"><a href="../SignUp_Login/login.html">Login</a></li>
                <li class="nav-item"><a href="../SignUp_Login/signup.html">Sign Up</a></li>
            </ul>
        </nav>

        <div class="quiz-container">
        <h2 id="question"></h2>
        <div id="options"></div>

        <button id="submit" style="display:none;">Submit</button>

        <div id="result"></div>
    </div>

    
    <script src="quiz.js"></script>
</body>
</html>

