import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const NotificationButton = ({ className, state, onClick, notificationsPopupOpen }) => (
  <div
    className={cn(styles.notificationButton, styles[state], notificationsPopupOpen && styles.isNotificationsPopupOpen, className)}
    onClick={onClick}
  >
    <img src='/img/icon-bell.svg' alt='notification' />
  </div>
)

NotificationButton.propTypes = {
  className: PropTypes.string,
  state: PropTypes.oneOf(['none', 'new', 'seen']),
  onClick: PropTypes.func,
  notificationsPopupOpen: PropTypes.bool
}

export default NotificationButton
