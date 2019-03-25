<?php

// connect to a database
$conn = mysqli_connect('localhost', 'hdgknsn', '', 'ajax_test', 3306);

$query = "SELECT * FROM users";

$result = mysqli_query($conn, $query);

// $users = mysqli_fetch_all($results, MYSQLI_ASSOC);

$users = array();

while ($row = $result->fetch_assoc()) {
  $users[] = $row;
}

echo json_encode($users);
	
	

