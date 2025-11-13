import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from pydantic import BaseModel, Field, EmailStr, ValidationError


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=2000)


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправляет сообщение из контактной формы на email
    Args: event - dict с httpMethod, body
          context - object с request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    contact_req = ContactRequest(**body_data)
    
    recipient_email = os.environ.get('RECIPIENT_EMAIL')
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    if not all([recipient_email, smtp_host, smtp_user, smtp_password]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'SMTP configuration missing'})
        }
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новое сообщение от {contact_req.name}'
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    msg['Reply-To'] = contact_req.email
    
    text_content = f'''
Новое сообщение с сайта!

От: {contact_req.name}
Email: {contact_req.email}

Сообщение:
{contact_req.message}
    '''
    
    html_content = f'''
<html>
  <body style="font-family: Arial, sans-serif; padding: 20px; background: #0a0a0a; color: #fff;">
    <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; padding: 30px; border-radius: 10px; border: 2px solid #06b6d4;">
      <h2 style="color: #06b6d4; margin-top: 0;">Новое сообщение с сайта!</h2>
      <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong style="color: #06b6d4;">От:</strong> {contact_req.name}</p>
        <p><strong style="color: #06b6d4;">Email:</strong> <a href="mailto:{contact_req.email}" style="color: #06b6d4;">{contact_req.email}</a></p>
      </div>
      <div style="background: #0a0a0a; padding: 20px; border-radius: 8px;">
        <p style="color: #06b6d4; font-weight: bold; margin-top: 0;">Сообщение:</p>
        <p style="line-height: 1.6;">{contact_req.message}</p>
      </div>
    </div>
  </body>
</html>
    '''
    
    msg.attach(MIMEText(text_content, 'plain'))
    msg.attach(MIMEText(html_content, 'html'))
    
    server = smtplib.SMTP(smtp_host, smtp_port)
    server.starttls()
    server.login(smtp_user, smtp_password)
    server.sendmail(smtp_user, recipient_email, msg.as_string())
    server.quit()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'message': 'Сообщение отправлено!'
        })
    }
