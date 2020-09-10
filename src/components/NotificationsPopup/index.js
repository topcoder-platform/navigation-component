import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'
import EmptyNotifications from './EmptyNotifications'
import NotificationList from './NotificationList'

const NotificationsPopup = ({ open, onClose, emptyTitle, markNotificationAsRead,
  emptyText, notifications, unReadNotifications,
  markAllNotificationAsRead, dismissChallengeNotifications, auth, tracking }) =>
  (
    <div className={cn(styles['notifications-panel'], open && styles.open)}>
      <div className={styles.backdrop} onClick={onClose} />
      {notifications && notifications.length > 0 ? (
        <NotificationList notifications={notifications}
          markNotificationAsRead={markNotificationAsRead}
          auth={auth}
          unReadNotifications={unReadNotifications}
          markAllNotificationAsRead={markAllNotificationAsRead}
          dismissChallengeNotifications={dismissChallengeNotifications}
          onClose={onClose}
          tracking={tracking} />
      ) : (<EmptyNotifications emptyTitle={emptyTitle} emptyText={emptyText}
        onClose={onClose} />)}
    </div>
  )

NotificationsPopup.defaultProps = {
  emptyTitle: 'Good job! You’re all caught up',
  emptyText: <div>
    Join challenges and check your notification settings if you don’t
    receive notifications. We’re actively adding new notifications.
  </div>

}

NotificationsPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  emptyTitle: PropTypes.node,
  emptyText: PropTypes.node,
  auth: PropTypes.shape(),

  /**
   * Array of Notifications, each with properties:
   *
   *   - content {string|node}
   *   - category {array}
   *   - tags {array}
   *   - timestamp {number}
  */
  notifications: PropTypes.array,
  unReadNotifications: PropTypes.bool,
  markNotificationAsRead: PropTypes.func.isRequired,
  markAllNotificationAsRead: PropTypes.func.isRequired,
  dismissChallengeNotifications: PropTypes.func.isRequired,
  tracking: PropTypes.shape().isRequired
}

export default NotificationsPopup
