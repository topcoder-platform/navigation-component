import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const AccountMenu = ({
  open,
  onClose,
  avatarSrc,
  username,
  description,
  email,
  menu,
  switchText,
  numNotifications,
  onClickNotifications,
  onSwitch
}) => {
  const handleClickItem = item => () => {
    if (item.onClick) {
      item.onClick()
      onClose()
    }
  }
  return (
    <div className={cn(styles['user-info-popup'], open && styles.open)}>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles['header']}>
        <img src={avatarSrc} width='60' className={styles['avatar']} alt='avatar' />
        <div className={styles['handle-container']}>
          <span className={styles['handle']}>{username}</span>
          <span className={styles['email']}>{email}</span>
        </div>
      </div>

      <div className={cn(styles['header'], styles['header-mobile'])}>
        <div className={styles['left-content']}>
          <img src={avatarSrc} width='60' className={styles['avatar']} alt='avatar' />
          <div className={styles['handle-container']}>
            <span className={styles['handle']}>@{username}</span>
            <span className={styles['description']}>{description}</span>
          </div>
        </div>
        <span role='button' className={styles['icon-close']} onClick={onClose}>
          <img src='/img/icon-close-dark.svg' alt='menu' />
        </span>
      </div>

      <div
        role='button'
        className={styles['switch-to-business-container']}
        onClick={onSwitch}
      >
        <img className={styles['switch-icon']} src='/img/icon-switch-business.svg' alt='switch' />
        <span className={styles['switch-to-busniness']}>Switch to BUSINESS</span>
      </div>

      <div className={styles.menu}>

        <div className={styles['notification-mobile']} onClick={onClickNotifications}>
          <div className={styles['left-notifi']}>
            <span className={styles['title']}>
              Notifications
            </span>&nbsp;
            <span className={styles['red-number']}>
              ({numNotifications})
            </span>
          </div>
          <span className={styles['notification-right-arrow']} />
        </div>

        <span className={cn(styles.separator, styles['hide-not-mobile'])} />

        {menu.map((item, i) => (
          item.separator ? (
            <span className={styles.separator} key={`separator-${i}`} />
          ) : (
            <a
              href={item.href}
              key={`item-${i}`}
              onClick={handleClickItem(item)}
            >
              {item.title}
            </a>
          )
        ))}

      </div>
    </div>
  )
}

AccountMenu.defaultProps = {
  avatarSrc: '/img/img-vic-tor-avatar.svg',
  username: 'vic-tor',
  email: 'vic@topcoder.com',
  description: 'Member since May, 2009',
  switchText: 'Switch to BUSINESS',
  numNotifications: 35,
  menu: [
    { title: 'Settings', href: null, onClick: null },
    { title: 'Payments', href: null, onClick: null },
    { title: 'All projects', href: null, onClick: null },
    { separator: true },
    { title: 'Help', href: null, onClick: null },
    { title: 'About Topcoder', href: null, onClick: null },
    { title: 'Log Out', href: null, onClick: null }
  ]
}

AccountMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  avatarSrc: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
  menu: PropTypes.array,
  switchText: PropTypes.string,
  numNotifications: PropTypes.number,
  onClickNotifications: PropTypes.func,
  onSwitch: PropTypes.func
}

export default AccountMenu
