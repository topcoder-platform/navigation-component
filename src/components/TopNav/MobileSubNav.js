import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import IconArrowSmalldown from '../../assets/images/arrow-small-down.svg'
import IconArrowSmallup from '../../assets/images/arrow-small-up.svg'
import styles from './MobileSubNav.module.scss'

const MobileSubNav = ({ open, menu, activeChildId, onClick, createHandleClickItem }) => (
  <div
    className={cn(styles.mobileSubNav, open && styles.mobileSubNavOpen)}
  >
    <div className={styles.mobileSubNavMask} />
    <button className={styles.mobileSubNavHeader} onClick={onClick}>
      <span>{menu.title}</span>
      {open && <IconArrowSmallup />}
      {!open && <IconArrowSmalldown />}
    </button>
    {open && (
      <div className={styles.mobileSubNavContent}>
        {menu.subMenu && menu.subMenu.map((level3, i) => (
          <a
            className={cn(styles.mobileSubNavChild, level3.id === activeChildId && styles.mobileSubNavChildOpen)}
            href={level3.href}
            key={`level3-${i}`}
            onClick={createHandleClickItem(level3.id)}
          >
            {level3.title}
          </a>
        ))}
      </div>
    )}
  </div>
)

MobileSubNav.propTypes = {
  open: PropTypes.bool,
  menu: PropTypes.object,
  activeChildId: PropTypes.any,
  onClick: PropTypes.func,
  createHandleClickItem: PropTypes.func
}

export default MobileSubNav
