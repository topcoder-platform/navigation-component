import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

import NotificationButton from '../NotificationButton'
import NotificationsPopup from '../NotificationsPopup'
import UserInfo from '../UserInfo'
import AccountMenu from '../AccountMenu'
import _ from 'lodash'

const LoginNav = ({
  loggedIn,
  notifications,
  accountMenu,
  switchText,
  onSwitch,
  onMenuOpen,
  showNotification,
  profile,
  authURLs,
  auth,
  markNotificationAsRead,
  markAllNotificationAsRead,
  markAllNotificationAsSeen,
  dismissChallengeNotifications
}) => {
  const [openNotifications, setOpenNotifications] = useState()
  const [openAccountMenu, setOpenAccountMenu] = useState()

  const handleClickNotifications = () => setOpenNotifications(x => !x)

  const handleClickUserInfo = () => {
    if (!openAccountMenu) {
      onMenuOpen()
      // prevent body from scrolling on handheld devices
      if (window.innerWidth <= 768) {
        document.body.style.position = 'fixed'
      }
    }
    setOpenAccountMenu(x => !x)
  }

  // process seenNotifications
  const seenNotifications = _.filter((notifications || []), t => !t.isSeen && !t.isRead)
    .map(opt => opt.id)
    .join('-')

  // process unReadNotifications
  const unReadNotifications = _.filter((notifications || []), t => t.isRead === false).length > 0

  const renderLoginPanel = () => {
    if (showNotification) {
      return ([
        <NotificationButton
          notifications={notifications || []}
          notificationsPopupOpen={openNotifications}
          onClick={handleClickNotifications}
          key='notification-button'
        />,
        <UserInfo
          profile={profile}
          newNotifications={!!seenNotifications}
          onClick={handleClickUserInfo}
          open={openAccountMenu}
          key='user-info'
        />
      ])
    }

    return (
      <UserInfo
        profile={profile}
        newNotifications={!!seenNotifications}
        onClick={handleClickUserInfo}
        open={openAccountMenu}
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
        onClose={() => {
          seenNotifications &&
            markAllNotificationAsSeen(seenNotifications, auth.tokenV3)
          setOpenNotifications(false)
        }}
        auth={auth}
        unReadNotifications={unReadNotifications}
        markNotificationAsRead={markNotificationAsRead}
        markAllNotificationAsRead={markAllNotificationAsRead}
        dismissChallengeNotifications={dismissChallengeNotifications}
      />
      <AccountMenu
        profile={profile}
        open={openAccountMenu}
        menu={accountMenu}
        switchText={switchText}
        numNotifications={_.filter((notifications || []), n => !n.isSeen && !n.isRead).length}
        onClickNotifications={handleClickNotifications}
        onSwitch={onSwitch}
        onClose={() => {
          setOpenAccountMenu(false)
          document.body.style.position = ''
        }}
      />
    </div>
  )
}

LoginNav.propTypes = {
  loggedIn: PropTypes.bool,
  notifications: PropTypes.array,
  accountMenu: PropTypes.array,
  onSwitch: PropTypes.func,
  onMenuOpen: PropTypes.func,
  showNotification: PropTypes.bool,
  profile: PropTypes.shape(),
  auth: PropTypes.shape(),
  switchText: PropTypes.shape(),
  authURLs: PropTypes.shape(),
  markNotificationAsRead: PropTypes.func.isRequired,
  markAllNotificationAsRead: PropTypes.func.isRequired,
  markAllNotificationAsSeen: PropTypes.func.isRequired,
  dismissChallengeNotifications: PropTypes.func.isRequired
}

export default LoginNav
