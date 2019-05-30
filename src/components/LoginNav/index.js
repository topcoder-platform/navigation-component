import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

import NotificationButton from '../NotificationButton'
import NotificationsPopup from '../NotificationsPopup'
import UserInfo from '../UserInfo'
import AccountMenu from '../AccountMenu'

const LoginNav = ({
  loggedIn,
  notificationButtonState,
  notifications,
  accountMenu,
  switchText,
  onSwitch,
  showNotification,
  profile,
  authURLs
}) => {
  const [openNotifications, setOpenNotifications] = useState()
  const [openAccountMenu, setOpenAccountMenu] = useState()

  const handleClickNotifications = () => setOpenNotifications(x => !x)

  const handleClickUserInfo = () => setOpenAccountMenu(x => !x)

  const renderLoginPanel = () => {
    if (showNotification) {
      return ([
        <NotificationButton
          className={styles.notificationButton}
          state={notificationButtonState}
          notificationsPopupOpen={openNotifications}
          onClick={handleClickNotifications}
          key='notification-button'
        />,
        <UserInfo
          profile={profile}
          newNotifications={notificationButtonState === 'new'}
          onClick={handleClickUserInfo}
          key='user-info'
        />
      ])
    }

    return (
      <UserInfo
        profile={profile}
        newNotifications={notificationButtonState === 'new'}
        onClick={handleClickUserInfo}
        key='user-info'
      />
    )
  }

  return (
    <div className={styles.loginContainer}>
      {loggedIn ? renderLoginPanel() : (
        <a
          href={authURLs.href}
          onClick={(event) => {
            const retUrl = encodeURIComponent(window.location.href)
            window.location = authURLs.location.replace('%S', retUrl)
            event.preventDefault()
          }}
        >
          LOGIN
        </a>
      )}
      <NotificationsPopup
        open={openNotifications}
        notifications={notifications}
        onClose={() => setOpenNotifications(false)}
      />
      <AccountMenu
        profile={profile}
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
  notificationButtonState: PropTypes.string,
  notifications: PropTypes.array,
  accountMenu: PropTypes.array,
  onSwitch: PropTypes.func,
  showNotification: PropTypes.bool,
  profile: PropTypes.shape(),
  switchText: PropTypes.shape(),
  authURLs: PropTypes.shape()
}

export default LoginNav
