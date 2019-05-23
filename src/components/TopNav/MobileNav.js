import React from 'react'
import PropTypes from 'prop-types'
import styles from './MobileNav.module.scss'

const MobileNav = ({ showLeftMenu, onClickLeftMenu, logo, rightMenu }) => (
  <div className={styles.mobileNav}>
    <div className={styles.leftMenuContainer}>
      <button className={styles.menuBtn} onClick={onClickLeftMenu}>
        {showLeftMenu ? (
          <img src='/img/icon-close.svg' alt='close' />
        ) : (
          <img src='/img/icon-menu.svg' width='20' alt='menu' />
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
