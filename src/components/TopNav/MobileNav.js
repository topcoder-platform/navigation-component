import React from 'react'
import PropTypes from 'prop-types'
import styles from './MobileNav.module.scss'
import IconClose from '../../assets/images/icon-close.svg'
import IconMenu from '../../assets/images/icon-menu.svg'
import IconMagnifyingGlass from '../../assets/images/magnifying_glass.svg'

const MobileNav = ({ showLeftMenu, onClickLeftMenu, logo, onClickLogo, rightMenu }) => (<div>
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
    <a
      onClick={(e) => onClickLogo(e)}
      href='/'>
      {logo}
    </a>
    {rightMenu && (
      <div className={styles.rightMenu}>
        {rightMenu}
      </div>
    )}
  </div>
  {showLeftMenu && (
    <div className={styles.search}>
      <IconMagnifyingGlass className={styles.icon} />
      <input
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            window.location = `${window.origin}/search/members?q=${
              encodeURIComponent(event.target.value)
            }`
          }
        }}
        placeholder='Find members by username or skill'
        aria-label='Find members by username or skill'
      />
    </div>
  )}
</div>
)

MobileNav.propTypes = {
  showLeftMenu: PropTypes.bool,
  onClickLeftMenu: PropTypes.func,
  logo: PropTypes.node,
  onClickLogo: PropTypes.func,
  rightMenu: PropTypes.node
}

export default MobileNav
