<?php // Initialize variables to null.
$name =""; // Sender Name
$email =""; // Sender's email ID
$service =test_input($_POST["service"]); // Service
$nameError ="";
$emailError ="";
$successMessage =""; // On submittingform below function will execute.
if(isset($_POST['submit'])) { // Checking null values in message.
if (empty($_POST["name"])){
$nameError = "Name is required";
}
else
{
$name = test_input($_POST["name"]); // check name only contains letters and whitespace
if (!preg_match("/^[a-zA-Z ]*$/",$name))
{
$nameError = "Only letters and white space allowed";
}
} // Checking null values inthe message.
if (empty($_POST["email"]))
{
$emailError = "Email is required";
}
else
 {
$email = test_input($_POST["email"]);
}  // Checking null values inthe message.
if( !($name=='') && !($email=='') )
{ // Checking valid email.
if (preg_match("/([w-]+@[w-]+.[w-]+)/",$email))
{
$header= $name."<". $email .">";
$headers = "Karan Fadnavis Website contact form"; /* Let's prepare the message for the e-mail */
$msg = "Hello! $name Thank you...! For Contacting Us.
Name: $name
E-mail: $email
This is a Contact Confirmation mail. I will contact You as soon as possible.";
$msg1 = " $name used the contact form.
Name: $name
E-mail: $email
Service Interested in: $service"; 

/* Send the message using mail() function */
if(mail($email, $headers, $msg ) && mail("karanf@gmail.com", $header, $msg1 ))
{
$successMessage = "Your messsage was sent successfully.";
}
}
else
{ $emailError = "Invalid Email";
 }
 }
} // Function for filtering input values.

function test_input($data)
{
$data = trim($data);
$data =stripslashes($data);
$data =htmlspecialchars($data);
return $data;
}
?>