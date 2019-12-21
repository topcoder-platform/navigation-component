import React from 'react'
import PropTypes from 'prop-types'
import styles from './MobileNav.module.scss'
import IconClose from '../../assets/images/icon-close.svg'
import IconMenu from '../../assets/images/icon-menu.svg'
import IconMagnifyingGlass from '../../assets/images/magnifying_glass.svg'
import { config } from 'topcoder-react-utils'

const MobileNav = ({ showLeftMenu, onClickLeftMenu, logo, rightMenu }) => (<div>
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
    <a href='/'>
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
            window.location = `${config.URL.BASE}/search/members?q=${
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
  rightMenu: PropTypes.node
}

export default MobileNav
