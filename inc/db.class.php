<?php
class db
{
    public static function connect()
    {
        static $mysqli = null;

        if(!$mysqli) {
            $mysqli = mysqli_connect("localhost", "root", "", "blog");
        }

        return $mysqli;
    }
}
