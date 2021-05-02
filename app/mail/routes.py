from app.mail import bp

@bp.route('/mail')
def mail():
  return "Mail"
