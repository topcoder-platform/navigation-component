import React, { useState, useEffect, useRef } from 'react'
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
  dismissChallengeNotifications,
  tracking
}) => {
  const [openNotifications, setOpenNotifications] = useState()
  const [openAccountMenu, setOpenAccountMenu] = useState()
  const accountMenuRef = useRef(null)
  const userInfoRef = useRef(null)

  useEffect(() => {
    // trigger when orientationChange in ipad
    const onOrientationChange = () => {
      setOpenNotifications(false)
      setOpenAccountMenu(false)
      document.body.style.position = ''
    }
    window.addEventListener('orientationchange', onOrientationChange)
    return () => window.removeEventListener('orientationchange', onOrientationChange)
  }, [])

  useEffect(() => {
    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/false || !!document.documentMode // eslint-disable-line spaced-comment
    // Edge 20+
    const isEdge = !isIE && !!window.StyleMedia
    if (!(isIE || isEdge)) return

    // trigger when click outside
    const onClickOutside = (event) => {
      if (!(userInfoRef.current.contains(event.target) || accountMenuRef.current.contains(event.target))) {
        setOpenAccountMenu(false)
        document.body.style.position = ''
      }
    }
    document.addEventListener('mousedown', onClickOutside, true)
    return () => document.removeEventListener('mousedown', onClickOutside, true)
  }, [])

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
  const unReadNotifications = _.filter((notifications || []), t => !t.isRead).length > 0

  const renderLoginPanel = () => {
    if (showNotification) {
      return ([
        <NotificationButton
          notifications={notifications || []}
          notificationsPopupOpen={openNotifications}
          onClick={() => {
            handleClickNotifications()
            tracking.event('Click', 'Open Notifications Dropdown', window.location.pathname)
          }}
          key='notification-button'
        />,
        <UserInfo
          profile={profile}
          newNotifications={!!seenNotifications}
          onClick={handleClickUserInfo}
          open={openAccountMenu}
          key='user-info'
          domRef={userInfoRef}
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
        domRef={userInfoRef}
      />
    )
  }

  return (
    <div className={styles.loginContainer}>
      {loggedIn ? renderLoginPanel() : (
        <>
          <a
            href='javascript:void(0)'
            onClick={(event) => {
              const retUrl = encodeURIComponent(window.location.href)
              window.location = authURLs.location.replace('%S', retUrl).replace('member?', '#!/member?')
              event.preventDefault()
              return false
            }}
          >
            LOG IN
          </a>
          <a
            className={styles.signup}
            id='button_signup'
            href='javascript:void(0)'
            onClick={(event) => {
              const retUrl = 'https://www.topcoder.com/start&mode=signUp'
              window.location = authURLs.location.replace('%S', retUrl)
              event.preventDefault()
              return false
            }}
          >
            SIGN UP
          </a>
        </>
      )}
      <NotificationsPopup
        open={openNotifications}
        notifications={notifications}
        onClose={() => {
          if (seenNotifications) {
            markAllNotificationAsSeen(seenNotifications, auth.tokenV3)
            tracking.event('Auto Action', 'Mark All Notifications As Seen', 'Dropdown Closed')
          }
          setOpenNotifications(false)
        }}
        auth={auth}
        unReadNotifications={unReadNotifications}
        markNotificationAsRead={markNotificationAsRead}
        markAllNotificationAsRead={markAllNotificationAsRead}
        dismissChallengeNotifications={dismissChallengeNotifications}
        tracking={tracking}
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
        domRef={accountMenuRef}
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
  dismissChallengeNotifications: PropTypes.func.isRequired,
  tracking: PropTypes.shape().isRequired
}

export default LoginNav
