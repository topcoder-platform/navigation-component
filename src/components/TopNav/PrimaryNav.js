import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import ResizeDetector from 'react-resize-detector'
import ChosenArrow from '../ChosenArrow'
import IconArrowSmalldown from '../../assets/images/arrow-small-down.svg'
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
  chosenArrowX
}) => {
  const filterNotInMore = menu => !(moreMenu || []).find(x => x.id === menu.id)

  return (
    <div className={cn(styles.primaryNavContainer, showLeftMenu && styles.primaryNavContainerOpen)}>
      <div className={styles.primaryNav} ref={createSetRef('primaryNav')}>
        <div
          className={cn(styles.tcLogo, collapsed && styles.tcLogoPush)}
          onClick={onClickLogo}
        >
          {logo}
        </div>
        {menu.map((level1, i) => ([
          <span className={styles.primaryLevel1Separator} key={`separator-${i}`} />,
          /* Level 1 menu item */
          <a
            className={cn(styles.primaryLevel1, !activeLevel2Id && level1.id === activeLevel1Id && styles.primaryLevel1Open, level1.mobileOnly && styles.mobileOnly)}
            href={level1.href}
            key={`level1-${i}`}
            onClick={createHandleClickLevel1(level1.id)}
            ref={createSetRef(level1.id)}
          >
            {level1.title}
          </a>,
          /* Level 2 menu */
          level1.subMenu && (
            <div
              className={cn(styles.primaryLevel2Container, level1.id === activeLevel1Id && styles.primaryLevel2ContainerOpen)}
              key={`level2-${i}-container`}
              ref={createSetRef(`level2Container${i}`)}
            >
              {level1.subMenu.filter(filterNotInMore).map((level2, i) => (
                <a
                  className={cn(styles.primaryLevel2, level2.id === activeLevel2Id && styles.primaryLevel2Open)}
                  href={level2.href}
                  key={`level2-${i}`}
                  onClick={createHandleClickLevel2(level2.id)}
                  ref={createSetRef(level2.id)}
                >
                  {level2.title}
                </a>
              ))}
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
                    <IconArrowSmalldown />
                  </button>
                  <div className={styles.moreContentContainer}>
                    {moreMenu.map((menu, i) => (
                      <a
                        className={cn(styles.primaryLevel2, menu.id === activeLevel2Id && styles.primaryLevel2Open)}
                        href={menu.href}
                        key={`more-item-${i}`}
                        onClick={createHandleClickMoreItem(menu.id)}
                      >
                        {menu.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        ]))}
        <ChosenArrow show={showChosenArrow} x={chosenArrowX} />
      </div>

      <div className={styles.primaryNavRight}>
        <ResizeDetector
          handleWidth
          onResize={onRightMenuResize}
        />
        {rightMenu && (
          <div className={styles.primaryLevel1}>
            {rightMenu}
          </div>
        )}
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
  chosenArrowX: PropTypes.number
}

export default PrimaryNav
