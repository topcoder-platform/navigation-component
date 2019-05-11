import React from "react";
import PropTypes from 'prop-types';

import "./Styles.scss";
import TCLogo from './../../image/tc-logo.svg';
import VicTorAvatar from '../../image/img-vic-tor-avatar.svg';
import ArrowSmallDown from '../../image/arrow-small-down.svg';
import IconMenu from '../../image/icon-menu.svg';
import IconClose from '../../image/icon-close.svg';
import IconBell from '../../image/icon-bell.svg';
import IconSwitchBusiness from '../../image/icon-switch-business.svg';
import ArrowSmallDownDark from '../../image/arrow-small-down-dark.svg';
import IconCloseDark from '../../image/icon-close-dark.svg';

const SECONDARY_NAVBAR_HEIGHT = 60; //px

export class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.headerNavUi = React.createRef();
    this.primaryNav = React.createRef();
    this.arrowSelectedPrimaryAnimation = React.createRef();
    this.secondaryNav = React.createRef();
    this.arrowSelectedSecondaryAnimation = React.createRef();
    this.secondaryNavMobile = React.createRef();
    this.mobileNavSubMenu = React.createRef();
    this.secondaryNavLinkContainer = React.createRef();
    this.previousSelectElementDesktop = null;
    this.previousLevel2ItemSelectElement = null;
    this.selectingLevel1ClassKey = null;
    this.notificationPanelPopup = React.createRef();
    this.notificationPanelEmpty = React.createRef();
    this.notificationPanelFull = React.createRef();
    this.notificationPanelEmptyMobile = React.createRef();
    this.notificationPanelFullMobile = React.createRef();
    this.spaceForShrinkMore = 100;
    this.showEmpty = true;
    this.shouldDismissNotification = false;
    this.showEmptyMobile = false;
    this.previousScreenWidth = 0;

    this.homeClick = this.homeClick(this);

  }

  componentDidMount() {
    const that = this;

    this.createAndMappingNavData();

    /**
     * Scroll the mobile notification popup
     * @param {click event} event
     */
    document.getElementsByClassName('mobile-notifications-panel')[1].addEventListener("scroll", function(){
      console.log("scroll");
      if(document.getElementsByClassName('mobile-notifications-panel')[1].scrollTop >= 50) {
        this.addClass(this.notificationPanelFullMobile.current, "fixTop");
      } else {
        this.removeClass(this.notificationPanelFullMobile.current, "fixTop");
      }
    });



    // handle event window resize
    window.addEventListener("resize", function(){
      console.log("resize")
      that.checkForShrinkMore();
    });

    this.checkForShrinkMore();
    setTimeout(function () {
      that.checkForShrinkMore();
      that.adjustSelectionPrimaryNavPosition(false);
      that.adjustSelectionSecondaryNavPosition(false);
    }, 100);

    var headerNavUi = this.headerNavUi.current;
    var arrowSelectedPrimaryAnimation = this.arrowSelectedPrimaryAnimation.current;

    headerNavUi.querySelectorAll('.mobile-nav .menu-btn')[0].addEventListener('click', function (event) {
      event.preventDefault();
      that.removeClass(that.mobileNavSubMenu.current, 'isOpen');
      that.addClass(headerNavUi, 'isOpenSecondaryNavMobile');
      that.adjustSelectionPrimaryNavPosition(false);
      setTimeout(function () {
        that.addClass(arrowSelectedPrimaryAnimation, 'isAnimation');
      }, 100);
    }, false);

    headerNavUi.querySelectorAll('.mobile-nav .close-btn')[0].addEventListener('click', function (event) {
      event.preventDefault();
      that.removeClass(headerNavUi, 'isOpenSecondaryNavMobile');
    }, false);

    this.mobileNavSubMenu.current.getElementsByClassName('header')[0].addEventListener('click', function (event) {
      event.preventDefault();
      that.toggleClass(that.mobileNavSubMenu.current, 'isOpen');
    }, false);

    // handle click event
    ['click', 'touchend'].forEach((handle) => {
      document.addEventListener(handle, function (event) {
        that.subLevel1Click(event);
        that.subLevel2Click(event);
        that.subLevel2MoreClick(event);
        that.subLevel2MobileClick(event);
        that.loginButtonClick(event);
        that.logoutButtonClick(event);
        that.notificationsButtonClick(event);
        that.notificationsMobileButtonClick(event);
        that.notificationsMobileBackClick(event);
        that.secondaryLevel1Click(event);
        that.mobileNavSubMenuItemClick(event);
        that.secondaryLevel1MoreClick(event);
        that.userInfoContainerClick(event);
        that.notificationsInfoContainerClick(event);
        that.moreButtonClick(event);
        that.switchBussinessWork(event)
      }, false);
    });

    // handle avatar hover events
    document.addEventListener('mouseover', function (event) {
      that.avatarHover(event);
    }, false);
    document.addEventListener('mouseout', function (event) {
      that.avatarHover(event);
    }, false);
  }


  /**
   * Get offset of element
   * @param {HTMLElement} el Dom element
   * @return {{top: number, left: number}}
   */
  offset(el) {
    if (!el) {
      return { top: 0, left: 0 };
    }
    var rect = el.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  /**
   * Remove class from element
   * @param {HTMLElement | HTMLElement[]} el
   * @param {string} classname
   * @return {HTMLElement | HTMLElement[]}
   */
  removeClass(el, classname) {
    return this.iterateElement(el, function(elIterate){
      elIterate.classList.remove(classname);
    });
  }

  /**
   * Set attribute
   * @param {HTMLElement | HTMLElement[]} el
   * @param {string} key
   * @param {string} value
   * @return {HTMLElement | HTMLElement[]}
   */
  setAttribute(el, key, value) {
    return this.iterateElement(el, function(elIterate){
      elIterate.setAttribute(key, value);
    });
  }

  /**
   * Set html
   * @param {HTMLElement | HTMLElement[]} el
   * @param {string} html
   * @return {HTMLElement | HTMLElement[]}
   */
  setHTML(el, html) {
    return this.iterateElement(el, function(elIterate){
      elIterate.innerHTML = html;
    });
  }

  /**
   * Add class to element
   * @param {HTMLElement | HTMLElement[]} el
   * @param {string} classname
   * @return {HTMLElement | HTMLElement[]}
   */
  addClass(el, classname) {
    return this.iterateElement(el, function(elIterate){
      elIterate.classList.add(classname);
    });
  }

  /**
   * Toggle class to element
   * @param {HTMLElement | HTMLElement[]} el
   * @param {string} classname
   * @return {HTMLElement | HTMLElement[]}
   */
  toggleClass(el, classname) {
    return this.iterateElement(el, function(elIterate){
      elIterate.classList.toggle(classname);
    });
  }

  /**
   * Check if element has class
   * @param {HTMLElement} el
   * @param {string} classname
   * @return {boolean}
   */
  hasClass(el, classname) {
    var hasClass = false;
    this.iterateElement(el, function(elIterate){
      hasClass = elIterate.classList.contains(classname);
    });
    return hasClass;
  }

  /**
   * Iterate all elements
   *
   * @param {HTMLElement | HTMLElement[]} el
   * @param {callback} cb
   * @return {HTMLElement | HTMLElement[]}
   */
  iterateElement(el, cb) {
    if (!el) {
      return;
    }
    if (el.classList) {
      if (cb) {
        cb(el);
      }
      return el;
    }
    var list = el;
    for (var i = 0; i < list.length; i++) {
      var ele = list[i];
      if (cb) {
        cb(ele);
      }
    }
    return el;
  }

  /**
   * Get list closest child of the element
   * @param {HTMLElement} el
   * @return {HTMLElement[]}
   */
  getTheClosestChild(el) {
    var elements = [];
    for (var i=0; i<el.childNodes.length; i++) {
      var child = el.childNodes[i];
      if (child.nodeType == 1) {
        elements.push(child)
      }
    }
    return elements;
  }

  /**
   * Get distance between 2 elements
   * @param {HTMLElement} el1
   * @param {HTMLElement} el2
   * @return {number} The distance
   */
  getDistance(el1, el2) {
    var el1Offset = this.offset(el1);
    if (el2) {
      var el2Offset = this.offset(el2);
      var distance = el2Offset.left - el1Offset.left - el1.offsetWidth;
      return distance;
    } else {
      var w = window.innerWidth;
      var distance = w - el1Offset.left - el1.offsetWidth;
      return distance;
    }
  }

  /**
   * Remove element
   * @param {HTMLElement | HTMLElement[]} el
   */
  removeItem(el) {
    return this.iterateElement(el, function(elIterate){
      elIterate.parentNode.removeChild(elIterate);
    });
  }

  /**
   * Where el is the DOM element you'd like to test for visibility
   * @param {HTMLElement} el
   * @return {boolean}
   */
  isHidden(el) {
    return (el.offsetParent === null)
  }

  /**
   * create nav from json object
   */
  createAndMappingNavData() {
    var primaryNav = this.primaryNav.current;
    var headerNavUi = this.headerNavUi.current;

    var primaryLevel1 = primaryNav.querySelectorAll('.primary-level-1.hide')[0];
    var primaryLevel1Separator = primaryNav.querySelectorAll('.primary-level-1-separator.hide')[0];
    var primaryLevel2Container = primaryNav.querySelectorAll('.primary-level-2-container.hide')[0];
    var loginBtn = primaryNav.querySelectorAll('.login-btn')[0];
    var { navMenus } = this.props;

    // create primary menu level 1
    for (var i = 0; i < navMenus.length; i++) {
      var menuLevel1 = navMenus[i];
      var value = menuLevel1.value;
      var subMenu = menuLevel1.subMenu;

      var primaryLevel1Item = primaryLevel1.cloneNode(true);
      if (!this.previousSelectElementDesktop) {
        this.previousSelectElementDesktop = primaryLevel1Item;
      }
      var primaryLevel1SeparatorItem = primaryLevel1Separator.cloneNode(true);
      this.setHTML(this.setAttribute(this.setAttribute(this.addClass(this.removeClass(this.removeClass(primaryLevel1Item, 'hide'), 'ignore'), 'copied'), 'key', value),'indexLevel1', i), value);
      this.addClass(this.removeClass(this.removeClass(primaryLevel1SeparatorItem, 'hide'), 'ignore'), 'copied');
      primaryNav.insertBefore(primaryLevel1Item, loginBtn);
      if (i !== navMenus.length - 1) {
        primaryNav.insertBefore(primaryLevel1SeparatorItem, loginBtn);
      }

      if (value === 'MORE') {
        this.addClass(primaryLevel1Item, 'more-menu');
        continue;
      }

      var primaryLevel2ContainerItem = primaryLevel2Container.cloneNode(true);
      this.setAttribute(primaryLevel2ContainerItem, 'key', value);
      this.addClass(this.removeClass(primaryLevel2ContainerItem, 'hide'), 'copied');
      primaryNav.insertBefore(primaryLevel2ContainerItem, loginBtn);
      // create primary menu level 2
      var primaryLevel2 = primaryLevel2ContainerItem.querySelectorAll('.primary-level-2.hide')[0];
      var moreBtnContainerLevel2 = primaryLevel2ContainerItem.querySelectorAll('.more-btn-container')[0];
      var moreContentContainer = primaryLevel2ContainerItem.querySelectorAll('.more-content-container')[0];
      var moreContentIgnoreItem = moreContentContainer.querySelectorAll('a.hide')[0];
      for (var j = 0; j < subMenu.length; j++) {
        var menuLevel2 = subMenu[j];
        var value2 = menuLevel2.value;
        var primaryLevel2Item = primaryLevel2.cloneNode(true);
        this.setHTML(this.setAttribute(this.setAttribute(this.setAttribute(this.addClass(this.removeClass(this.removeClass(primaryLevel2Item, 'hide'), 'ignore'), 'copied'), 'key', value2),'indexLevel1', i),'indexLevel2', j), value2);
        primaryLevel2ContainerItem.insertBefore(primaryLevel2Item, moreBtnContainerLevel2);

        var moreContentItem = moreContentIgnoreItem.cloneNode(true);
        this.setHTML(this.setAttribute(this.setAttribute(this.addClass(this.removeClass(moreContentItem, 'ignore'), 'copied'), 'key', value2),'index', i), value2);
        moreContentContainer.appendChild(moreContentItem);
      }
    }

    // side subMenu on first load
    this.addClass(this.secondaryNav.current, 'hide');
  }

  /**
   * clear secondary navigation item
   */
  clearSecondaryNavItem() {
    var arrowSelectedSecondaryAnimation = this.arrowSelectedSecondaryAnimation.current;

    this.removeItem(this.secondaryNav.current.querySelectorAll('.secondary-level-1.copied, .more-btn-container .more-content-container a.copied'));
    this.removeItem(this.mobileNavSubMenu.current.querySelectorAll('.menu a.copied'));
    this.removeClass(this.addClass(arrowSelectedSecondaryAnimation, 'hide'), 'isAnimation');
  }

  /**
   * Populate secondary memu items
   * @param {HTMLElement} target
   */
  populateSecondaryNavMobile(target) {
    var indexLevel1 = target.getAttribute('indexLevel1');
    var indexLevel2 = target.getAttribute('indexLevel2');
    var { navMenus } = this.props;
    var datas = navMenus[indexLevel1].subMenu[indexLevel2];
    var subMenu = datas.subMenu;
    if (!subMenu || !subMenu.length) {
      return;
    }

    // create secondary mobile menu
    var mobileNavSubMenuContainer = this.mobileNavSubMenu.current.querySelectorAll('.menu')[0];
    var mobileNavSubMenuIgnoreItem = mobileNavSubMenuContainer.querySelectorAll('a.hide')[0];
    for (var i = 0; i < subMenu.length; i++) {
      var menuLevel1 = subMenu[i];
      var value = menuLevel1.value;

      var mobileNavSubMenuItem = mobileNavSubMenuIgnoreItem.cloneNode(true);
      this.setHTML(this.setAttribute(this.setAttribute(this.setAttribute(this.setAttribute(this.addClass(this.removeClass(this.removeClass(mobileNavSubMenuItem, 'hide'), 'ignore'), 'copied'), 'key', value),'indexLevel1', indexLevel1),'indexLevel2', indexLevel2),'indexLevel3', i), value);
      mobileNavSubMenuContainer.appendChild(mobileNavSubMenuItem);
    }
  }

  /**
   * populate the secondary menu item base on = selected menu level 2 item
   * @param {HTMLElement} target Selected menu level 2 item
   * @param {HTMLElement} directTarget if target doesn't exist, will populate secondary menu item to this element
   */
  populateSecondaryNav(target, directTarget) {
    this.clearSecondaryNavItem();
    this.removeClass(this.mobileNavSubMenu.current, 'isNothing');
    if (!target) {
      if (directTarget) {
        this.populateSecondaryNavMobile(directTarget);
      }
      return;
    }

    var indexLevel1 = target.getAttribute('indexLevel1');
    var indexLevel2 = target.getAttribute('indexLevel2');
    var { navMenus } = this.props;
    var datas = navMenus[indexLevel1].subMenu[indexLevel2];
    var subMenu = datas.subMenu;
    if (!subMenu || !subMenu.length) {
      return;
    }

    // create secondary menu level 1
    var secondaryNavLinkContainer = this.secondaryNavLinkContainer.current;
    var secondaryLevel1 = this.secondaryNav.current.querySelectorAll('.secondary-level-1.hide')[0];
    var moreBtnContainer = this.secondaryNav.current.querySelectorAll('.more-btn-container')[0];
    var moreContentContainer = moreBtnContainer.querySelectorAll('.more-content-container')[0];
    var moreContentIgnoreItem = moreContentContainer.querySelectorAll('a.hide')[0];
    var mobileNavSubMenuContainer = this.mobileNavSubMenu.current.querySelectorAll('.menu')[0];
    var mobileNavSubMenuIgnoreItem = mobileNavSubMenuContainer.querySelectorAll('a.hide')[0];
    for (var i = 0; i < subMenu.length; i++) {
      var menuLevel1 = subMenu[i];
      var value = menuLevel1.value;
      var secondaryLevel1Item = secondaryLevel1.cloneNode(true);
      this.setHTML(this.setAttribute(this.setAttribute(this.setAttribute(this.setAttribute(this.addClass(this.removeClass(this.removeClass(secondaryLevel1Item, 'hide'), 'ignore'), 'copied'), 'key', value),'indexLevel1', indexLevel1),'indexLevel2', indexLevel2),'indexLevel3', i), value);
      secondaryNavLinkContainer.insertBefore(secondaryLevel1Item, moreBtnContainer);

      var moreContentItem = moreContentIgnoreItem.cloneNode(true);
      this.setHTML(this.setAttribute(this.setAttribute(this.addClass(this.removeClass(moreContentItem, 'ignore'), 'copied'), 'key', value),'index', i), value);
      moreContentContainer.appendChild(moreContentItem);

      var mobileNavSubMenuItem = mobileNavSubMenuIgnoreItem.cloneNode(true);
      this.setHTML(this.setAttribute(this.setAttribute(this.setAttribute(this.setAttribute(this.addClass(this.removeClass(this.removeClass(mobileNavSubMenuItem, 'hide'), 'ignore'), 'copied'), 'key', value),'indexLevel1', indexLevel1),'indexLevel2', indexLevel2),'indexLevel3', i), value);
      mobileNavSubMenuContainer.appendChild(mobileNavSubMenuItem);

      if (i === 0) {
        this.forceSecondaryLevel1Click(secondaryLevel1Item);
      }
    }

    this.checkForShrinkMore();
  }

  /**
   * clear secondary navigation mobile item
   */
  clearSecondaryNavMobileItem() {
    var secondaryNavMobile = this.secondaryNavMobile.current;
    this.removeItem(secondaryNavMobile.querySelectorAll('a.copied'));
  }

  /**
   * populate secondary navigation mobile item
   * @param {HTMLElement} target
   */
  polulateSecondaryNavMobile(target) {
    this.clearSecondaryNavMobileItem();
    if (!target) {
      return;
    }

    var indexLevel1 = target.getAttribute('indexLevel1');
    var { navMenus } = this.props;
    var datas = navMenus[indexLevel1];
    var subMenu = datas.subMenu;
    if (!subMenu || !subMenu.length) {
      return;
    }

    // create secondary mobile menu
    var secondaryNavMobile = this.secondaryNavMobile.current;
    var menu = secondaryNavMobile.querySelectorAll('.menu')[0];
    var secondaryLevel1 = menu.querySelectorAll('a.hide')[0];
    for (var i = 0; i < subMenu.length; i++) {
      var menuLevel1 = subMenu[i];
      var value = menuLevel1.value;
      var secondaryLevel1Item = secondaryLevel1.cloneNode(true);
      this.setHTML(this.setAttribute(this.setAttribute(this.setAttribute(this.addClass(this.removeClass(this.removeClass(secondaryLevel1Item, 'hide'), 'ignore'), 'copied'), 'key', value),'indexLevel1', indexLevel1),'indexLevel2', i), value);
      menu.appendChild(secondaryLevel1Item);
    }
  }

  /**
   * logout user
   * @param {click event} event event for logout button click
   */
  logoutButtonClick(event) {
    var target = event.target;
    if (!target || !this.hasClass(target, 'logout-btn')) return;

    var headerNavUi = this.headerNavUi.current;
    this.removeClass(headerNavUi, "isLoggedIn");
    this.removeClass(document.getElementsByClassName('user-info-popup'), "isOpen");
    this.checkForShrinkMore();
  }

  /**
   * Animation for moving arrow to target
   * @param {number} offsetX
   * @param {HTMLElement} arrow
   * @param {HTMLElement} element
   */
  moveArrowTo(offsetX, arrow, element) {
    if (element) {
      var arrowOffset = this.offset(element);
      var arrowoffsetwidth = arrow.offsetWidth;
      if (getComputedStyle(arrow).display == 'none') {
        arrow.style.display = 'block';
        arrowoffsetwidth = arrow.offsetWidth;
        arrow.style.display = 'none';
      }
      var arrowX = offsetX + arrowOffset.left + (element.offsetWidth - arrowoffsetwidth)/2;
      arrow.style.transform = "translateX(" + arrowX + "px)";
    }
  }

  /**
   * Login
   * @param {click event} event
   */
  loginButtonClick(event) {
    var target = event.target;
    if (!target || !this.hasClass(target, 'login-btn')) return;

    var headerNavUi = this.headerNavUi.current;
    this.addClass(headerNavUi, "isLoggedIn");
    this.checkForShrinkMore();
  }


  /**
   * Notifications
   * @param {click event} event
   */
  notificationsButtonClick(event) {
    var target = event.target;
    if (!target || !this.hasClass(target, 'notifi-image')) return;

    if (this.shouldDismissNotification) {
      this.removeClass(this.notificationPanelPopup.current, 'isNotificationsPopupOpen');
      this.addClass(this.notificationPanelEmpty.current, "hide");
      this.addClass(this.notificationPanelFull.current, "hide");
      this.showEmpty = true;
      this.shouldDismissNotification = false;
      return;
    }
    
    if (this.showEmpty) {
      this.addClass(this.notificationPanelPopup.current, 'isNotificationsPopupOpen');
      this.removeClass(this.notificationPanelEmpty.current, "hide");
      this.showEmpty = false;
    } else {
      this.shouldDismissNotification = true;
      this.addClass(this.notificationPanelEmpty.current, "hide");
      this.addClass(this.notificationPanelPopup.current, 'isNotificationsPopupOpen');
      this.removeClass(this.notificationPanelFull.current, "hide");
    }
  }
  
  /**
   * Mobile Notifications
   * @param {click event} event
   */
  notificationsMobileButtonClick(event) {
    var target = event.target;

    if (!target || !this.hasClass(target, 'notification-right-arrow')) return;

    if (!target || !this.hasClass(target, 'notification-mobile')) return;
    
    if (this.showEmptyMobile) {
      this.removeClass(this.notificationPanelEmptyMobile.current, "hide");
      this.showEmptyMobile = false;
    } else {
      this.removeClass(this.notificationPanelFullMobile.current, "hide");
    }
  }

  /**
   * Close Mobile Notifications
   * @param {click event} event
   */
  notificationsMobileBackClick(event) {
    var target = event.target;
    if (!target || !this.hasClass(target, 'notification-back-btn')) return;

    this.addClass(this.notificationPanelEmptyMobile.current, "hide");
    this.addClass(this.notificationPanelFullMobile.current, "hide");
  }

  /**
   * Show popup notifications info
   * @param {click event} event
   */
  notificationsInfoContainerClick(event) {
    var isSelected = false;
    var target = event.target;
    if (!target) {
      return;
    }
    this.iterateElement(document.querySelectorAll('.notifications-panel'), function(el) {
      if (el.contains(target)) {
        isSelected = true;
      }
    });
    if (isSelected) {
      event.preventDefault();
    } else {
      this.clickOutsideToClosePopupNotifications(event);
    }
  }

  /**
   * click outside to hide popup notifications
   * @param {click event} event
   */
  clickOutsideToClosePopupNotifications(event) {
    var notificationPanelPopup = document.querySelectorAll('.header-nav-ui .notification-popup')[0];
    if (!this.isHidden(notificationPanelPopup) && !notificationPanelPopup.contains(event.target)) {
      this.removeClass(notificationPanelPopup, 'isNotificationsPopupOpen');
    }
  }

  /**
   * Switch to BUSSINESS or WORK
   * @param {click event} event
   */

  switchBussinessWork(event) {
    var target = event.target;
    // Detect mouse click target whether the switch button
    if (!target || (!this.hasClass(target, 'switch-to-business-container') && !this.hasClass(target, 'switch-icon') && !this.hasClass(target, 'switch-to-busniness'))) return;

    var primaryNav = this.primaryNav.current;
    var bussinessItem = primaryNav.getElementsByClassName('primary-level-1')[1];
    var bussinessItemVlue = bussinessItem.innerHTML;
    var workItem = primaryNav.getElementsByClassName('primary-level-1')[2];
    var workItemVlue = workItem.innerHTML;
    var iconChooseArrow = document.querySelectorAll('.icon-chosen-arrow')[0];
    var switchText = document.getElementsByClassName('switch-to-busniness')[0].innerHTML;
    var that = this;

    function swtichValue(switchValue, switchItem) {
      // Update the text between 'Switch to BUSINESS' and 'Switch to WORK'
      document.getElementsByClassName('switch-to-busniness').innerHTML = 'Switch to ' + switchValue;
      // show the arrow
      iconChooseArrow.style.display = 'block';
      // Update ui for clicked sublevel 1 item
      that.forceClickToSublevel1(switchItem)
    }

    if (switchText === 'Switch to ' + bussinessItemVlue) {
      swtichValue(workItemVlue, bussinessItem)
    } else if (switchText === 'Switch to ' + workItemVlue) {
      swtichValue(bussinessItemVlue, workItem)
    }

  }

  /**
   * move primary arrow to target
   * @param {number} xOffset
   * @param {HTMLElement} target
   */
  movePrimaryArrowTo(xOffset, target) {
    this.moveArrowTo(xOffset, this.arrowSelectedPrimaryAnimation.current, target);
  }

  /**
   * Update ui for clicked sublevel 1 item
   * @param {HTMLElement} target sublevel 1 item
   */
  forceClickToSublevel1(target) {
    if (!target) {
      return;
    }

    var primaryNav = this.primaryNav.current;

    // After change the navigation, the Switch to text should toggle as well
    if (target.innerHTML === 'BUSINESS') {
      document.getElementsByClassName('switch-to-busniness')[0].innerHTML = 'Switch to WORK'
    } else if (target.innerHTML === 'WORK') {
      document.getElementsByClassName('switch-to-busniness')[0].innerHTML = 'Switch to BUSINESS'
    }

    var menus = this.getPrimaryMenuItems();
    //All items are in initial state here
    var initial = menus.map(menu => this.offset(menu.domNode))

    this.polulateSecondaryNavMobile(target);
    var classKey = target.getAttribute('key');
    this.removeClass(document.getElementsByClassName('primary-level-2-container'), "isOpen");
    this.removeClass(this.removeClass(primaryNav.getElementsByClassName('primary-level-1'), "isOpen"), "isOpenSubmenu");
    this.removeClass(primaryNav.querySelectorAll('.primary-level-2-container a'), "isOpen");

    var subList = document.querySelector(".primary-level-2-container[key="+classKey+"]");
    // var subList = target.nextElementSibling;
    // while (subList && !this.hasClass(subList, 'primary-level-2-container')) {
    //   subList = subList.nextElementSibling;
    // }
    //All items are in initial state here

    this.addClass(subList, "isOpen");
    this.addClass(target, "isOpen");

    //All items are in their final position here
    var final = menus.map(menu => this.offset(menu.domNode))

    this.movePrimaryArrowTo(0, target);

    this.populateSecondaryNav();
    this.checkForShrinkMore();
    this.slideElements(menus, final, initial);
    this.fadeInElement(subList);


    if (classKey !== 'MORE') {
      this.previousSelectElementDesktop = target;
      this.previousLevel2ItemSelectElement = null;
    }

    this.selectingLevel1ClassKey = classKey;

    this.addClass(this.mobileNavSubMenu.current, 'isNothing');
  }

  /**
   * Get all level 1 menu items that are clicked in order to expand submenus
   */
  getPrimaryMenuItems() {
    var ans = []
    var menus = document.querySelectorAll(".primary-level-1:not(.hide)")
    menus.forEach(function(el) {
      if (getComputedStyle(el).display != "none") {
        ans.push({domNode: el})
      }
    })
    return ans;
  }

  /**
   * Slide elements from inital to final position
   * @param {[{domNode: HTMLElement}]} listOfElementsToSlide Output of the function
                                        getPrimaryMenuItems defined in this file
   * @param {offset object} inital Output of the offset defined in this file
   * @param {offset object} final
   */
  slideElements(menus, initial, final) {
    menus.forEach((menu, i) => {
      var element = menu.domNode;
      var initialoffset = Math.floor(final[i].left - initial[i].left);
      if (initialoffset != 0) {
        element.style.transform = "translateX(" + initialoffset + "px)";
        setTimeout(() => {
          element.style.transition = "transform 250ms ease-out";
          element.style.transform = "translateX(0)";
          setTimeout(() => {
            element.style.transition = "";
            element.style.transform = "";
          }, 250)
        }, 0)
      }
    })
  }

  /**
   * set opacity of element to 0 and then fade it in over 500ms
   * @param {HTMLElement} subList
   */
  fadeInElement(element) {
    this.addClass(element, 'opacity-0');
    const that = this;
    setTimeout(() => {
      that.addClass(element, 'fade-opacity-in');
      setTimeout(() => {
        that.removeClass(element, 'fade-opacity-in');
        that.removeClass(element, 'opacity-0');
      }, 500)
    })
  }

  /**
   * submenu level 1 click
   * @param {click event} event
   */
  subLevel1Click(event) {
    var target = event.target;
    if (!target || !this.hasClass(target, 'primary-level-1') || this.hasClass(target, 'login-btn') || this.hasClass(target, 'login-container')) return;

    // make logo margin-right as 50px so menu comes align right
    var logoRef = document.getElementsByClassName('tc-logo');
    if (window.innerWidth > 768) {
      this.iterateElement(logoRef, function(el) {
        el.style.marginRight = "50px";
      });
    }

    // make height of secondaryNav as 0, since top level Menu item is clicked
    this.animateSubLevel2Foldup()
    .then(() => {
      this.secondaryNav.current.style.height = "0px";

      var iconChooseArrow = document.querySelectorAll('.icon-chosen-arrow')[0];
      iconChooseArrow.style.display = 'block';

      this.removeSecondaryNavBackground();
    })
    this.forceClickToSublevel1(target);
    event.preventDefault();
  }

  removeSecondaryNavBackground() {
    this.addClass(this.secondaryNav.current, "hide");
  }

  addSecondaryNavBackground() {
    this.removeClass(this.secondaryNav.current, "hide");
  }

  /**
   * Animate the secondarynavbar element to slide up under the primary navbar element
   */
  animateSubLevel2Foldup() {
    var that = this;
    return new Promise((resolve, reject) => {
      var element = that.secondaryNav.current;
      element.style.transition = "transform 250ms linear";
      element.style.transform = "translateY(-"+ SECONDARY_NAVBAR_HEIGHT + "px)";
      setTimeout(() => {
        element.style.transition = "";
        element.style.transform = "";
        resolve();
     }, 250)
    })
  }

  /**
   * Update ui when click to sub level 2 item
   * @param {HTMLElement} target item sub level 2
   */
  forceClickToSubLevel2(target) {
    if (!target) {
      return;
    }

    var primaryNav = this.primaryNav.current;

    var classKey = target.getAttribute('key');
    this.addClass(primaryNav.querySelectorAll('.primary-level-1.isOpen'), "isOpenSubmenu");
    var visibleMoreItemSelector = ".primary-level-2-container.isOpen .more-btn-container .more-content-container a:not(.hide)[key='" + classKey + "']";
    var visibleMoreItem = primaryNav.querySelectorAll(visibleMoreItemSelector);
    var secondaryNavMobileItemSelector = ".menu a.secondary-mobile-level-2[key='" + classKey + "']";
    var secondaryNavMobile = this.secondaryNavMobile.current;
    var secondaryNavMobileItem = secondaryNavMobile.querySelectorAll(secondaryNavMobileItemSelector);
    this.removeClass(secondaryNavMobile.querySelectorAll('.menu a'), "isOpen");
    this.removeClass(primaryNav.querySelectorAll('.primary-level-2-container a'), "isOpen");
    var primaryLevel2 = primaryNav.querySelectorAll("a.primary-level-2[key='" + classKey + "']")[0];
    this.addClass(primaryLevel2, "isOpen");
    this.addClass(visibleMoreItem, "isOpen");
    this.addClass(secondaryNavMobileItem, "isOpen");
    this.mobileNavSubMenu.current.querySelectorAll('.header .name')[0].innerHTML = classKey;

    this.populateSecondaryNav(primaryLevel2, target);
    this.adjustSelectionPrimaryNavPosition(true);
    this.adjustSelectionSecondaryNavPosition(false);

    if (this.selectingLevel1ClassKey !== 'MORE') {
      this.previousLevel2ItemSelectElement = target;
    }
  }

  closeMorePopup() {
    const that = this;
    this.iterateElement(document.querySelectorAll('.more-content-container'), function(moreContentItem) {
      that.removeClass(moreContentItem.parentNode, 'isOpen');
    });
  }

  /**
   * event for sub level 2 more item click
   * @param {click event} event
   */
  subLevel2MoreClick(event) {
    var target = event.target;
    if (!target || !this.hasClass(target, 'primary-level-2-more')) return;
    this.addSecondaryNavBackground();
    this.closeMorePopup();
    this.forceClickToSubLevel2(target);
    event.preventDefault();
  }

  /**
   * event for sub level 2 item click
   * @param {click event} event
   */
  subLevel2Click(event) {
    var target = event.target;
    if (!target || !(this.hasClass(target, 'primary-level-2') || this.hasClass(target, 'primary-level-2-more'))) return;

    // make height of subMenu to 60px
    this.secondaryNav.current.style.height = SECONDARY_NAVBAR_HEIGHT+"px";

    var animateDropdown = this.hasClass(this.secondaryNav.current, 'hide');
    this.addSecondaryNavBackground();
    this.forceClickToSubLevel2(target);
    if (animateDropdown) {
      this.animateSubLevel2Drop();
    }
    event.preventDefault();
  }

  /**
   * Animate the secondary navbar to slid down when shown
   */
  animateSubLevel2Drop() {
    var element = this.secondaryNav.current;
    element.style.transform = "translateY(-" + SECONDARY_NAVBAR_HEIGHT + "px)";
    setTimeout(() => {
      element.style.transition = "transform 250ms linear";
      element.style.transform = "translateY(0)";
      setTimeout(() => {
        element.style.transition = "";
        element.style.transform = "";
      }, 250)
    }, 0)
  }

  /**
   * event for sub level 2 mobile item click
   * @param {click event} event
   */
  subLevel2MobileClick(event) {
    var target = event.target;
    if (!target || !this.hasClass(target, 'secondary-mobile-level-2')) return;

    var headerNavUi = this.headerNavUi.current;
    this.addSecondaryNavBackground();
    this.forceClickToSubLevel2(target);
    event.preventDefault();

    this.removeClass(headerNavUi, 'isOpenSecondaryNavMobile');
  }

  /**
   * move secondary arrow to target
   * @param {number} xOffset
   * @param {HTMLElement} target
   */
  moveSecondaryArrowTo(xOffset, target) {
    var secondaryNavLinkContainer = this.secondaryNavLinkContainer.current;
    var arrowSelectedSecondaryAnimation = this.arrowSelectedSecondaryAnimation.current;
    var arrowOffset = this.offset(secondaryNavLinkContainer);
    this.moveArrowTo(-arrowOffset.left + xOffset, arrowSelectedSecondaryAnimation, target);
  }

  /**
   * Update ui when secondary level 1 item click
   * @param {HTMLElement} target secondary level 1 item
   */
  forceSecondaryLevel1Click(target) {
    if (!target) {
      return;
    }

    this.removeClass(this.secondaryNavLinkContainer.current.getElementsByClassName('secondary-level-1'), "isOpen");
    this.removeClass(this.secondaryNavLinkContainer.current.getElementsByClassName('secondary-level-1-more'), "isOpen");
    this.removeClass(this.mobileNavSubMenu.current.querySelectorAll('.menu a'), "isOpen");
    var classKey = target.getAttribute('key');

    var secondaryLevel1Selector = "a.secondary-level-1[key='" + classKey + "']";
    var secondaryLevel1 = this.secondaryNavLinkContainer.current.querySelectorAll(secondaryLevel1Selector);
    var secondaryLevel1MoreSelector = "a.secondary-level-1-more[key='" + classKey + "']";
    var secondaryLevel1More = this.secondaryNavLinkContainer.current.querySelectorAll(secondaryLevel1MoreSelector);
    var mobileNavSubMenuItemSelector = ".menu a[key='" + classKey + "']";
    var mobileNavSubMenuItem = this.mobileNavSubMenu.current.querySelectorAll(mobileNavSubMenuItemSelector);

    this.addClass(secondaryLevel1, 'isOpen');
    this.addClass(secondaryLevel1More, 'isOpen');
    this.addClass(mobileNavSubMenuItem, 'isOpen');

    var headerNavUi = this.headerNavUi.current;
    var secondaryNav = headerNavUi.querySelectorAll('.secondary-nav')[0];
    this.removeClass(secondaryNav, 'hide');

    this.removeClass(this.arrowSelectedSecondaryAnimation.current, 'hide');
    this.adjustSelectionSecondaryNavPosition(true);
  }

  /**
   * secondary level 1 more item click
   * @param {click event} event
   */
  secondaryLevel1MoreClick(event) {
    var target = event.target;
    if (!target || !this.hasClass(target, 'secondary-level-1-more')) return;
    this.addSecondaryNavBackground();
    this.closeMorePopup();
    this.forceSecondaryLevel1Click(target);
    event.preventDefault();
  }

  /**
   * secondary level 1 item click
   * @param {click event} event
   */
  secondaryLevel1Click(event) {
    var target = event.target;
    if (!target || !this.hasClass(target, 'secondary-level-1') ) return;

    // make height of subMenu to 60px
    target.parentNode.parentNode.style.height = "60px";

    this.addSecondaryNavBackground();
    this.forceSecondaryLevel1Click(target);

    event.preventDefault();
  }

  /**
   * nav sub menu item click
   * @param {click event} event
   */
  mobileNavSubMenuItemClick(event) {
    var target = event.target;
    if (!target || !this.hasClass(target, 'mobile-nav-sub-menu-item') ) return;

    this.addSecondaryNavBackground();
    this.removeClass(this.mobileNavSubMenu.current, 'isOpen');
    this.forceSecondaryLevel1Click(target);

    event.preventDefault();
  }

  /**
   * Show popup user info
   * @param {click event} event
   */
  userInfoContainerClick(event) {
    var isSelected = false;
    var target = event.target;
    if (!target) {
      return;
    }
    this.iterateElement(document.querySelectorAll('.user-info-container, .user-info-popup-mobile .icon-close'), function(el) {
      if (el.contains(target)) {
        isSelected = true;
      }
    });
    if (isSelected) {
      this.toggleClass(document.getElementsByClassName('user-info-popup'), "isOpen");
      this.toggleClass(document.querySelectorAll('.user-info-container'), "isUserPopupOpen");
      event.preventDefault();
    } else {
      this.clickOutsideToClosePopupProfile(event);
    }
  }

  /**
   * click outside to hide popup user info
   * @param {click event} event
   */
  clickOutsideToClosePopupProfile(event) {
    var userInfoPopup = document.querySelectorAll('.header-nav-ui .primary-nav .user-info-popup')[0];
    if (!this.isHidden(userInfoPopup) && !userInfoPopup.contains(event.target)) {
      this.removeClass(userInfoPopup, 'isOpen');
      this.removeClass(document.querySelectorAll('.user-info-container'), "isUserPopupOpen");
    }
  }

  /**
   * more button click
   * @param {click event} event
   */
  moreButtonClick(event) {
    var moreBtnClicked = null;
    var target = event.target;
    var that = this;
    var headerNavUi = this.headerNavUi.current;
    if (!target) {
      return;
    }
    this.iterateElement(document.querySelectorAll('.more-btn'), function(el) {
      if (el.contains(target)) {
        moreBtnClicked = el;
      }
    });
    if (moreBtnClicked) {
      event.preventDefault();
      var isOpen = this.hasClass(moreBtnClicked.parentNode, "isOpen");
      this.iterateElement(headerNavUi.querySelectorAll('.more-btn'), function(el2){
        that.removeClass(el2.parentNode, "isOpen");
      });
      if (isOpen) {
        this.removeClass(moreBtnClicked.parentNode, "isOpen");
      } else {
        this.addClass(moreBtnClicked.parentNode, "isOpen");
        var moreContentContainer= moreBtnClicked.parentNode.getElementsByClassName('more-content-container')[0];
        var moreContentContainerOffset = this.offset(moreContentContainer);
        var rightExpandX =  window.innerWidth - (moreContentContainerOffset.left + moreContentContainer.offsetWidth);

        if (rightExpandX < 0) {
          moreContentContainer.style.marginLeft = (rightExpandX + "px");
        } else {
          moreContentContainer.style.marginLeft = "0";
        }
      }
    } else {
      this.clickOutsideToClosePopupMore(event);
    }
  }

  /**
   * click outside to hide more popup
   * @param {click event} event
   */
  clickOutsideToClosePopupMore(event) {
    var that = this;
    this.iterateElement(document.querySelectorAll('.more-content-container'), function(userInfoPopup) {
      if (!that.isHidden(userInfoPopup) && !userInfoPopup.contains(event.target)) {
        that.removeClass(userInfoPopup.parentNode, 'isOpen');
      }
    });
  }

  /**
   * dont play secondary nav animation
   */
  ignoreSelectionSecondaryNavAnimation() {
    this.removeClass(this.arrowSelectedSecondaryAnimation.current, 'isAnimation');
    const that = this;
    setTimeout(function () {
      that.addClass(that.arrowSelectedSecondaryAnimation.current, 'isAnimation');
    }, 100);
  }

  /**
   * move secondary arrow animation
   * @param {boolean} withAnimation
   */
  adjustSelectionSecondaryNavPosition(withAnimation) {
    if (withAnimation) {
      this.addClass(this.arrowSelectedSecondaryAnimation.current, 'isAnimation');
    } else {
      this.ignoreSelectionSecondaryNavAnimation();
    }
    var moreContainer = this.secondaryNavLinkContainer.current.getElementsByClassName('more-btn-container')[0];
    var secondaryLevel1IsOpen = this.secondaryNavLinkContainer.current.querySelectorAll('.secondary-level-1.isOpen');
    if (secondaryLevel1IsOpen.length > 0) {
      secondaryLevel1IsOpen = secondaryLevel1IsOpen[0];
      if (this.hasClass(secondaryLevel1IsOpen, 'hide')) {
        this.ignoreSelectionSecondaryNavAnimation();
        this.moveSecondaryArrowTo(-5, moreContainer);
      } else {
        this.moveSecondaryArrowTo(0, secondaryLevel1IsOpen);
      }
    }
  }

  /**
   * dont play primary nav animation
   */
  ignoreSelectionPrimaryNavAnimation() {
    this.removeClass(this.arrowSelectedPrimaryAnimation.current, 'isAnimation');
    const that = this;
    setTimeout(function () {
      that.addClass(that.arrowSelectedPrimaryAnimation.current, 'isAnimation');
    }, 10);
  }

  /**
   * move primary arrow animation
   * @param {boolean} withAnimation
   */
  adjustSelectionPrimaryNavPosition(withAnimation) {

    var primaryNav = this.primaryNav.current;

    if (withAnimation) {
      this.addClass(this.arrowSelectedPrimaryAnimation.current, 'isAnimation');
    } else {
      this.ignoreSelectionPrimaryNavAnimation();
    }
    var primaryLevel2Container = primaryNav.querySelectorAll('.primary-level-2-container.isOpen');
    var primaryLevel1IsOpen = primaryNav.querySelectorAll('.primary-level-1.isOpen');
    if (primaryLevel2Container.length === 0 || this.isHidden(primaryLevel2Container[0])) {
      this.movePrimaryArrowTo(0, primaryLevel1IsOpen[0]);
      return;
    }

    var primaryLinkContainer = primaryLevel2Container[0];
    var moreContainer = primaryLinkContainer.getElementsByClassName('more-btn-container')[0];
    var primaryLevel2IsOpen = primaryLinkContainer.querySelectorAll('.primary-level-2.isOpen');
    if (primaryLevel2IsOpen.length > 0) {
      primaryLevel2IsOpen = primaryLevel2IsOpen[0];
      if (this.hasClass(primaryLevel2IsOpen, 'hide')) {
        this.ignoreSelectionPrimaryNavAnimation();
        this.movePrimaryArrowTo(-5, moreContainer);
      } else {
        this.movePrimaryArrowTo(0, primaryLevel2IsOpen);
      }
    } else if (primaryLevel1IsOpen.length > 0) {
      this.movePrimaryArrowTo(0, primaryLevel1IsOpen[0]);
    }
  }

  /**
   * check to shrink menu if it too long
   * @param {HTMLElement} el
   * @param {string} linkClass
   */
  checkToShrinkElement(el, linkClass) {
    if (!el) {
      return;
    }
    var nextElement = el.nextElementSibling;
    while (nextElement && this.isHidden(nextElement)) {
      nextElement = nextElement.nextElementSibling;
    }
    var distance = this.getDistance(el, nextElement);
    var children = this.getTheClosestChild(el);
    var isChange = false;

    while (distance < this.spaceForShrinkMore) {
      var i = children.length - 1;
      for (; i >= 0; i--) {
        var primaryLevel2 = children[i];
        if (this.hasClass(primaryLevel2, linkClass) && !this.hasClass(primaryLevel2, 'hide') && !this.hasClass(primaryLevel2, 'icon-select') && !this.hasClass(primaryLevel2, 'ignore')) {
          this.addClass(primaryLevel2, 'hide');
          var moreContainer = el.getElementsByClassName('more-btn-container')[0];
          this.removeClass(moreContainer, 'hide');
          var classKey = primaryLevel2.getAttribute('key');
          var moreContentItem = this.removeClass(moreContainer.querySelectorAll(".more-content-container a[key='" + classKey + "']"), 'hide');
          if (this.hasClass(primaryLevel2, 'isOpen')) {
            this.addClass(moreContentItem, 'isOpen');
          }
          isChange = true;
          break;
        }
      }
      if (i >= 0) {
        distance = this.getDistance(el, nextElement);
      } else {
        break;
      }
    }

    if (isChange) {
      if (linkClass === 'secondary-level-1') {
        this.adjustSelectionSecondaryNavPosition(true);
      } else {
        this.adjustSelectionPrimaryNavPosition(true);
      }
    }
  }

  /**
   * check to expand menu if it have enough space
   * @param {HTMLElement} el
   * @param {string} linkClass
   */
  expandElement(el, linkClass) {
    var children = this.getTheClosestChild(el);
    var moreContainer = el.getElementsByClassName('more-btn-container')[0];
    var i = children.length - 1;
    var isChange = false;
    for (var i = 0; i < children.length; i++) {
      var primaryLevel2 = children[i];
      if (this.hasClass(primaryLevel2, linkClass) && this.hasClass(primaryLevel2, 'hide') && !this.hasClass(primaryLevel2, 'ignore')) {
        this.removeClass(primaryLevel2, 'hide');
        var classKey = primaryLevel2.getAttribute('key');
        this.removeClass(this.addClass(moreContainer.querySelectorAll(".more-content-container a[key='" + classKey + "']"), 'hide'), 'isOpen');
        isChange = true;
      }
    }

    if (isChange) {
      if (linkClass === 'secondary-level-1') {
        this.adjustSelectionSecondaryNavPosition(true);
      } else {
        this.adjustSelectionPrimaryNavPosition(true);
      }
    }

    var activeElementInMore = moreContainer.querySelectorAll(".more-content-container a:not(.hide)");
    if (activeElementInMore.length === 0) {
      this.removeClass(this.addClass(moreContainer, 'hide'), 'isOpen');
    }
  }
  /**
   * check to shrink/expand menu when window change size
   */
  checkForShrinkMore() {
    const that = this;
    var primaryNav = this.primaryNav.current;
    var headerNavUi = this.headerNavUi.current;
    var w = window.innerWidth;
    var iconChooseArrow = document.querySelectorAll('.icon-chosen-arrow')[0];
    var mobileMoreMenu = document.getElementsByClassName('more-menu');
    var primaryNavBusinessMenu = primaryNav.getElementsByClassName('primary-level-1')[1]
    var primaryNavWorkMenu = primaryNav.getElementsByClassName('primary-level-1')[2]
    var logoRef = document.getElementsByClassName('tc-logo');
    if (w <= 768 ) {
      // if mobile to desktop, if MORE navigation is selected, we need remove the arrow and fix the logo position
        if (this.hasClass(mobileMoreMenu, 'isOpen')){
          iconChooseArrow.style.display = 'block';
        }
        // always set middle logo center
        this.iterateElement(logoRef, function(el) {
          el.style.marginRight = "0";
        });

      if (w !== this.previousScreenWidth) {
        this.adjustSelectionPrimaryNavPosition(false);
      }
      this.previousScreenWidth = w;
      return;
    } else {

      this.removeClass(headerNavUi, 'isOpenSecondaryNavMobile');
      this.removeClass(this.mobileNavSubMenu.current, 'isOpen');

        // if mobile to desktop, if MORE navigation is selected, we need remove the arrow and fix the logo position
        if (this.hasClass(mobileMoreMenu, 'isOpen')){
          iconChooseArrow.style.display = 'none';
        }
        // desktop view if check the primary navigation item selected state during resize window
        if (this.hasClass(primaryNavBusinessMenu, 'isOpen') ||　this.hasClass(primaryNavWorkMenu, 'isOpen') ) {
          this.iterateElement(logoRef, function(el) {
            el.style.marginRight = "50px";
          });
        } else {
          this.iterateElement(logoRef, function(el) {
            el.style.marginRight = "auto";
          });
        }
    }
    this.iterateElement(document.getElementsByClassName('primary-level-2-container'), function(el) {
      if (that.hasClass(el, 'isOpen')) {
        var nextElement = el.nextElementSibling;
        while (nextElement && that.isHidden(nextElement)) {
          nextElement = nextElement.nextElementSibling;
        }
        var distance = that.getDistance(el, nextElement);
        if (distance < that.spaceForShrinkMore) {
          that.checkToShrinkElement(el, 'primary-level-2');
        } else {
          that.expandElement(el, 'primary-level-2');
          that.checkToShrinkElement(el, 'primary-level-2');
        }
        if ((that.previousScreenWidth - 900) * (w - 900) <= 0) {
          that.adjustSelectionPrimaryNavPosition(false);
        }
      }
    });
    this.iterateElement(this.secondaryNavLinkContainer.current, function(el) {
      var distance = that.getDistance(el, el.nextElementSibling);
      if (distance < that.spaceForShrinkMore) {
        that.checkToShrinkElement(el, 'secondary-level-1');
      } else {
        that.expandElement(el, 'secondary-level-1');
        that.checkToShrinkElement(el, 'secondary-level-1');
      }
      if ((that.previousScreenWidth - 900) * (w - 900) <= 0) {
        that.adjustSelectionSecondaryNavPosition(false);
      }
    });
    this.previousScreenWidth = w;
  }
  
  /**
   * resize the navigation menu (if needed) when hovering avatar
   * @param {click event} event
   */
  avatarHover(event) {
    var target = event.target;
    if (!(target && (this.hasClass(target, 'login-container') || this.hasClass(target, 'user-info-container') || this.hasClass(target, 'avatar')
      || this.hasClass(target, 'handle-container') || this.hasClass(target, 'handle') || this.hasClass(target, 'drowdown-icon')))) return;

    this.checkForShrinkMore();
    this.adjustSelectionPrimaryNavPosition(true);
    this.adjustSelectionSecondaryNavPosition(true);
  }

  /**
    * On Home Icon click
    * @param {click event} event
    */
  homeClick(event) {
    var target = event.target;
    if (!target || !this.hasClass(target, 'tc-logo')) return;
    
    var primaryNav = this.primaryNav.current;
  
    // make logo margin-right as 50px so menu comes align right
    var logoRef = document.getElementsByClassName('tc-logo');
    this.iterateElement(logoRef, function(el) {
      el.style.marginRight = "auto";
    });
  
    // make height of secondaryNav as 0, since top level Menu item is clicked
    var secondaryNav = document.querySelectorAll('.secondary-nav')[0];
    secondaryNav.style.height = "0px";
  
    var iconChooseArrow = document.querySelectorAll('.icon-chosen-arrow')[0];
    iconChooseArrow.style.display = 'none';
  
    // remove isOpen from opened Menu
    this.removeClass(document.getElementsByClassName('primary-level-2-container'), "isOpen");
    var headerNavUi = document.querySelectorAll('.header-nav-ui')[0];
    var primaryNav = headerNavUi.querySelectorAll('.primary-nav')[0];
    this.removeClass(this.removeClass(primaryNav.getElementsByClassName('primary-level-1'), "isOpen"), "isOpenSubmenu");
    this.removeClass(primaryNav.querySelectorAll('.primary-level-2-container a'), "isOpen");
  
    var secondaryNav = headerNavUi.querySelectorAll('.secondary-nav')[0];
    this.addClass(secondaryNav, 'hide');
  
    event.preventDefault();
  }

  render() {
    const { theme } = this.props;

    return (
      <div className={'theme-wrapper theme-' + theme}>
        <div ref={this.headerNavUi} className="header-nav-ui flex column">
          <div className="mobile-nav flex row space-between middle">
            <div className="left-menu-container flex middle center">
              <a className="menu-btn flex middle center" href="javascript:;">
                <img src={IconMenu} width="20" alt="menu" />
              </a>
              <a className="close-btn flex middle center" href="javascript:;">
                <img src={IconClose} alt="close" />
              </a>
            </div>
            <img src={TCLogo} className="tc-logo" alt="logo" />
            <a href="javascript:;" className="flex row">
              <span className="login-btn">LOGIN</span>
              <div className="flex row login-container user-info-container">
                <div className="avatar-container">
                  <img src={VicTorAvatar} className="avatar" alt="avatar" />
                </div>
                <span className="drowdown-icon flex center middle">
                  <img src={ArrowSmallDown} className="dropdown-icon" alt="dropdown icon" />
                </span>
              </div>
            </a>
          </div>
          <div ref={this.mobileNavSubMenu} className="mobile-nav-sub-menu isOpenBK isNothing">
            <div className="mask wrap-all"></div>
            <a href="javascript:;" className="header flex row center middle">
              <span className="name">Solutions</span>
              <span className="drowdown-icon-container flex center middle">
                <img src={ArrowSmallDown} className="dropdown-icon" alt="dropdown icon" />
              </span>
            </a>
            <div className="menu flex column">
              <a className="isOpenBK hide ignore mobile-nav-sub-menu-item" href="javascript:;">All Solutions</a>
            </div>
          </div>
          <div ref={this.notificationPanelEmptyMobile} className="mobile-notifications-panel hide">
            <div className="noti-header flex-grid">
              <a href="javascript:;" className="notification-back-btn desktop-hide mobile-show"></a>
              <span className="left-noti">Notifications</span>
              <div className="rights desktop-show mobile-hide">
                <span className="point"></span>
                <a href="javascript:;" className="white-link">Settings</a>
              </div>
              <a href="javascript:;" className="btn-setting desktop-hide mobile-show"></a>
            </div>
            {/* end .noti-header */}
            <div className="noti-body center">
              <i className="icons icon-bell"></i>
              <h4 className="titles">Good job! You’re all caught up</h4>
              <p className="txt">
                Join challenges and check your notification settings if 
                you don’t receive notifications. We’re actively adding 
                new notifications. Read our <a href="javascript:;" className="blue-link">blog post</a>  for more info
              </p>
            </div>
            {/* end .noti-body */}
            <div className="noti-footer">
              <a href="javascript:;" className="btn btn-blue">Notification Settings</a>
            </div>
            {/* end .noti-footer */}
          </div>
          {/* end .mobile-notifications-panel */}
          <div ref={this.notificationPanelFullMobile} className="mobile-notifications-panel hide">
            <div className="noti-header flex-grid">
              <a href="javascript:;" className="notification-back-btn desktop-hide mobile-show"></a>
              <span className="left-noti">Notifications</span>
              <div className="rights desktop-show mobile-hide">
                <a href="javascript:;" className="white-link">Dismiss All</a>
                <span className="point"></span>
                <a href="javascript:;" className="white-link">Settings</a>
              </div>
              <a href="javascript:;" className="btn-setting desktop-hide mobile-show"></a>
            </div>
            {/* end .noti-header */}
            <div className="noti-body ">
              <div className="light-bar">
                New
                <a href="javascript:;" className="green-link desktop-hide mobile-show">Dismiss All</a>
              </div>
              <div className="lightblue-section">
                <div className="items">
                  <div className="item-content have-remove">
                    <p className="txt">
                      Northumbrian Water (NWL) - Customer Engagement 
                      Gamification Mobile App Design Concepts Challenge is now 
                      open for registrations
                    </p>
                    <div className="bottom-info">
                      <span className="blue-squre">Concept Design</span>
                      <span className="time-txt">2h ago</span>
                    </div>
                    {/* end .bottom-info */}
                    <div className="right-remove">
                      <a href="javascript:;" className="btn-close"></a>
                      <span className="black-txt">Dismiss notification</span>
                    </div>
                    {/* end .right-remove */}
                  </div>
                </div>
                {/* end .items */}
                <div className="items">
                  <div className="item-content">
                    <p className="txt">
                      Eniatus Bank Internal Product Dashboard Design Challenge is 
                      now open for registrations
                    </p>
                    <div className="bottom-info">
                      <span className="blue-squre">Application Front-End Design</span>
                      <span className="time-txt">2h ago</span>
                    </div>
                    <div className="right-remove">
                      <a href="javascript:;" className="btn-close"></a>
                      <span className="black-txt">Dismiss notification</span>
                    </div>
                    {/* end .right-remove */}
                  </div>
                </div>
                {/* end .items */}
              </div>
              {/* end .lightblue-section */}
              <div className="greybar-section">
                <div className="grey-bar flex-grid">
                  <div className="copyicon-title">
                    Topcoder Copilot Recruitment Challenge (3)
                  </div>
                  <div className="right-remove">
                    <a href="javascript:;" className="btn-close"></a>
                    <span className="black-txt">Dismiss notification</span>
                  </div>
                  {/* end .right-remove */}
                </div>
                {/* end .grey-bar */}
                <div className="items">
                  <div className="item-content">
                    <p className="txt">
                      Your submission ID513A23433-1 is now in review
                    </p>
                    <div className="bottom-info">
                      <span className="time-txt">10min ago</span>
                    </div>
                    <div className="right-remove">
                      <a href="javascript:;" className="btn-close"></a>
                      <span className="black-txt">Dismiss notification</span>
                    </div>
                    {/* end .right-remove */}
                  </div>
                </div>
                {/* end .items */}
                <div className="items">
                  <div className="item-content">
                    <p className="txt">
                      Your submission ID513A23433-1 was processed successfully
                    </p>
                    <div className="bottom-info">
                      <span className="time-txt">2h ago</span>
                    </div>
                    <div className="right-remove">
                      <a href="javascript:;" className="btn-close"></a>
                      <span className="black-txt">Dismiss notification</span>
                    </div>
                    {/* end .right-remove */}
                  </div>
                </div>
                {/* end .items */}
                <div className="items">
                  <div className="item-content">
                    <p className="txt">
                      Your submission ID513A23433-2 was uploaded successfully
                    </p>
                    <div className="bottom-info">
                      <span className="time-txt">2h ago</span>
                    </div>
                    <div className="right-remove">
                      <a href="javascript:;" className="btn-close"></a>
                      <span className="black-txt">Dismiss notification</span>
                    </div>
                    {/* end .right-remove */}
                  </div>
                </div>
                {/* end .items */}
              </div>
              {/* end .greybar-section */}
              
              <div className="greybar-section">
                <div className="grey-bar flex-grid">
                  <div className="copyicon-title">
                    TOSCA Editor - Web Application Wireframe Challenge (1)
                  </div>
                  <div className="right-remove mobile-hide">
                    <a href="javascript:;" className="btn-close"></a>
                    <span className="black-txt">Dismiss notification</span>
                  </div>
                  {/* end .right-remove */}
                </div>
                {/* end .grey-bar */}
                <div className="items">
                  <div className="item-content">
                    <p className="txt">
                      Challenge is now in Review phase. No new submissions are accepted at this point.
                    </p>
                    <div className="bottom-info">
                      <span className="time-txt">1h ago</span>
                    </div>
                    <div className="right-remove">
                      <a href="javascript:;" className="btn-close"></a>
                      <span className="black-txt">Dismiss notification</span>
                    </div>
                    {/* end .right-remove */}
                  </div>
                </div>
                {/* end .items */}
              </div>
              {/* end .greybar-section */}
              <div className="light-bar">
                Earlier
                <a href="javascript:;" className="green-link desktop-hide mobile-show">Dismiss All</a>
              </div>
              <div className="lightblue-section">
                <div className="items">
                  <div className="item-content have-remove">
                    <p className="txt">
                      Northumbrian Water (NWL) - Customer Engagement Gamification 
                      Mobile App Design Concepts Challenge is now open for 
                      registrations
                    </p>
                    <div className="bottom-info">
                      <span className="blue-squre">Concept Design</span>
                      <span className="time-txt">Apr 5</span>
                    </div>
                    <div className="right-remove">
                      <a href="javascript:;" className="btn-close"></a>
                      <span className="black-txt">Dismiss notification</span>
                    </div>
                    {/* end .right-remove */}
                  </div>
                </div>
                {/* end .items */}
                <div className="items">
                  <div className="item-content">
                    <p className="txt">
                      FAST 48Hr! Patient Concierge Chatbot Web Application UX 
                      Testing Challenge is now open for registrations
                    </p>
                    <div className="bottom-info">
                      <span className="blue-squre">Rapid UX</span>
                      <span className="time-txt">April 1 at 10:43am</span>
                    </div>
                    <div className="right-remove">
                      <a href="javascript:;" className="btn-close"></a>
                      <span className="black-txt">Dismiss notification</span>
                    </div>
                    {/* end .right-remove */}
                  </div>
                </div>
                {/* end .items */}
                <div className="items">
                  <div className="item-content">
                    <p className="txt">
                      Juno Claims Reporting Tool iOS Mobile Design Application is 
                      now open for registrations
                    </p>
                    <div className="bottom-info">
                      <span className="blue-squre">Application Front-End Design</span>
                      <span className="time-txt">March 28 at 3:45pm</span>
                    </div>
                    <div className="right-remove">
                      <a href="javascript:;" className="btn-close"></a>
                      <span className="black-txt">Dismiss notification</span>
                    </div>
                    {/* end .right-remove */}
                  </div>
                </div>
                {/* end .items */}
              </div>
              {/* end .lightblue-section */}
              <div className="greybar-section">
                <div className="grey-bar flex-grid">
                  <div className="copyicon-title">
                    Topcoder Copilot Recruitment Challenge (2)
                  </div>
                  <div className="right-remove">
                    <a href="javascript:;" className="btn-close"></a>
                    <span className="black-txt">Dismiss notification</span>
                  </div>
                  {/* end .right-remove */}
                </div>
                {/* end .grey-bar */}
                <div className="items">
                  <div className="item-content">
                    <p className="txt">
                      Your submission ID513A23433-1 was uploaded successfully
                    </p>
                    <div className="bottom-info">
                      <span className="time-txt">April 10 at 10:52am</span>
                    </div>
                    <div className="right-remove">
                      <a href="javascript:;" className="btn-close"></a>
                      <span className="black-txt">Dismiss notification</span>
                    </div>
                    {/* end .right-remove */}
                  </div>
                </div>
                {/* end .items */}
                <div className="items">
                  <div className="item-content">
                    <p className="txt">
                      You are now registered for Topcoder Copilot Recruitment Challenge
                    </p>
                    <div className="bottom-info">
                      <span className="time-txt">April 8 at 12:45am</span>
                    </div>
                    <div className="right-remove">
                      <a href="javascript:;" className="btn-close"></a>
                      <span className="black-txt">Dismiss notification</span>
                    </div>
                    {/* end .right-remove */}
                  </div>
                </div>
                {/* end .items */}
              </div>
              {/* end .greybar-section */}
              <div className="end-message center">
                You have no more notifications
              </div>
            </div>
            {/* end .noti-body */}
          </div>
          {/* end .mobile-notifications-panel */}
          <div ref={this.primaryNav} className="primary-nav flex row middle">
            <img src={TCLogo} className="tc-logo" alt="logo" onClick={this.homeClick} />
            <span className="primary-level-1-separator hide ignore"></span>
            <a className="primary-level-1 isOpenBK hide ignore" href="javascript:;" >BUSINESS</a>
            <div className="primary-level-2-container flex row isOpenBK hide">
              <a className="primary-level-2 hide ignore" href="javascript:;">Solutions</a>
              <div className="more-btn-container relative hide">
                <a href="javascript:;" className="more-btn flex row middle center relative primary-level-2">
                  <div className="mask wrap-all"></div>
                  <span>More</span>
                  <img src={ArrowSmallDown} className="dropdown-icon" alt="dropdown icon" />
                </a>
                <div className="more-content-container flex column">
                  <a href="javascript:;" className="hide ignore primary-level-2-more">Solutions</a>
                </div>
              </div>
            </div>
            <a className="primary-level-1 login-btn" href="javascript:;">LOGIN</a>
            <div className="primary-level-1 login-container flex row middle">
              <div ref={this.notificationPanelPopup} className="notification-popup">
                <div className="no-notification hide">
                  <a className="notification-icon" href="javascript:;">
                    <img src={IconBell} alt="notification" />
                  </a>
                </div>
                <div className="new-notification">
                  <a className="notification-icon" href="javascript:;">
                    <img src={IconBell} className="notifi-image" alt="notification" />
                  </a>
                </div>
                <div className="all-seen-notification hide">
                  <a className="notification-icon" href="javascript:;">
                    <img src={IconBell} className="notifi-image" alt="notification" />
                  </a>
                </div>
                <div className="dropdown-notification hide">
                  <a className="notification-icon" href="javascript:;">
                    <img src={IconBell} className="notifi-image" alt="notification" />
                  </a>
                </div>
                <div ref={this.notificationPanelEmpty} className="notifications-panel hide">
                  <div className="noti-header flex-grid">
                    <span className="left-noti">Notifications</span>
                    <div className="rights">
                      <a href="javascript:;" className="white-link">Settings</a>
                    </div>
                  </div>
                  {/* end .noti-header */}
                  <div className="noti-body center">
                    <i className="icons icon-bell"></i>
                    <h4 className="titles">Good job! You’re all caught up</h4>
                    <p className="txt">
                      Join challenges and check your notification settings if 
                      you don’t receive notifications. We’re actively adding 
                      new notifications. Read our <a href="javascript:;" className="blue-link">blog post</a>  for more info
                    </p>
                  </div>
                  {/* end .noti-body */}
                  <div className="noti-footer">
                    <a href="javascript:;" className="btn btn-blue">Notification Settings</a>
                  </div>
                  {/* end .noti-footer */}
                </div>
                {/* end .notifications-panel */}
              
                <div ref={this.notificationPanelFull} className="notifications-panel hide">
                  <div className="noti-header flex-grid">
                    <span className="left-noti">Notifications</span>
                    <div className="rights desktop-show mobile-hide">
                      <a href="javascript:;" className="white-link">Dismiss All</a>
                      <span className="point"></span>
                      <a href="javascript:;" className="white-link">Settings</a>
                    </div>
                    <a href="javascript:;" className="btn-setting desktop-hide mobile-show"></a>
                  </div>
                  {/* end .noti-header */}
                  <div className="noti-body ">
                    <div className="light-bar">
                      New
                      <a href="javascript:;" className="green-link desktop-hide mobile-show">Dismiss All</a>
                    </div>
                    <div className="lightblue-section">
                      <div className="items">
                        <div className="item-content have-remove">
                          <p className="txt">
                            Northumbrian Water (NWL) - Customer Engagement 
                            Gamification Mobile App Design Concepts Challenge is now 
                            open for registrations
                          </p>
                          <div className="bottom-info">
                            <span className="blue-squre">Concept Design</span>
                            <span className="time-txt">2h ago</span>
                          </div>
                          {/* end .bottom-info */}
                          <div className="right-remove mobile-hide">
                            <a href="javascript:;" className="btn-close"></a>
                            <span className="black-txt">Dismiss notification</span>
                          </div>
                          {/* end .right-remove */}
                        </div>
                      </div>
                      {/* end .items */}
                      <div className="items">
                        <div className="item-content">
                          <p className="txt">
                            Eniatus Bank Internal Product Dashboard Design Challenge is 
                            now open for registrations
                          </p>
                          <div className="bottom-info">
                            <span className="blue-squre">Application Front-End Design</span>
                            <span className="time-txt">2h ago</span>
                          </div>
                          <div className="right-remove mobile-hide">
                            <a href="javascript:;" className="btn-close"></a>
                            <span className="black-txt">Dismiss notification</span>
                          </div>
                          {/* end .right-remove */}
                        </div>
                      </div>
                      {/* end .items */}
                    </div>
                    {/* end .lightblue-section */}
                    <div className="greybar-section">
                      <div className="grey-bar flex-grid">
                        <div className="copyicon-title">
                          Topcoder Copilot Recruitment Challenge (3)
                        </div>
                        <div className="right-remove mobile-hide">
                          <a href="javascript:;" className="btn-close"></a>
                          <span className="black-txt">Dismiss notification</span>
                        </div>
                        {/* end .right-remove */}
                      </div>
                      {/* end .grey-bar */}
                      <div className="items">
                        <div className="item-content">
                          <p className="txt">
                            Your submission ID513A23433-1 is now in review
                          </p>
                          <div className="bottom-info">
                            <span className="time-txt">10min ago</span>
                          </div>
                          <div className="right-remove mobile-hide">
                            <a href="javascript:;" className="btn-close"></a>
                            <span className="black-txt">Dismiss notification</span>
                          </div>
                          {/* end .right-remove */}
                        </div>
                      </div>
                      {/* end .items */}
                      <div className="items">
                        <div className="item-content">
                          <p className="txt">
                            Your submission ID513A23433-1 was processed successfully
                          </p>
                          <div className="bottom-info">
                            <span className="time-txt">2h ago</span>
                          </div>
                          <div className="right-remove mobile-hide">
                            <a href="javascript:;" className="btn-close"></a>
                            <span className="black-txt">Dismiss notification</span>
                          </div>
                          {/* end .right-remove */}
                        </div>
                      </div>
                      {/* end .items */}
                      <div className="items">
                        <div className="item-content">
                          <p className="txt">
                            Your submission ID513A23433-2 was uploaded successfully
                          </p>
                          <div className="bottom-info">
                            <span className="time-txt">2h ago</span>
                          </div>
                          <div className="right-remove mobile-hide">
                            <a href="javascript:;" className="btn-close"></a>
                            <span className="black-txt">Dismiss notification</span>
                          </div>
                          {/* end .right-remove */}
                        </div>
                      </div>
                      {/* end .items */}
                    </div>
                    {/* end .greybar-section */}
                    
                    <div className="greybar-section">
                      <div className="grey-bar flex-grid">
                        <div className="copyicon-title">
                          TOSCA Editor - Web Application Wireframe Challenge (1)
                        </div>
                        <div className="right-remove mobile-hide">
                          <a href="javascript:;" className="btn-close"></a>
                          <span className="black-txt">Dismiss notification</span>
                        </div>
                        {/* end .right-remove */}
                      </div>
                      {/* end .grey-bar */}
                      <div className="items">
                        <div className="item-content">
                          <p className="txt">
                            Challenge is now in Review phase. No new submissions are accepted at this point.
                          </p>
                          <div className="bottom-info">
                            <span className="time-txt">1h ago</span>
                          </div>
                          <div className="right-remove mobile-hide">
                            <a href="javascript:;" className="btn-close"></a>
                            <span className="black-txt">Dismiss notification</span>
                          </div>
                          {/* end .right-remove */}
                        </div>
                      </div>
                      {/* end .items */}
                    </div>
                    {/* end .greybar-section */}
                    <div className="light-bar">
                      Earlier
                      <a href="javascript:;" className="green-link desktop-hide mobile-show">Dismiss All</a>
                    </div>
                    <div className="lightblue-section">
                      <div className="items">
                        <div className="item-content have-remove">
                          <p className="txt">
                            Northumbrian Water (NWL) - Customer Engagement Gamification 
                            Mobile App Design Concepts Challenge is now open for 
                            registrations
                          </p>
                          <div className="bottom-info">
                            <span className="blue-squre">Concept Design</span>
                            <span className="time-txt">Apr 5</span>
                          </div>
                          <div className="right-remove mobile-hide">
                            <a href="javascript:;" className="btn-close"></a>
                            <span className="black-txt">Dismiss notification</span>
                          </div>
                          {/* end .right-remove */}
                        </div>
                      </div>
                      {/* end .items */}
                      <div className="items">
                        <div className="item-content">
                          <p className="txt">
                            FAST 48Hr! Patient Concierge Chatbot Web Application UX 
                            Testing Challenge is now open for registrations
                          </p>
                          <div className="bottom-info">
                            <span className="blue-squre">Rapid UX</span>
                            <span className="time-txt">April 1 at 10:43am</span>
                          </div>
                          <div className="right-remove mobile-hide">
                            <a href="javascript:;" className="btn-close"></a>
                            <span className="black-txt">Dismiss notification</span>
                          </div>
                          {/* end .right-remove */}
                        </div>
                      </div>
                      {/* end .items */}
                      <div className="items">
                        <div className="item-content">
                          <p className="txt">
                            Juno Claims Reporting Tool iOS Mobile Design Application is 
                            now open for registrations
                          </p>
                          <div className="bottom-info">
                            <span className="blue-squre">Application Front-End Design</span>
                            <span className="time-txt">March 28 at 3:45pm</span>
                          </div>
                          <div className="right-remove mobile-hide">
                            <a href="javascript:;" className="btn-close"></a>
                            <span className="black-txt">Dismiss notification</span>
                          </div>
                          {/* end .right-remove */}
                        </div>
                      </div>
                      {/* end .items */}
                    </div>
                    {/* end .lightblue-section */}
                    <div className="greybar-section">
                      <div className="grey-bar flex-grid">
                        <div className="copyicon-title">
                          Topcoder Copilot Recruitment Challenge (2)
                        </div>
                        <div className="right-remove mobile-hide">
                          <a href="javascript:;" className="btn-close"></a>
                          <span className="black-txt">Dismiss notification</span>
                        </div>
                        {/* end .right-remove */}
                      </div>
                      {/* end .grey-bar */}
                      <div className="items">
                        <div className="item-content">
                          <p className="txt">
                            Your submission ID513A23433-1 was uploaded successfully
                          </p>
                          <div className="bottom-info">
                            <span className="time-txt">April 10 at 10:52am</span>
                          </div>
                          <div className="right-remove mobile-hide">
                            <a href="javascript:;" className="btn-close"></a>
                            <span className="black-txt">Dismiss notification</span>
                          </div>
                          {/* end .right-remove */}
                        </div>
                      </div>
                      {/* end .items */}
                      <div className="items">
                        <div className="item-content">
                          <p className="txt">
                            You are now registered for Topcoder Copilot Recruitment Challenge
                          </p>
                          <div className="bottom-info">
                            <span className="time-txt">April 8 at 12:45am</span>
                          </div>
                          <div className="right-remove mobile-hide">
                            <a href="javascript:;" className="btn-close"></a>
                            <span className="black-txt">Dismiss notification</span>
                          </div>
                          {/* end .right-remove */}
                        </div>
                      </div>
                      {/* end .items */}
                    </div>
                    {/* end .greybar-section */}
                    <div className="end-message center">
                      You have no more notifications
                    </div>
                  </div>
                  {/* end .noti-body */}
                </div>
                {/* end .notifications-panel */}
              </div>
              <a className="flex row middle user-info-container" href="javascript:;">
                <img src={VicTorAvatar} className="avatar" alt="avatar" />
                <div className="handle-container flex row middle">
                  <span className="handle">vic-tor</span>
                  <span className="drowdown-icon flex center middle">
                    <img src={ArrowSmallDown} className="dropdown-icon" alt="dropdown icon" />
                  </span>
                </div>
              </a>
              <div className="user-info-popup flex column">
                <div className="header flex row middle">
                  <img src={VicTorAvatar} width="60" className="avatar" alt="avatar" />
                  <div className="flex column">
                    <span className="handle">vic-tor</span>
                    <span className="email">vic@topcoder.com</span>
                  </div>
                </div>
                <a href="javascript:;" className="switch-to-business-container flex row middle">
                  <img src={IconSwitchBusiness} className="switch-icon" alt="switch" />
                  <span className="switch-to-busniness">Switch to BUSINESS</span>
                </a>
                <div className="menu flex column">
                  <a href="javascript:;">Settings</a>
                  <a href="javascript:;">Payments</a>
                  <a href="javascript:;">All projects</a>
                  <a href="javascript:;">All projects</a>
                  <span className="separator"></span>
                  <a href="javascript:;">Help</a>
                  <a href="javascript:;">About Topcoder</a>
                  <a className="logout-btn" href="javascript:;">Log Out</a>
                </div>
              </div>
            </div>
            <div ref={this.arrowSelectedPrimaryAnimation} className="icon-chosen-arrow">
              <svg width="40px" height="10px" viewBox="0 0 40 10">
                  {/*  Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch  */}
                  <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                      <g id="Desktop-navigation-specification" transform="translate(-229.000000, -1000.000000)">
                          <path d="M244,1003.53788 L246.138913,1001.25575 C247.682763,999.608539 250.215252,999.577876 251.795386,1001.18726 C251.81754,1001.20983 251.839442,1001.23266 251.861087,1001.25575 L254,1003.53788 C257.197411,1006.94936 260.579378,1009 266.154646,1009 L269,1009 L269,1010 L229,1010 L229,1009 L231.845354,1009 C237.420622,1009 240.802589,1006.94936 244,1003.53788 Z" id="Path-3"></path>
                      </g>
                  </g>
              </svg>
            </div>
          </div>
          <div ref={this.secondaryNav} className="secondary-nav flex row middle center">
            <div ref={this.secondaryNavLinkContainer} className="secondary-nav-link-container flex row middle">
              <a className="secondary-level-1 isOpenBK ignore hide" href="javascript:;">Overview</a>
              <div className="more-btn-container relative hide">
                <a href="javascript:;" className="more-btn flex row middle center relative">
                  <div className="mask wrap-all"></div>
                  <span>More</span>
                  <img src={ArrowSmallDown} className="dropdown-icon icon-dark" alt="dropdown icon" />
                  <img src={ArrowSmallDownDark} className="dropdown-icon icon-light" alt="dropdown icon" />
                </a>
                <div className="more-content-container flex column">
                  <a className="hide ignore secondary-level-1-more" href="javascript:;">Overview</a>
                </div>
              </div>
              <span ref={this.arrowSelectedSecondaryAnimation} className="icon-select hide"></span>
            </div>
          </div>
          <div ref={this.secondaryNavMobile} className="secondary-nav-mobile flex column space-between">
            <div className="menu flex column">
              <a className="isOpenBK hide ignore secondary-mobile-level-2" href="javascript:;">Solutions</a>
            </div>
            <div className="footer flex row center middle">
              <span>© 2000–2019 Topcoder Inc, a Wipro Company. All rights reserved.</span>
            </div>
          </div>
          <div className="user-info-popup user-info-popup-mobile flex column">
            <div className="header flex row middle space-between">
              <div className="left-content flex row middle">
                <img src={VicTorAvatar} width="60" className="avatar" alt="avatar" />
                <div className="flex column">
                  <span className="handle">@vic-tor</span>
                  <span className="description">Member since May, 2009</span>
                </div>
              </div>
              <a href="javascript:;" className="icon-close flex row center middle">
                <img src={IconCloseDark} alt="menu" />
              </a>
            </div>
            <div className="menu flex column">
              <div className="notification-mobile">
                <div className="left-notifi">
                  <span className="title">
                    Notifications
                  </span>
                  
                  <span className="red-number">
                    (35)
                  </span>
                </div>
                
                <span className="notification-right-arrow">
                </span>
              </div>
              <span className="separator"></span>
              <a href="javascript:;">My Dashboard</a>
              <a href="javascript:;">Profile</a>
              <a href="javascript:;">Account & Security</a>
              <a href="javascript:;">Notifications</a>
              <a href="javascript:;">Topcoder Open</a>
              <span className="separator"></span>
              <a href="javascript:;">Help center</a>
              <a className="logout-btn" href="javascript:;">Log Out</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Navigation.defaultProps = {
  navMenus: [],
  theme: 'light'
};

Navigation.propTypes = {
  navMenus: PropTypes.array,
  theme:  PropTypes.oneOf(['dark', 'light']),
};

export default Navigation;