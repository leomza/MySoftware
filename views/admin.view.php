<?php
include('../autoload.php');
?>

<!doctype html>

<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Welcome</title>
    <meta name="description" content="PHP sandbox">
    <meta name="author" content="MMD">
    <link rel="icon" href="../assets/defaultPost.png" type="image/x-icon">

    <link rel="stylesheet" href="../styles.css?v=1.0">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://kit.fontawesome.com/b4c987fb79.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="topnav" id="myTopnav">
        <a href="../index.php">Go to Main Page</a>
    </div>

    <form class="form_posts" onsubmit="handleSubmitPost(event)">
        <h3 class="form_posts_subtitle">Time to create an amazing POST</h3>

        <label for="title">Enter a title</label>
        <input type="text" id="title" name="title" required>

        <label for="body">Enter a body</label>
        <textarea id="body" name="body" cols="30" rows="10" required></textarea>

        <label for="image">Enter an image</label>
        <input type="file" id="image" name="image" onchange="readURL(this);">

        <div class="form_posts_image">
            <img id="previewImage" src="../assets/defaultPost.png">
        </div>

        <input class="form_posts_submit" type="submit" value="Post">
    </form>

    <script src="../scripts.js"></script>
</body>

</html>