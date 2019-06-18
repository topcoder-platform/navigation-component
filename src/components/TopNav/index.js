import React, { useState, useMemo, useEffect, useLayoutEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import _ from 'lodash'

import styles from './index.module.scss'

import MobileNav from './MobileNav'
import MobileSubNav from './MobileSubNav'
import MobileMenu from './MobileMenu'
import PrimaryNav from './PrimaryNav'
import SubNav from './SubNav'

const moreId = 'more'

let id = 1

const initMenuId = menu => {
  return menu
    .map(level1 => ({
      ...level1,
      id: level1.id || id++,
      subMenu: level1.subMenu && level1.subMenu.map(level2 => ({
        ...level2,
        id: level2.id || id++,
        subMenu: level2.subMenu && level2.subMenu.map(level3 => ({
          ...level3,
          id: level3.id || id++
        }))
      }))
    }))
}

/**
 * TopNav is the main navigation component.
 */
const TopNav = ({
  menu: _menu,
  rightMenu,
  logo,
  theme,
  currentLevel1Id,
  currentLevel2Id,
  onChangeLevel1Id,
  path,
  onChangeLevel2Id,
  handleShowSubnav,
  showSubnav,
  setOpenMore,
  openMore
}) => {
  const [cache] = useState({
    refs: {},
    slide: {}
  })  
  const [collapsed, setCollapsed] = useState(true)
  const [activeLevel1Id, setActiveLevel1Id] = useState()
  const [activeLevel2Id, setActiveLevel2Id] = useState()
  const [activeLevel3Id, setActiveLevel3Id] = useState()
  const [showLevel3, setShowLevel3] = useState()

  const [showChosenArrow, setShowChosenArrow] = useState()
  const [chosenArrowX, setChosenArrowX] = useState()
  const [chosenArrowTick, setChosenArrowTick] = useState(0)

  const [showIconSelect, setShowIconSelect] = useState()
  const [iconSelectX, setIconSelectX] = useState()

  const menuWithId = useMemo(() => initMenuId(_menu), [_menu])

  const [leftNav, setLeftNav] = useState(menuWithId)

  const [showLeftMenu, setShowLeftMenu] = useState()
  const [showMobileSubMenu, setShowMobileSubMenu] = useState()

  const [moreMenu, setMoreMenu] = useState()

  const regenerateMoreMenu = () => setMoreMenu([])

  const createSetRef = id => el => {    
    cache.refs[id] = el
  }

  const findLevel1Menu = level1Id => leftNav.find(level1 => level1.id === level1Id)

  const findLevel2Menu = (level1Id, level2Id) => {
    const menu1 = findLevel1Menu(level1Id)
    return menu1 && menu1.subMenu && menu1.subMenu.find(level2 => level2.id === level2Id)
  }

  const activeMenu1 = findLevel1Menu(activeLevel1Id)
  const activeMenu2 = findLevel2Menu(activeLevel1Id, activeLevel2Id)

  const startSlide = useCallback(() => {
    setLeftNav(leftNav => leftNav.map(menu => {
      if (!cache.refs[menu.id]) return menu
      cache.slide[menu.id] = true
      const el = cache.refs[menu.id]
      const rect = el.getBoundingClientRect()
      return {
        ...menu,
        initialX: rect.x
      }
    }))
  }, [cache.refs, cache.slide])

  const getMenuCenter = useCallback(menuId => {
    const el = cache.refs[menuId]
    const rect = el.getBoundingClientRect()
    return rect.x + rect.width / 2
  }, [cache.refs])

  const setChosenArrowPos = useCallback(menuId => {
    setChosenArrowX(getMenuCenter(menuId))
  }, [setChosenArrowX, getMenuCenter])

  const setIconSelectPos = menuId => {
    setIconSelectX(getMenuCenter(menuId))
  }

  const handleClickLogo = () => {
    setCollapsed(true)
    setActiveLevel1Id()
    setActiveLevel2Id()
    setShowLevel3(false)
    handleShowSubnav(false)
    setShowChosenArrow(false)
    startSlide()
    onChangeLevel1Id()
    onChangeLevel2Id()
  }

  const createHandleClickLevel1 = useCallback(menuId => () => {
    setOpenMore(false)
    setCollapsed(false)
    setActiveLevel1Id(menuId)
    onChangeLevel1Id(menuId)
    setActiveLevel2Id()
    setShowLevel3(false)    
    handleShowSubnav(false)
    startSlide()
    setShowIconSelect(false)
    setTimeout(() => {
      // wait for sliding to end before showing arrow for the first time
      setShowChosenArrow(true)
    }, collapsed ? 250 : 0)
    // trigger the execution of useLayoutEffect below, this is necessary because
    // the other dependencies don't change
    setChosenArrowTick(x => x + 1)
  }, [collapsed, onChangeLevel1Id, startSlide])

  useEffect(() => {
    if (currentLevel1Id !== activeLevel1Id) {
      createHandleClickLevel1(currentLevel1Id)()
    }
  }, [currentLevel1Id, activeLevel1Id, createHandleClickLevel1])

  useLayoutEffect(() => {
    // get final menu pos before it slide. Do this before sliding start, or
    // we'll get incorrect pos
    (activeLevel1Id && !activeLevel2Id) && setChosenArrowPos(activeLevel1Id)
  }, [activeLevel1Id, activeLevel2Id, setChosenArrowPos, chosenArrowTick])

  useLayoutEffect(() => {
    // get final menu pos before it slide. Do this before sliding start, or
    // we'll get incorrect pos
    (activeLevel1Id && activeLevel2Id) && setChosenArrowPos(activeLevel2Id)
  }, [activeLevel1Id, activeLevel2Id, setChosenArrowPos, chosenArrowTick])

  const createHandleClickLevel2 = (menuId, parentMenuId, showNav = true) => () => {        
    setOpenMore(false)
    setActiveLevel2Id(menuId)
    onChangeLevel2Id(menuId)
    if (showNav) {
      setShowLevel3(true)      
      handleShowSubnav(true)
    } else {      
      setShowLevel3(false)
      handleShowSubnav(false)
    }
    setChosenArrowPos(menuId)
    // let the level 3 menu mounted first for sliding indicator to work
    setTimeout(() => {
      const menu = findLevel2Menu(parentMenuId || activeLevel1Id || currentLevel1Id, menuId)      
      if (menu && menu.subMenu) {
        let index = _.findIndex(menu.subMenu, (item) => {
            return item.href.indexOf(path) > -1
        })
        // check if url matches else do not show submenu selected
        if (index > -1) {
          setActiveLevel3Id(menu.subMenu[index].id)
          setIconSelectPos(menu.subMenu[index].id)
          setShowIconSelect(true)
        } else {
          setShowIconSelect(false)
        }
      }
    })
  }

  useEffect(() => {
    if (currentLevel1Id && currentLevel2Id !== activeLevel2Id) {
      createHandleClickLevel2(currentLevel2Id, currentLevel1Id, showSubnav)()
    }
  }, [currentLevel1Id, currentLevel2Id, activeLevel2Id, showSubnav, createHandleClickLevel2])

  const createHandleClickLevel3 = menuId => () => {
    setActiveLevel3Id(menuId)
    setIconSelectPos(menuId)
  }

  const handleClickMore = () => setOpenMore(x => !x)

  const handleCloseMore = () => setOpenMore(false)

  const createHandleClickMoreItem = menuId => () => {
    setOpenMore(false)
    setActiveLevel2Id(menuId)
    setShowLevel3(true)    
    handleShowSubnav(true)
    setChosenArrowPos(moreId)
    // let the level 3 menu mounted first for sliding indicator to work
    setTimeout(() => {
      const menu = findLevel2Menu(activeLevel1Id, menuId)
      if (menu && menu.subMenu) {
        // select first level 3 item
        setActiveLevel3Id(menu.subMenu[0].id)
        // this requires the item element to be mounted first
        setIconSelectPos(menu.subMenu[0].id)
      }
    })
    !showIconSelect && setTimeout(() => setShowIconSelect(true), 300)
  }

  const handleClickLeftMenu = () => setShowLeftMenu(x => !x)

  const createHandleClickLevel2Mobile = menuId => () => {
    setShowLeftMenu(false)
    setActiveLevel2Id(menuId)
    const menu = findLevel2Menu(activeLevel1Id, menuId)
    if (menu && menu.subMenu) {
      let index = _.findIndex(menu.subMenu, (item) => {
          return item.href.indexOf(path) > -1
      })
      // check if url matches else do not show submenu selected
      if (index > -1) {
        setActiveLevel3Id(menu.subMenu[index].id)
      }
    }
  }

  const createHandleClickLevel3Mobile = menuId => () => {
    setActiveLevel3Id(menuId)
    setShowMobileSubMenu(false)
  }

  const handleClickSubMenu = () => setShowMobileSubMenu(x => !x)

  const setOverflow = useCallback(set => {
    cache.refs.primaryNav.style.overflow = set ? 'hidden' : ''
    const containers = Object.keys(cache.refs)
      .filter(key => key.startsWith('level2Container'))
      .map(key => cache.refs[key])
    containers.forEach(el => {
      el.style.overflow = set ? 'hidden' : ''
    })
  }, [cache.refs])

  useEffect(() => {
    const doSlide = () => {
      leftNav.forEach(menu => {
        if (!cache.slide[menu.id] || !cache.refs[menu.id]) return
        cache.slide[menu.id] = false
        const el = cache.refs[menu.id]
        const rect = el.getBoundingClientRect()
        const relativeX = menu.initialX - rect.x
        el.style.transform = `translateX(${relativeX}px)`
        setTimeout(() => {
          el.style.transition = 'transform 250ms ease-out'
          el.style.transform = `translateX(0px)`
          setTimeout(() => {
            el.style.transition = ''
            el.style.transform = ''
          }, 250)
        })
      })
    }
    // set overflow first to have correct final position
    setOverflow(true)
    doSlide()
    // overflow must not be set, otherwise popups won't show
    setOverflow(false)
  }, [cache.slide, cache.refs, leftNav, setOverflow])

  const handleRightMenuResize = () => {
    regenerateMoreMenu()
  }

  // trigger more menu generation on level 1 item change
  useEffect(() => {
    setMoreMenu([])
  }, [activeMenu1])

  // show/hide level 2 more menu
  const generateMoreMenu = useCallback(() => {
    // only proceed if more menu is empty
    if (moreMenu && moreMenu.length) return
    if (!activeMenu1 || !activeMenu1.subMenu) return
    const generateMenu = () => {
      const newMoreMenu = []
      let prect
      for (let i = activeMenu1.subMenu.length - 1; i >= 0; i--) {
        const menu = activeMenu1.subMenu[i]
        const menuEl = cache.refs[menu.id]
        if (!menuEl) return
        const rect = menuEl.getBoundingClientRect()
        if (!prect) {
          prect = menuEl.parentElement.getBoundingClientRect()
        }
        // add the item if it's overflowing
        if (rect.right > prect.right) {
          newMoreMenu.unshift(menu)
        } else if (newMoreMenu.length && prect.right - rect.right < 100) {
          // make sure we have space for the 'more' menu
          newMoreMenu.unshift(menu)
        } else {
          break
        }
      }
      newMoreMenu.length && setMoreMenu(newMoreMenu)
    }
    setOverflow(true)
    generateMenu()
    setOverflow(false)
  }, [activeMenu1, cache.refs, moreMenu, setOverflow])

  // generate more menu before paint
  useLayoutEffect(() => {
    generateMoreMenu()
  }, [generateMoreMenu])

  useEffect(() => {
    // trigger more menu generation on resize
    const onResize = _.debounce(() => regenerateMoreMenu([]), 100)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className={cn(styles.themeWrapper, `theme-${theme}`)}>
      <div className={styles.headerNavUi}>

        {/* The top mobile navigation */}
        <MobileNav
          showLeftMenu={showLeftMenu}
          logo={logo}
          rightMenu={rightMenu}
          onClickLeftMenu={handleClickLeftMenu}
        />

        {/* Mobile sub navigation (active level 2 menu) */}
        {!showLeftMenu && activeMenu2 && (
          <MobileSubNav
            open={showMobileSubMenu}
            menu={activeMenu2}
            activeChildId={activeLevel3Id}
            onClick={handleClickSubMenu}
            createHandleClickItem={createHandleClickLevel3Mobile}
          />
        )}

        {/* Primary navigation (level 1 and level 2 menu) */}
        <PrimaryNav
          collapsed={collapsed}
          showLeftMenu={showLeftMenu}
          logo={logo}
          menu={leftNav}
          rightMenu={rightMenu}
          moreMenu={moreMenu}
          openMore={openMore}
          onCloseMore={handleCloseMore}
          moreId={moreId}
          activeLevel1Id={activeLevel1Id}
          activeLevel2Id={activeLevel2Id}
          onClickLogo={handleClickLogo}
          onRightMenuResize={handleRightMenuResize}
          createHandleClickLevel1={createHandleClickLevel1}
          createHandleClickLevel2={createHandleClickLevel2}
          handleClickMore={handleClickMore}
          createHandleClickMoreItem={createHandleClickMoreItem}
          createSetRef={createSetRef}
          showChosenArrow={showChosenArrow}
          chosenArrowX={chosenArrowX}
        />

        {/* Level 3 menu */}
        <SubNav
          open={showLevel3 && showSubnav}
          menu={activeMenu2}
          activeChildId={activeLevel3Id}
          showIndicator={showIconSelect}
          indicatorX={iconSelectX}
          createHandleClickItem={createHandleClickLevel3}
          createSetRef={createSetRef}
        />

        {/* Mobile level 2 menu */}
        {showLeftMenu && activeMenu1 && (
          <MobileMenu
            menu={activeMenu1}
            activeChildId={activeLevel2Id}
            createHandleClickItem={createHandleClickLevel2Mobile}
          />
        )}

      </div>
    </div>
  )
}

TopNav.defaultProps = {
  theme: 'light',
  onChangeLevel1Id: () => null,
  onChangeLevel2Id: () => null
}

TopNav.propTypes = {
  /**
   * Array of menu objects, each with properties:
   *
   *   - title {string|element} The title
   *   - href {string} The href for wrapper anchor
   *   - subMenu {array} Children menu
   */
  menu: PropTypes.array.isRequired,

  rightMenu: PropTypes.node,

  logo: PropTypes.node,

  /** light|dark etc */
  theme: PropTypes.string,

  currentLevel1Id: PropTypes.any,

  currentLevel2Id: PropTypes.any,

  onChangeLevel1Id: PropTypes.func,

  path: PropTypes.string,
  onChangeLevel2Id: PropTypes.func,

  showSubnav: PropTypes.bool,
  handleShowSubnav: PropTypes.func,

  setOpenMore: PropTypes.func,

  openMore: PropTypes.bool
}

export default TopNav
