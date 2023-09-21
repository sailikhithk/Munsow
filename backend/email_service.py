import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

def send_emailsend_email(receiver_email, bcc_email, subject, body_template_path):
    
    sender_email = "your_email@gmail.com"
    smtp_server = "smtp.gmail.com"  # Replace with your SMTP server address
    smtp_port = 587  # Port for TLS
    smtp_username = "your_email@gmail.com"
    smtp_password = "your_email_password"


    # Read the email body template from the file
    with open(body_template_path, "r") as file:
        message = file.read()

    # Create an instance of MIMEMultipart
    msg = MIMEMultipart()
    msg["From"] = sender_email  # i will add
    msg["To"] = receiver_email
    msg["Bcc"] = bcc_email
    msg["Subject"] = subject

    # Attach the message (email body)
    msg.attach(MIMEText(message, "plain"))

    # SMTP server and login credentials
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Enable TLS encryption
        server.login(smtp_username, smtp_password)
        text = msg.as_string()
        server.sendmail(sender_email, [receiver_email, bcc_email], text) # i will add
        server.quit()
        print("Email sent successfully")
    except Exception as e:
        print("Error:", str(e))