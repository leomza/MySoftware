<?php

spl_autoload_register('myAutoLoader');

function myAutoLoader($className)
{
  include_once "inc/$className.class.php";
}
