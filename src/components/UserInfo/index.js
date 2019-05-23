import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const UserInfo = ({ avatarSrc, username, onClick, newNotifications }) => (
  <div
    className={styles.userInfoContainer}
    role='button'
    onClick={onClick}
  >
    <div className={cn(styles.avatarContainer, newNotifications && styles.newNotifications)}>
      <img className={styles.avatar} src={avatarSrc} alt='avatar' />
    </div>
    <div className={styles.handleContainer}>
      <span className={styles.handle}>{username}</span>
      <span className={styles.dropdownIcon}>
        <img src='/img/arrow-small-down.svg' alt='dropdown icon' />
      </span>
    </div>
  </div>
)

UserInfo.propTypes = {
  avatarSrc: PropTypes.string,
  username: PropTypes.node,
  onClick: PropTypes.func,
  newNotifications: PropTypes.bool
}

export default UserInfo
