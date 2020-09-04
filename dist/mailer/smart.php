<?php 
// echo '<pre>';
// print_r($_FILES);
// echo '</pre>';


$name = $_POST['name'];
$phone = $_POST['user_phone'];
$file = $_POST['file'];
$message = $_POST['message'];


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'kutuza57deteyling@yandex.ru';
$mail->Password = 'devkutuza57';                          // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
$mail->CharSet = 'utf-8';	
$mail->SMTPKeepAlive = true; 
$mail->setFrom('kutuza57deteyling@yandex.ru', 'Order from Website');   // От кого письмо 

//$mail->addAddress('andrew@ifreework.com','andrew@ifreework.com');     // Add a recipient
$mail->addAddress('gamidov@tut.by', 'gamidov@tut.by');

//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
for ($i=0; $i < count($_FILES['upload']['tmp_name']) ; $i++) {
    if (!empty($_FILES['upload']) ) { //&& $_FILES['file']['error'] == UPLOAD_ERR_OK
        $mail->addAttachment($_FILES['upload']['tmp_name'][$i],$_FILES['upload']['name'][$i]);
    }
}    

// if (!empty($_FILES['upload']) ) { //&& $_FILES['file']['error'] == UPLOAD_ERR_OK
//        $mail->addAttachment($_FILES['upload']['tmp_name'],$_FILES['upload']['name']);
// }


// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mesLetter    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	phone: ' . $phone . '<br>
	file: ' . $file . '<br>
	message: ' . $message . '';

$subjectLetter = 'тема';

$mail->msgHTML($mesLetter);
$mail->Subject = $subjectLetter;
//$mail->addAddress($email, $name);
//$mail->addAttachment($uploadfile, $filename);

		



if(!$mail->send()) {
    
     //echo "Mailer Error: " . $mail->ErrorInfo;
     //echo 'НЕ Отправлено!';
     return false;
} else {
    
    //echo 'Отправлено!';
    return true;
}

$mail->clearAddresses();
$mail->clearAttachments(); 

