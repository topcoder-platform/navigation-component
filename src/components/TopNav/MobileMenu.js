import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './MobileMenu.module.scss'

const MobileMenu = ({ menu, activeChildId, createHandleClickItem }) => (
  <div className={styles.secondaryNavMobile}>
    {menu.subMenu && menu.subMenu.map((level2, i) => {
      if ((level2.subMenu && level2.subMenu.length > 0) || level2.href) {
        return (
          <a
            className={cn(styles.secondaryNavMobileItem, level2.id === activeChildId && styles.secondaryNavMobileItemOpen)}
            href={level2.href}
            key={`level2-${i}`}
            onClick={level2.subMenu && level2.subMenu.length > 0 ? createHandleClickItem(level2.id) : null}
          >
            {level2.title}
          </a>
        )
      }
    })}
  </div>
)

MobileMenu.propTypes = {
  menu: PropTypes.object,
  activeChildId: PropTypes.any,
  createHandleClickItem: PropTypes.func
}

export default MobileMenu
