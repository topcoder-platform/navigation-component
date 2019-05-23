import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

import NotificationButton from '../NotificationButton'
import NotificationsPopup from '../NotificationsPopup'
import UserInfo from '../UserInfo'
import AccountMenu from '../AccountMenu'

const LoginNav = ({
  loggedIn,
  avatarSrc,
  username,
  notificationButtonState,
  notifications,
  accountMenu,
  switchText,
  onSwitch,
  onClickLogin
}) => {
  const [openNotifications, setOpenNotifications] = useState()
  const [openAccountMenu, setOpenAccountMenu] = useState()

  const handleClickNotifications = () => setOpenNotifications(x => !x)

  const handleClickUserInfo = () => setOpenAccountMenu(x => !x)

  return (
    <div className={styles.loginContainer}>
      {loggedIn ? ([
        <NotificationButton
          className={styles.notificationButton}
          state={notificationButtonState}
          notificationsPopupOpen={openNotifications}
          onClick={handleClickNotifications}
          key='notification-button'
        />,
        <UserInfo
          avatarSrc={avatarSrc}
          username={username}
          newNotifications={notificationButtonState === 'new'}
          onClick={handleClickUserInfo}
          key='user-info'
        />
      ]) : (
        <span onClick={onClickLogin}>LOGIN</span>
      )}
      <NotificationsPopup
        open={openNotifications}
        notifications={notifications}
        onClose={() => setOpenNotifications(false)}
      />
      <AccountMenu
        open={openAccountMenu}
        menu={accountMenu}
        switchText={switchText}
        numNotifications={(notifications || []).length}
        onClickNotifications={handleClickNotifications}
        onSwitch={onSwitch}
        onClose={() => setOpenAccountMenu(false)}
      />
    </div>
  )
}

LoginNav.propTypes = {
  loggedIn: PropTypes.bool,
  avatarSrc: PropTypes.string,
  username: PropTypes.node,
  notificationButtonState: PropTypes.string,
  notifications: PropTypes.array,
  accountMenu: PropTypes.array,
  switchText: PropTypes.string,
  onSwitch: PropTypes.func,
  onClickLogin: PropTypes.func
}

export default LoginNav
