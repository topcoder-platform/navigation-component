import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import IconSelect from '../IconSelect'
import styles from './SubNav.module.scss'

const SubNav = ({
  open,
  menu,
  activeChildId,
  showIndicator,
  indicatorX,
  createHandleClickItem,
  createSetRef
}) => (
  <div className={cn(styles.secondaryNav, open && styles.secondaryNavOpen)}>
    <div className={styles.secondaryNavLinkContainer}>
      {menu && menu.subMenu && menu.subMenu.map((level3, i) => (
        <a
          className={cn(styles.secondaryNavItem, level3.id === activeChildId && styles.secondaryNavItemOpen)}
          href={level3.href}
          key={`level3-${i}`}
          onClick={createHandleClickItem(level3.id)}
          ref={createSetRef(level3.id)}
        >
          {level3.title}
        </a>
      ))}
      <IconSelect show={showIndicator} x={indicatorX} />
    </div>
  </div>
)

SubNav.propTypes = {
  open: PropTypes.bool,
  menu: PropTypes.object,
  activeChildId: PropTypes.any,
  showIndicator: PropTypes.bool,
  indicatorX: PropTypes.number,
  createHandleClickItem: PropTypes.func,
  createSetRef: PropTypes.func
}

export default SubNav
