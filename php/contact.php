<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['name'];
    $email = $_POST['email'];
    $assunto = $_POST['subject'];
    $mensagem = $_POST['message'];

    $to = "enzzodbez@gmail.com"; // Coloque aqui seu e-mail real
    $body = "Nome: $nome\nE-mail: $email\nAssunto: $assunto\nMensagem:\n$mensagem";
    $headers = "From: $email";

    if (mail($to, $assunto, $body, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem.";
    }
}
?>
