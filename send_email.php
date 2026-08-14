<?php

// Check if form data was actually submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Capture and define all form variables
    $to = "muqadescodes212@gmail.com";
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone_number = htmlspecialchars($_POST['phone_number']);
    $user_subject = htmlspecialchars($_POST['subject']); 
    $user_message = htmlspecialchars($_POST['message']);
    
    // Set the email subject: Use the user's input subject
    $email_subject = "Portfolio Message: " . $user_subject;

    // 2. DEFINE THE EMAIL BODY (The missing step!)
    $body = "
    <html>
    <head>
        <style>body { font-family: Arial, sans-serif; }</style>
    </head>
    <body>
        <h2>New Message from your Portfolio Contact Form</h2>
        <hr>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone_number}</p>
        <p><strong>Subject:</strong> {$user_subject}</p>
        <hr>
        <h3>Message Details:</h3>
        <p>" . nl2br($user_message) . "</p> 
    </body>
    </html>
    ";

    // 3. Headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: goodjm@muqadescodes.com\r\n"; 
    $headers .= "Reply-To: {$name} <{$email}>\r\n"; // Allows you to hit 'Reply' directly

    // 4. Try sending email and redirect
    // Use the defined $body and $email_subject variables
    if (mail($to, $email_subject, $body, $headers)) {
        header("Location: index.php?status=success");
        exit;
    } else {
        header("Location: index.php?status=error");
        exit;
    }
} else {
    // Redirect if accessed directly
    header("Location: index.php");
    exit;
}
?>