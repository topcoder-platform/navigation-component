import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import IconSelect from '../IconSelect'
import { Link } from 'topcoder-react-utils'
import styles from './SubNav.module.scss'

const SubNav = ({
  open,
  menu,
  isSecondaryMenu,
  isResize,
  activeChildId,
  showIndicator,
  indicatorX,
  createHandleClickItem,
  createSetRef
}) => {
  if (!menu || (isSecondaryMenu ? menu.secondaryMenu : menu.subMenu).length === 0) return null
  return (
    <div className={cn(styles.secondaryNav, open && styles.secondaryNavOpen)}>
      <div className={styles.secondaryNavLinkContainer}>
        {menu && (isSecondaryMenu ? menu.secondaryMenu : menu.subMenu) && (isSecondaryMenu ? menu.secondaryMenu : menu.subMenu).map((level3, i) => {
          const to = _.isEmpty(level3.link) ? level3.href : level3.link
          return (
            <Link
              className={cn(styles.secondaryNavItem, level3.id === activeChildId && styles.secondaryNavItemOpen)}
              key={`level3-${i}`}
              to={to}
              onClick={!level3.openNewTab && createHandleClickItem(level3.id)}
              openNewTab={level3.openNewTab}
            >
              <span ref={createSetRef(level3.id)}>{level3.title}</span>
              <span className={cn(styles.indicator)} />
            </Link>
          )
        })}
        <IconSelect isResize={isResize} show={showIndicator} x={indicatorX} /> </div>
    </div>
  )
}

SubNav.propTypes = {
  open: PropTypes.bool,
  menu: PropTypes.object,
  isResize: PropTypes.bool,
  isSecondaryMenu: PropTypes.bool,
  activeChildId: PropTypes.any,
  showIndicator: PropTypes.bool,
  indicatorX: PropTypes.number,
  createHandleClickItem: PropTypes.func,
  createSetRef: PropTypes.func
}

export default SubNav
