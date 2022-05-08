<?php
include('db.class.php');

class data
{
    public static function getAllPosts()
    {
        //Connect to the DB
        $dbConnection = db::connect();
        $data         = [];

        // Check connection
        if ($dbConnection->connect_error) {
            die("Connection failed: " . $dbConnection->connect_error);
        }

        //Get all the Posts from the Database
        $sql = "SELECT * FROM posts";
        $result = $dbConnection->query($sql);
        $numRows = $result->num_rows;
        if ($numRows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    public static function deletePost($postId)
    {
        //Connect to the DB
        $dbConnection = db::connect();

        // Check connection
        if ($dbConnection->connect_error) {
            die("Connection failed: " . $dbConnection->connect_error);
        }

        //Delete the post from the Database
        $sql = "DELETE FROM posts WHERE id='$postId'";
        $result = $dbConnection->query($sql);
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        };
        return $data;
    }

    public static function editPost($postId, $title, $body, $filename)
    {
        //Connect to the DB
        $dbConnection = db::connect();

        // Check connection
        if ($dbConnection->connect_error) {
            die("Connection failed: " . $dbConnection->connect_error);
        }

        //Edit the post in the Database
        $sql = "UPDATE posts SET title='$title', body='$body', filename='$filename' WHERE id='$postId'";
        $result = $dbConnection->query($sql);
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        };
        return $data;
    }
}
