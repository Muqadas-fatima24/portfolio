<?php
// --- Configuration ---
$receiving_email_address = 'muqadescodes212@gmail.com'; 
$sender_from_address = 'no-reply@muqadescodes.com'; 
$email_subject = 'New Contact Message for Next Projects';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Sanitize and Validate Inputs
    // *** FIX: Replaced FILTER_SANITIZE_STRING with FILTER_SANITIZE_SPECIAL_CHARS ***
    $name         = filter_var($_POST['name'], FILTER_SANITIZE_SPECIAL_CHARS);
    $email        = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone_number = filter_var($_POST['phone_number'], FILTER_SANITIZE_SPECIAL_CHARS);
    $subject_line = filter_var($_POST['subject'], FILTER_SANITIZE_SPECIAL_CHARS);
    $message_body = filter_var($_POST['message'], FILTER_SANITIZE_SPECIAL_CHARS);

    // Basic server-side validation
    if (empty($name) || empty($email) || empty($message_body) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Handle validation failure
        header('Location: ' . $_SERVER['HTTP_REFERER'] . '?success=0&error=validation_fail#contact');
        exit;
    }

    // 2. Construct the Email Content
    $full_subject = $email_subject . " - " . $subject_line;
    
    $message = "<html><head><title>New Contact Form Submission</title></head><body>
                <h2>Contact Details</h2>
                <strong>Full Name:</strong> {$name}<br/>
                <strong>Email Address:</strong> {$email}<br/>
                <strong>Phone Number:</strong> {$phone_number}<br/>
                <strong>Subject:</strong> {$subject_line}<br/>
                <hr>
                <h2>Message:</h2>
                <p>{$message_body}</p>
                </body></html>";

    // 3. Set the Headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    $headers .= "From: {$name} <{$sender_from_address}>\r\n"; 
    $headers .= "Reply-To: {$email}\r\n"; 

    // 4. Send the Email
    if (mail($receiving_email_address, $full_subject, $message, $headers)) {
        // Email sent successfully
        header('Location: ' . $_SERVER['HTTP_REFERER'] . '?success=1#contact');
        exit;
    } else {
        // Email failed to send (server issue)
        header('Location: ' . $_SERVER['HTTP_REFERER'] . '?success=0&error=mail_fail#contact');
        exit;
    }

} else {
    // Direct access denied
    echo "Direct access to this script is denied.";
    exit;
} 
?>