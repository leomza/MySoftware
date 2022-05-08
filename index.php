<?php
include('autoload.php');
?>

<!doctype html>

<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>PHP Sandbox</title>
  <meta name="description" content="PHP sandbox">
  <meta name="author" content="MMD">
  <link rel="icon" href="assets/defaultPost.png" type="image/x-icon">

  <link rel="stylesheet" href="styles.css?v=1.0">
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
  <script src="https://kit.fontawesome.com/b4c987fb79.js" crossorigin="anonymous"></script>
</head>

<body>
  <div class="topnav" id="myTopnav">
    <button id="loginBtn">Login</button>
    <button id="logoutBtn" onclick="logOut()">Logout</button>
    <button id="createBtn" onclick="redirectToPost()">Create Post</button>
    <div class="topnav__welcome" id="welcomeTitle"></div>
  </div>

  <!-- The Modal Login -->
  <div id="myModal" class="modal">

    <!-- Modal content Login -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <form onsubmit="handleSubmit(event)">
        <h3 class="form_posts_subtitle">Login into your account</h3>

        <label for="username">Enter your username</label>
        <input type="text" id="username" name="username">

        <br>

        <label for="password">Enter your password</label>
        <span class="password__container">
          <input type="password" id="password" name="password">
          <i class="bi bi-eye-slash password__icon" id="togglePassword" onclick="togglePassword(event)"></i>
        </span>

        <input class="modal_submit" type="submit" value="Login">
      </form>
    </div>
  </div>

  <!-- The Modal Edit -->
  <div id="myModalEdit" class="modal">

    <!-- Modal content Edit -->
    <div class="modal-content">
      <span class="closeEdit">&times;</span>
      <div id="formEdit"> </div>
    </div>
  </div>

  <div id="root" class="post__wrapper"></div>

  </div>

  <script src="./scripts.js"></script>
  <script src="helper/modalScript.js"></script>
</body>

</html>