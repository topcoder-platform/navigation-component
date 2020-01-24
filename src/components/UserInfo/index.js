import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import IconAvatar from '../../assets/images/ico-user-default.svg'
import IconArrowSmalldown from '../../assets/images/arrow-small-down.svg'
import IconArrowSmallup from '../../assets/images/arrow-small-up.svg'
import styles from './styles.module.scss'
import _ from 'lodash'

const UserInfo = ({ profile, onClick, open, newNotifications, domRef }) => (
  <div
    ref={domRef}
    className={styles.userInfoContainer}
    role='button'
    onClick={onClick}
  >
    <div className={cn(styles.avatarContainer, newNotifications && styles.newNotifications)}>
      {
        (_.isEmpty(profile) || _.isEmpty(profile.photoURL)) ? (<IconAvatar width='60' className={styles['avatar']} />) : (<img className={styles.avatar} src={profile.photoURL} alt='avatar' />)
      }
    </div>
    <div className={styles.handleContainer}>
      <span className={styles.handle}>{_.isEmpty(profile) ? '' : profile.handle}</span>
      <span className={styles.dropdownIcon}>
        { open ? <IconArrowSmallup /> : <IconArrowSmalldown /> }
      </span>
    </div>
  </div>
)

UserInfo.propTypes = {
  profile: PropTypes.shape(),
  onClick: PropTypes.func,
  open: PropTypes.bool,
  newNotifications: PropTypes.bool,
  domRef: PropTypes.shape()
}

export default UserInfo
