import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import IconArrowSmalldown from '../../assets/images/arrow-small-down.svg'
import IconArrowSmallup from '../../assets/images/arrow-small-up.svg'
import styles from './MobileSubNav.module.scss'

const MobileSubNav = ({ open, menu, isSecondaryMenu, activeChildId, onClick, createHandleClickItem }) => (
  <div
    className={cn(styles.mobileSubNav, open && styles.mobileSubNavOpen)}
  >
    <div className={styles.mobileSubNavMask} />
    {(((!isSecondaryMenu && menu.subMenu && menu.subMenu.length > 0) ||
      (menu.secondaryMenu && menu.secondaryMenu.length > 0)) &&
      <>
        <button className={styles.mobileSubNavHeader} onClick={onClick}>
          <span>{menu.title}</span>
          {open ? <IconArrowSmallup /> : <IconArrowSmalldown />}
        </button>
        {open && (
          <div className={styles.mobileSubNavContent}>
            {(isSecondaryMenu ? menu.secondaryMenu : menu.subMenu).map((level3, i) => (
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
      </>
    ) ||
      <>
        <div className={styles.mobileSubNavHeader}>
          <span>{menu.title}</span>
        </div>
      </>
    }
  </div>
)

MobileSubNav.propTypes = {
  open: PropTypes.bool,
  menu: PropTypes.object,
  isSecondaryMenu: PropTypes.bool,
  activeChildId: PropTypes.any,
  onClick: PropTypes.func,
  createHandleClickItem: PropTypes.func
}

export default MobileSubNav
