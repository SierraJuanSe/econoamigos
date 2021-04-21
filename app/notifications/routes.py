from app.notifications import bp

@bp.route('/notifications')
def notifications_index():
  return 'Notifications route'
