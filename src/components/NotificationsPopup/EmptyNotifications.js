import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const EmptyNotifications = ({ onClose, emptyTitle, emptyText }) => (
  <>
    <div className={styles['noti-header']}>
      <span
        className={styles['notification-back-btn']}
        role='button'
        onClick={onClose}
      />
      <span className={styles['left-noti']}>Notifications</span>
      <div className={styles.rights}>
        <span className={styles['white-link']} role='button'>Settings</span>
      </div>
      <span className={styles['btn-setting']} role='button' />
    </div>
    <div className={cn(styles['noti-body'], styles.center)}>
      <i className={cn(styles.icons, styles['icon-bell'])} />
      <h4 className={styles.titles}>{emptyTitle}</h4>
      <div className={cn(styles.txt, styles['center-txt'])}>{emptyText}</div>
    </div>
    <div className={styles['noti-footer']}>
      <span className={cn(styles.btn, styles['btn-blue'])} role='button'>
        Notification Settings
      </span>
    </div>
  </>
)

EmptyNotifications.defaultProps = {
  emptyTitle: 'Good job! You’re all caught up',
  emptyText: (
    <div>
      Join challenges and check your notification settings if
      you don’t receive notifications. We’re actively adding
      new notifications. Read our <a href='/' className={styles.blueLink}>blog post</a> for more info
    </div>
  )
}

EmptyNotifications.propTypes = {
  onClose: PropTypes.func,
  emptyTitle: PropTypes.node,
  emptyText: PropTypes.node
}

export default EmptyNotifications
