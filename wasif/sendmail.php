//
// <?php
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     if(
//         !empty($_POST['name'])
//         && !empty($_POST['email'])
//         && !empty($_POST['message'])
//     ){
//         $name = $_POST["name"];
//         $email = $_POST["email"];
//         $message = $_POST["message"];
//
//
//         $to = "waxif.1@gmail.com";
//         $subject = "New Contact Form Submission";
//         $body = "Name: {$name}\nEmail: {$email}\nMessage: {$message}";
//         $headers = "From: {$email}";
//
//
//         if (mail($to, $subject, $body, $headers)) {
//             echo "Message sent successfully!";
//         } else {
//             echo "Failed to send message.";
//         }
//     }
// }
// ?>