<?php
include('db.class.php');

class login
{
    private $username = null;
    private $password = null;

    public function __construct($username = null, $password = null)
    {
        $this->username = $username;
        $this->password = $password;
    }

    public static function checkLogin($username, $password)
    {

        //Connect to the DB
        $dbConnection = db::connect();
        $data         = [];

        //Check Connection
        if ($dbConnection->connect_error) {
            die("Connection failed: " . $dbConnection->connect_error);
        }

        //Search the user and see if is OK
        $cleanUsername = mysqli_real_escape_string($dbConnection, $username);
        $cleanPassword = mysqli_real_escape_string($dbConnection, $password);
        $sql = "SELECT * FROM users WHERE username='$cleanUsername' AND password='$cleanPassword'";
        $result = $dbConnection->query($sql);

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        return $data;
    }

    public static function setCookie($username)
    {
        setcookie("User_Logged", $username, time() + (86400 * 30), "/"); // 86400 = 1 day
    }
}
