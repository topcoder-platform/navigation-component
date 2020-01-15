import React from 'react'
import PropTypes from 'prop-types'
import styles from './MobileNav.module.scss'
import IconClose from '../../assets/images/icon-close.svg'
import IconMenu from '../../assets/images/icon-menu.svg'
import { config } from 'topcoder-react-utils'

const MobileNav = ({ loggedIn, showLeftMenu, onClickLeftMenu, logo, rightMenu }) => (
  <div className={styles.mobileNav}>
    <div className={styles.leftMenuContainer}>
      <button className={styles.menuBtn} onClick={onClickLeftMenu}>
        {showLeftMenu ? (
          <IconClose />
        ) : (
          <IconMenu />
        )}
      </button>
    </div>
    <a href={loggedIn ? config.URL.DASH_BOARD : config.URL.BASE}>
      {logo}
    </a>
    {rightMenu && (
      <div className={styles.rightMenu}>
        {rightMenu}
      </div>
    )}
  </div>
)

MobileNav.propTypes = {
  loggedIn: PropTypes.bool,
  showLeftMenu: PropTypes.bool,
  onClickLeftMenu: PropTypes.func,
  logo: PropTypes.node,
  rightMenu: PropTypes.node
}

export default MobileNav
