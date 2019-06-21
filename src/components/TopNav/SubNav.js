import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import IconSelect from '../IconSelect'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import styles from './SubNav.module.scss'

const SubNav = ({
  open,
  menu,
  isSecondaryMenu,
  activeChildId,
  showIndicator,
  indicatorX,
  createHandleClickItem,
  createSetRef
}) => (
  <Router>
    <div className={cn(styles.secondaryNav, open && styles.secondaryNavOpen)}>
      <div className={styles.secondaryNavLinkContainer}>
        {menu && (isSecondaryMenu ? menu.secondaryMenu : menu.subMenu) && (isSecondaryMenu ? menu.secondaryMenu : menu.subMenu).map((level3, i) => {
          if (!_.isEmpty(level3.link)) {
            return (
              <Link
                className={cn(styles.secondaryNavItem, level3.id === activeChildId && styles.secondaryNavItemOpen)}
                key={`level3-${i}`}
                to={level3.link}
                onClick={createHandleClickItem(level3.id)}
              >
                <span ref={createSetRef(level3.id)}>{level3.title}</span>
              </Link>
            )
          }
          return (
            <a
              className={cn(styles.secondaryNavItem, level3.id === activeChildId && styles.secondaryNavItemOpen)}
              href={level3.href}
              key={`level3-${i}`}
              onClick={createHandleClickItem(level3.id)}
              ref={createSetRef(level3.id)}
            >
              {level3.title}
              <span className={cn(styles.indicator)}></span>
            </a>
          )
        })}
        <IconSelect show={showIndicator} x={indicatorX} />
      </div>
    </div>
  </Router>
)

SubNav.propTypes = {
  open: PropTypes.bool,
  menu: PropTypes.object,
  isSecondaryMenu: PropTypes.bool,
  activeChildId: PropTypes.any,
  showIndicator: PropTypes.bool,
  indicatorX: PropTypes.number,
  createHandleClickItem: PropTypes.func,
  createSetRef: PropTypes.func
}

export default SubNav
