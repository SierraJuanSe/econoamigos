from flask import render_template, current_app
from app.email.email import send_email

def send_sale_notification_email(user, product):
  subject = f"Vendiste {product.nombre} - Econoamigos"
  sender = current_app.config['ADMINS'][0]
  recipients = [user.email]
  text_body = render_template('email/sale.txt', user=user, product=product)
  html_body = render_template('email/sale.html', user=user, product=product)
  send_email(subject, sender, recipients, text_body, html_body)
  return html_body


def send_purchase_notification_email(user, product):
  subject = f"Compraste {product.nombre} - Econoamigos"
  sender = current_app.config['ADMINS'][0]
  recipients = [user.email]
  text_body = render_template('email/purchase.txt', user=user, product=product)
  html_body = render_template('email/purchase.html', user=user, product=product)
  send_email(subject, sender, recipients, text_body, html_body)
  return html_body
