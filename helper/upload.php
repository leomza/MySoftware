<?php

if (isset($_FILES['image']['name'])) {
   var_dump($_FILES['image']);
   // file name
   $filename = $_FILES['image']['name'];

   // Location
   $location = '../post_images/' . $_POST['postId'];


   // Valid extensions
   $valid_ext = array("pdf", "doc", "docx", "jpg", "png", "jpeg");



   //Create subfolder if not exist
   mkdir('../post_images/' . $_POST['postId']);

   $target = '../post_images/' . $_POST['postId'] . "/" . $filename;

   // Upload file
   move_uploaded_file($_FILES['image']['tmp_name'], $target);
   exit;
}

if (isset($_FILES['imageEdit']['name'])) {
   var_dump($_FILES['imageEdit']);
   // file name
   $filename = $_FILES['imageEdit']['name'];

   // Location
   $location = '../post_images/' . $_POST['postId'];


   // Valid extensions
   $valid_ext = array("pdf", "doc", "docx", "jpg", "png", "jpeg");



   //Create subfolder if not exist
   mkdir('../post_images/' . $_POST['postId']);

   $target = '../post_images/' . $_POST['postId'] . "/" . $filename;

   // Upload file
   move_uploaded_file($_FILES['imageEdit']['tmp_name'], $target);

   exit;
}