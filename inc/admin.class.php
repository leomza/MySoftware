<?php
include('db.class.php');

class admin
{
    private $title = null;
    private $body = null;
    private $username = null;
    private $filename = null;

    public function __construct($title = null, $body = null, $username = null, $filename = null)
    {
        $this->title = $title;
        $this->body = $body;
        $this->username = $username;
        $this->filename = $filename;
    }

    public static function insertPost($title, $body, $username, $filename)
    {
        //Connect to the DB
        $dbConnection = db::connect();

        //Check connection
        if ($dbConnection->connect_error) {
            die("Connection failed: " . $dbConnection->connect_error);
        }

        //Insert the Post to the Database
        //Prepare and bind
        $stmt = $dbConnection->prepare("INSERT INTO posts (title, body, username, filename) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $title, $body, $username, $filename);
        $stmt->execute();

        echo $stmt->insert_id;

        $stmt->close();
    }
}
