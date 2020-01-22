import React, { useState, useEffect, useRef } from 'react'
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
  onMenuOpen,
  showNotification,
  profile,
  authURLs
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
    const listener = event => {
      if (event.code === 'Enter') {
        event.target.click()
      }
    }
    document.addEventListener('keydown', listener)
    window.addEventListener('orientationchange', onOrientationChange)
    return () => {
      document.removeEventListener('keydown', listener)
      window.removeEventListener('orientationchange', onOrientationChange)
    }
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
          open={openAccountMenu}
          key='user-info'
          domRef={userInfoRef}
        />
      ])
    }

    return (
      <UserInfo
        profile={profile}
        newNotifications={notificationButtonState === 'new'}
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
        <a
          href='javascript:void(0)'
          tabIndex='0'
          onClick={(event) => {
            const retUrl = encodeURIComponent(window.location.href)
            window.location = authURLs.location.replace('%S', retUrl).replace('member?', '#!/member?')
            event.preventDefault()
            return false
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
  notificationButtonState: PropTypes.string,
  notifications: PropTypes.array,
  accountMenu: PropTypes.array,
  onSwitch: PropTypes.func,
  onMenuOpen: PropTypes.func,
  showNotification: PropTypes.bool,
  profile: PropTypes.shape(),
  switchText: PropTypes.shape(),
  authURLs: PropTypes.shape()
}

export default LoginNav
