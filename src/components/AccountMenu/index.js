import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from 'topcoder-react-utils'
import IconAvatar from '../../assets/images/img-vic-tor-avatar.svg'
import IconCloseDark from '../../assets/images/icon-close-dark.svg'
import IconSwitchBusiness from '../../assets/images/icon-switch-business.svg'
import styles from './styles.module.scss'
import moment from 'moment'

// The roles of managers/copilots/admins.
const MANAGE_ROLES = [
  'administrator',
  'admin',
  'copilot',
  'connect copilot',
  'manager',
  'global manager',
  'client manager',
  'connect manager',
  'connect account manager',
  'connect copilot manager'
]

const hasAccess = roles => {
  if (!roles) {
    return false
  }
  return roles.some(v => MANAGE_ROLES.indexOf(v.toLowerCase()) !== -1)
}

class AccountMenu extends React.Component {
  renderLink (menu, i) {
    const { onClose } = this.props
    const to = _.isEmpty(menu.link) ? menu.href : menu.link
    return (
      <Link to={to} key={`item-${i}`} onClick={onClose}>
        {menu.title}
      </Link>
    )
  }

  render () {
    const {
      onClose, open, menu, switchText, onSwitch, profile
    } = this.props

    return (
      <div className={cn(styles['user-info-popup'], open && styles.open)}>
        <div className={styles.backdrop} onClick={onClose} />

        <Link to={_.isEmpty(profile) ? '/' : `/members/${profile.handle}`}>
          <div className={styles['header']}>
            {
              (_.isEmpty(profile) || _.isEmpty(profile.photoURL)) ? (<IconAvatar width='60' className={styles['avatar']} />) : (<img src={profile.photoURL} width='60' className={styles['avatar']} alt='avatar' />)
            }
            <div className={styles['handle-container']}>
              <span className={styles['handle']}>{_.isEmpty(profile) ? '' : profile.handle}</span>
              <span className={styles['email']}>{_.isEmpty(profile) ? '' : profile.email}</span>
            </div>
          </div>
        </Link>
        <div className={cn(styles['header'], styles['header-mobile'])}>
          <div className={styles['left-content']}>
            {
              (_.isEmpty(profile) || _.isEmpty(profile.photoURL)) ? (<IconAvatar width='60' className={styles['avatar']} />) : (<img src={profile.photoURL} width='60' className={styles['avatar']} alt='avatar' />)
            }
            <div className={styles['handle-container']}>
              <span className={styles['handle']}>@{_.isEmpty(profile) ? '' : profile.handle}</span>
              <span className={styles['description']}>{_.isEmpty(profile) ? '' : `Member since ${moment(profile.createdAt).format('MMMM, YYYY')}`}</span>
            </div>
          </div>
          <span role='button' className={styles['icon-close']} onClick={onClose}>
            <IconCloseDark />
          </span>
        </div>

        {
          !_.isEmpty(profile) && (
            <div
              role='button'
              className={styles['switch-to-business-container']}
              onClick={onSwitch}
            >
              <IconSwitchBusiness className={styles['switch-icon']} />
              <Link to={hasAccess(profile.roles) ? _.isEmpty(switchText.href) ? switchText.link : switchText.href : 'http://www.topcoder.com'} onClick={onClose}>
                <span className={styles['switch-to-busniness']}>{switchText.title}</span>
              </Link>
            </div>
          )
        }

        <div className={styles.menu}>

          {menu.map((item, i) => (
            item.separator ? (
              <span className={styles.separator} key={`separator-${i}`} />
            ) : (this.renderLink(item, i))
          ))}

        </div>
      </div>
    )
  }
}

AccountMenu.defaultProps = {
  numNotifications: 35
}

AccountMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  menu: PropTypes.array,
  switchText: PropTypes.shape(),
  onSwitch: PropTypes.func,
  profile: PropTypes.shape()
}

export default AccountMenu
