import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'
import NotificationIcon from '../../assets/images/icon-bell.svg'
import BackArrow from '../../assets/images/left-arrow.svg'
import NotificationIconBig from '../../assets/images/bell-big.svg'

const EmptyNotifications = ({ onClose, emptyTitle, emptyText }) => (
  <>
    <div className={styles['noti-header']}>
      <div className={styles['lefts']}>
        <div
          className={styles['notification-icon']}
        >
          <NotificationIcon />
        </div>
        <div
          className={styles['notification-left-btn-mobile']}
          role='button'
          onClick={onClose}
        >
          <BackArrow />
        </div>
        <span className={styles['noti-title']}>Notifications</span>
      </div>
      <span className={cn(styles['noti-empty-title-mobileonly'])}>Notifications</span>
    </div>
    <div className={cn(styles['noti-body'], styles['noti-body-empty'], styles.center)}>
      <NotificationIconBig className={styles['big-icon-bell']} />
      <div className={styles['empty-title']}>{emptyTitle}</div>
      {/*
        * Disabled until Settings page is ready
        *
      <div className={cn(styles.txt, styles['center-txt'])}>{emptyText}</div>
      <span className={cn(styles['btn-empty-noti'])} role='button'>
        Notifications Settings
      </span>
      */}
    </div>
  </>
)

EmptyNotifications.defaultProps = {
  emptyTitle: 'Good job! You’re all caught up',
  emptyText: (
    <div>
      Join challenges and check your notification settings if you don’t
      receive notifications. We’re actively adding new notifications.
    </div>
  )
}

EmptyNotifications.propTypes = {
  onClose: PropTypes.func,
  emptyTitle: PropTypes.node,
  emptyText: PropTypes.node
}

export default EmptyNotifications
