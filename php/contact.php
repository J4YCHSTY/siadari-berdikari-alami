<?php
require '../vendor/autoload.php';  // Sesuaikan dengan lokasi file autoload.php relatif ke contact.php
header("Access-Control-Allow-Origin: *");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('Invalid request');
}



// Sanitize input
$name     = htmlspecialchars(trim($_POST['name']));
$email    = htmlspecialchars(trim($_POST['email']));
$number   = htmlspecialchars(trim($_POST['number']));
$comments = htmlspecialchars(trim($_POST['comments']));

// Validate input
if (empty($name)) {
    exit('<div class="error_message">You must enter your name.</div>');
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit('<div class="error_message">Please enter a valid email address.</div>');
}
if (empty($comments)) {
    exit('<div class="error_message">Please enter your message.</div>');
}

$mail = new PHPMailer(true);

try {
    // SMTP settings
    $mail->isSMTP();                                        // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                   // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                               // Enable SMTP authentication
    $mail->Username   = 'smtpserver830@gmail.com';             // SMTP username
    $mail->Password   = '${{secret.APP_PASSWORD}}';              // SMTP password (use an app password if using Gmail)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;     // Enable TLS encryption; PHPMailer::ENCRYPTION_SMTPS for SSL
    $mail->Port       = 587;                                // TCP port to connect to (587 for TLS)

    // Email content
    $mail->setFrom($email, $name, $number);
    $mail->addAddress($email);       // Add recipient address

    $mail->isHTML(true);                                    // Set email format to HTML
    $mail->Subject = 'Contact Form Submission from ' . $name;
    $mail->Body    = "You have been contacted by <b>$name</b>.<br><br>" . 
                     "Message: <br>" . nl2br($comments) . "<br><br>" . 
                     "You can reply to this email at $email or this number $number.";
    $mail->AltBody = "You have been contacted by $name. Message: $comments. Reply to $email.";

    $mail->send();
    echo "<div class='success_message'>Thank you, $name. Your message has been sent.</div>";
} catch (Exception $e) {
    echo "<div class='error_message'>Message could not be sent. Mailer Error: {$mail->ErrorInfo}</div>";
    error_log($mail->ErrorInfo);
}

?>
