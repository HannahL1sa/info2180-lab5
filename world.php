<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';


if(isset($_GET['country'])){
  $country = filter_input(INPUT_GET,"country",FILTER_SANITIZE_STRING);
}

$context = '';
if(isset($_GET['context'])){
  $context = $_GET['context'];
}

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
//First query
$stmt = $conn->query("SELECT * FROM countries WHERE name LIKE '%$country%'");
$results= $stmt->fetchAll(PDO::FETCH_ASSOC);

//Second Query
$statement = $conn->query("SELECT cities.name, cities.population, cities.district  FROM cities JOIN countries ON cities.country_code=countries.code WHERE countries.name LIKE '%$country%'");
$cities = $statement->fetchAll(PDO::FETCH_ASSOC);
?>

<?php if($context === 'cities'):?>
  <table>
    <tr>
      <th>Name</th>
      <th>District</th>
      <th>Population</th>
</tr>
<?php foreach ($cities as $city):?>
  <tr>
    <td><?=$city['name'];?></td>
    <td><?=$city['district'];?></td>
    <td><?=$city['population'];?></td>
</tr>
<?php endforeach;?>
</table>
<?php else:?>
  <table>
    <tr>
      <th>Name</th>
      <th>Continent</th>
      <th>Independence</th>
      <th>Head of State</th>
    </tr>
    <?php foreach ($results as $row): ?>
      <tr>
        <td><?= $row['name'];?></td> 
        <td><?= $row['continent'];?></td> 
        <td><?= $row['independence_year'];?></td>
        <td><?= $row['head_of_state'];?></td> 
      </tr>
      <?php endforeach; ?>
</table>
<?php endif;?>



