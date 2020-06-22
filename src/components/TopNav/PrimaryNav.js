import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import ResizeDetector from 'react-resize-detector'
import { Link } from 'topcoder-react-utils'
import ChosenArrow from '../ChosenArrow'
import IconArrowSmalldown from '../../assets/images/arrow-small-down.svg'
import IconArrowSmallup from '../../assets/images/arrow-small-up.svg'
import MagnifyingGlass from '../../assets/images/magnifying_glass.svg'
import styles from './PrimaryNav.module.scss'

const PrimaryNav = ({
  collapsed,
  showLeftMenu,
  logo,
  menu,
  rightMenu,
  moreMenu,
  openMore,
  onCloseMore,
  moreId,
  activeLevel1Id,
  activeLevel2Id,
  onClickLogo,
  onRightMenuResize,
  createHandleClickLevel1,
  createHandleClickLevel2,
  handleClickMore,
  createHandleClickMoreItem,
  createSetRef,
  showChosenArrow,
  showLevel3,
  forceHideLevel3,
  chosenArrowX,
  searchOpened,
  toggleSearchOpen
}) => {
  const filterNotInMore = menu => !(moreMenu || []).find(x => x.id === menu.id)
  const activeTrigger = {
    bottom: 50 // The main nav head bottom Y
  }
  return (
    <div>
      <div className={cn(styles.primaryNavContainer, showLeftMenu && styles.primaryNavContainerOpen)}>
        <div className={styles.primaryNav} ref={createSetRef('primaryNav')}>
          <Link
            className={cn(styles.tcLogo, collapsed && styles.tcLogoPush)}
            onClick={(e) => onClickLogo(e)}
            to='/'
          >
            {logo}
          </Link>
          {menu.map((level1, i) => {
            const level1Params = {
              className: cn(styles.primaryLevel1, (!activeLevel2Id || showLeftMenu) && level1.id === activeLevel1Id && styles.primaryLevel1Open, level1.mobileOnly && styles.mobileOnly),
              key: `level1-${i}`,
              onClick: createHandleClickLevel1(level1.id, true)
            }
            return ([
              <span className={styles.primaryLevel1Separator} key={`separator-${i}`} />,
              /* Level 1 menu item */
              level1.href
                ? <Link
                  {...level1Params}
                  to={level1.href}
                  innerRef={createSetRef(level1.id)}
                >
                  {level1.title}
                </Link>
                : <span
                  {...level1Params}
                  ref={createSetRef(level1.id)}
                >
                  {level1.title}
                </span>,
              /* Level 2 menu */
              level1.subMenu && (
                <div
                  className={cn(styles.primaryLevel2Container, level1.id === activeLevel1Id && styles.primaryLevel2ContainerOpen)}
                  key={`level2-${i}-container`}
                  ref={createSetRef(`level2Container${i}`)}
                >
                  {level1.subMenu.filter(filterNotInMore).map((level2, i) => {
                    const level2Params = {
                      className: cn(styles.primaryLevel2, level2.id === activeLevel2Id && styles.primaryLevel2Open),
                      key: `level2-${i}`,
                      onClick: level2.subMenu && level2.subMenu.length > 0 ? createHandleClickLevel2(level2.id, true) : undefined
                    }
                    if ((level2.subMenu && level2.subMenu.length > 0) || level2.href) {
                      return (
                        level2.href
                          ? <Link
                            {...level2Params}
                            to={level2.href}
                            innerRef={createSetRef(level2.id)}
                          >
                            {level2.title}
                          </Link>
                          : <span
                            {...level2Params}
                            ref={createSetRef(level2.id)}
                          >
                            {level2.title}
                          </span>
                      )
                    }
                  })}
                  {/* The More menu */}
                  {level1.id === activeLevel1Id && moreMenu && moreMenu.length > 0 && (
                    <div className={cn(styles.moreBtnContainer, openMore && styles.moreOpen)}>
                      <div className={styles.backdrop} onClick={onCloseMore} />
                      <button
                        className={cn(styles.primaryLevel2, styles.moreBtn)}
                        onClick={handleClickMore}
                        ref={createSetRef(moreId)}
                      >
                        <div className={styles.moreBtnMask} />
                        <span>More</span>
                        {openMore && <IconArrowSmallup />}
                        {!openMore && <IconArrowSmalldown />}
                      </button>
                      <div className={styles.moreContentContainer}>
                        {moreMenu.map((menu, i) => {
                          const menuParams = {
                            className: cn(styles.primaryLevel2, menu.id === activeLevel2Id && styles.primaryLevel2Open),
                            key: `more-item-${i}`,
                            onClick: createHandleClickMoreItem(menu.id)
                          }
                          return (
                            menu.href
                              ? <Link
                                {...menuParams}
                                to={menu.href}
                              >
                                {menu.title}
                              </Link>
                              : <span
                                {...menuParams}
                              >
                                {menu.title}
                              </span>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            ])
          })}
          <ChosenArrow show={showChosenArrow && (showLevel3 && !forceHideLevel3)} x={chosenArrowX} />
        </div>
        <div className={styles.primaryNavRight}>
          <ResizeDetector
            handleWidth
            onResize={onRightMenuResize}
          />
          {rightMenu && (
            <div className={cn(styles.primaryLevel1, styles.rightMenuPrimaryLevel1)}>
              {rightMenu}
            </div>
          )}
          <div
            aria-label='Find members by username or skill'
            role='button'
            tabIndex={0}
            data-menu='search'
            className={cn(styles.searchIcon, { opened: searchOpened })}
            onFocus={() => toggleSearchOpen(true)}
            onBlur={(event) => {
              if (event.pageY < activeTrigger.bottom) {
                toggleSearchOpen(false)
              }
            }}
            onMouseEnter={(event) => toggleSearchOpen(true)}
            onMouseLeave={(event) => {
              console.log(`${event.clientX} - ${event.clientY}`)
              if (event.pageY < activeTrigger.bottom) {
                toggleSearchOpen(false)
              }
            }}
            onTouchStart={(event) => {
              if (searchOpened) {
                toggleSearchOpen(false)
              } else {
                toggleSearchOpen(true)
              }
            }}
          >
            <MagnifyingGlass />
          </div>
        </div>
      </div>
      <div
        role='search'
        className={cn(styles.searchField, { opened: searchOpened, closed: !searchOpened })}
        onMouseLeave={(event) => { toggleSearchOpen(false) }}
      >
        <input
          ref={createSetRef('searchInputBox')}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              window.location = `${window.origin}/search/members?q=${
                encodeURIComponent(event.target.value)
              }`
            }
          }}
          onBlur={() => toggleSearchOpen(false)}
          aria-label='Find members by username or skill'
          placeholder='Find members by username or skill'
        />
      </div>
    </div>
  )
}

PrimaryNav.propTypes = {
  collapsed: PropTypes.bool,
  showLeftMenu: PropTypes.bool,
  logo: PropTypes.node,
  menu: PropTypes.array,
  rightMenu: PropTypes.node,
  moreMenu: PropTypes.array,
  openMore: PropTypes.bool,
  onCloseMore: PropTypes.func,
  moreId: PropTypes.any,
  activeLevel1Id: PropTypes.any,
  activeLevel2Id: PropTypes.any,
  onClickLogo: PropTypes.func,
  onRightMenuResize: PropTypes.func,
  createHandleClickLevel1: PropTypes.func,
  createHandleClickLevel2: PropTypes.func,
  handleClickMore: PropTypes.func,
  createHandleClickMoreItem: PropTypes.func,
  createSetRef: PropTypes.func,
  showChosenArrow: PropTypes.bool,
  showLevel3: PropTypes.bool,
  forceHideLevel3: PropTypes.bool,
  chosenArrowX: PropTypes.number,
  searchOpened: PropTypes.bool,
  toggleSearchOpen: PropTypes.func
}

export default PrimaryNav
