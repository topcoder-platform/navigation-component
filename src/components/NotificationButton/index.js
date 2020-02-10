import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import IconBellEmpty from '../../assets/images/icon-bell-grey.svg'
import IconBell from '../../assets/images/icon-bell.svg'
import styles from './styles.module.scss'
import _ from 'lodash'

const getNotificationButtonState = (notifications) => {
  console.log('got')
  console.log(_.countBy(notifications || [], n => !n.seen))
  if (notifications && _.countBy(notifications || [], n => !n.isSeen).true > 0) {
    console.log('returing : new')

    return 'new'
  }
  if (notifications.length === 0) {
    console.log('returing : none')

    return 'none'
  } else {
    console.log('returing : seen')

    return 'seen'
  }
}

const NotificationButton = ({ onClick, notificationsPopupOpen, notifications }) => (
  <div
    className={cn([styles.notificationButton,
      notificationsPopupOpen && styles.isNotificationsPopupOpen,
      styles[getNotificationButtonState(notifications)]])}
    onClick={onClick}
  >
    {(!_.isEmpty(notifications || []) ? <IconBell /> : <IconBellEmpty />)}
  </div>
)

NotificationButton.propTypes = {
  onClick: PropTypes.func,
  notificationsPopupOpen: PropTypes.bool,
  notifications: PropTypes.array
}

export default NotificationButton
