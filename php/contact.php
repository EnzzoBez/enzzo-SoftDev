<?php
// Configurações
$destinatario = "enzzodbez@gmail.com"; // <-- Coloque seu e-mail real aqui

// Pega os dados enviados via POST
$nome = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$assunto = $_POST['subject'] ?? '';
$mensagem = $_POST['message'] ?? '';

// Monta o conteúdo do e-mail
$corpo = "Nome: $nome\n";
$corpo .= "E-mail: $email\n";
$corpo .= "Assunto: $assunto\n";
$corpo .= "Mensagem:\n$mensagem\n";

// Cabeçalhos
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

// Envia o e-mail
if (mail($destinatario, $assunto, $corpo, $headers)) {
    echo "ok";
} else {
    http_response_code(500);
    echo "Erro ao enviar mensagem.";
}
?>
