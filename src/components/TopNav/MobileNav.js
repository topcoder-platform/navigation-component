import React from 'react'
import PropTypes from 'prop-types'
import styles from './MobileNav.module.scss'
import IconClose from '../../assets/images/icon-close.svg'
import IconMenu from '../../assets/images/icon-menu.svg'

const MobileNav = ({ showLeftMenu, onClickLeftMenu, logo, rightMenu }) => (
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
    {logo}
    {rightMenu && (
      <div className={styles.rightMenu}>
        {rightMenu}
      </div>
    )}
  </div>
)

MobileNav.propTypes = {
  showLeftMenu: PropTypes.bool,
  onClickLeftMenu: PropTypes.func,
  logo: PropTypes.node,
  rightMenu: PropTypes.node
}

export default MobileNav
