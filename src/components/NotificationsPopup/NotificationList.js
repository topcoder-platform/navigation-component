import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import styles from './styles.module.scss'

const LightBar = ({ title, onDismiss }) => (
  <div className={styles['light-bar']}>
    {title}
    <span role='button' className={cn(styles['green-link'], styles['mobile-only'], styles.dismissSection)} onClick={onDismiss}>
      Dismiss All
    </span>
  </div>
)

LightBar.propTypes = {
  title: PropTypes.node,
  onDismiss: PropTypes.func
}

const Category = ({ title, onDismiss }) => (
  <div className={styles['grey-bar']}>
    <div className={styles['copyicon-title']}>
      {title}
    </div>
    <div className={cn(styles['right-remove'], styles.dismissCategory)} onClick={onDismiss}>
      <div className={styles['btn-close']} />
      <span className={styles['black-txt']}>Dismiss notification</span>
    </div>
  </div>
)

Category.propTypes = {
  title: PropTypes.node,
  onDismiss: PropTypes.func
}

const Item = ({ item, onDismiss }) => (
  <div className={styles['items']}>
    <a href={item.href} className={styles['item-content']}>
      <p className={styles['txt']}>{item.content}</p>
      <div className={styles['bottom-info']}>
        {item.tags && item.tags.map(tag => (
          <span className={styles['blue-squre']} key={tag}>
            {tag}
          </span>
        ))}
        <span className={styles['time-txt']}>{moment(item.timestamp).fromNow()}</span>
      </div>
      <div className={cn(styles['right-remove'], styles.dismissItem)} onClick={onDismiss}>
        <div className={styles['btn-close']} />
        <span className={styles['black-txt']}>Dismiss notification</span>
      </div>
    </a>
  </div>
)

Item.propTypes = {
  item: PropTypes.object,
  onDismiss: PropTypes.func
}

const NotificationList = ({ notifications, onDismiss, onSettings, onClose }) => {
  const categories = _.uniq(
    (notifications || []).map(noti => noti.category).filter(x => x)
  ).sort((a, b) => a.localeCompare(b))

  const newest = notifications.filter(x => {
    return x.timestamp > moment().subtract(1, 'day').valueOf()
  })
  const earlier = notifications.filter(x => {
    return x.timestamp < moment().subtract(1, 'day').valueOf()
  })
  const sections = [
    { title: 'New', list: newest },
    { title: 'Earlier', list: earlier }
  ]

  return (
    <>
      <div className={styles['noti-header']}>
        <span
          className={styles['notification-back-btn']}
          role='button'
          onClick={onClose}
        />
        <span className={styles['left-noti']}>Notifications</span>
        <div className={styles.rights}>
          <span
            role='button'
            className={styles['white-link']}
            onClick={() => onDismiss(notifications)}
          >
            Dismiss All
          </span>
          &nbsp;<span className={styles.point} />&nbsp;
          <span
            role='button'
            className={styles['white-link']}
            onClick={onSettings}
          >
            Settings
          </span>
        </div>
        <span
          role='button'
          className={styles['btn-setting']}
        />
      </div>
      <div className={styles['noti-body']}>
        {sections.map(section => (
          <Fragment key={section.title}>
            <LightBar
              title={section.title}
              onDismiss={() => onDismiss(section.list)}
            />
            <div className={styles['lightblue-section']}>
              {section.list.filter(x => !x.category).map((item, i) => (
                <Item
                  item={item}
                  key={`noti-${i}`}
                  onDismiss={() => onDismiss([item])}
                />
              ))}
            </div>
            {categories.map(category => {
              const items = section.list.filter(x => x.category === category)
              if (!items.length) return null
              return (
                <div className={styles['greybar-section']} key={category}>
                  <Category
                    title={`${category} (${items.length})`}
                    onDismiss={() => onDismiss(items)}
                  />
                  {items.map((item, i) => (
                    <Item
                      item={item}
                      key={`noti-${i}`}
                      onDismiss={() => onDismiss([item])}
                    />
                  ))}
                </div>
              )
            })}
          </Fragment>
        ))}
        <div className={cn(styles['end-message'], styles.center)}>
          You have no more notifications
        </div>
      </div>
    </>
  )
}

NotificationList.defaultProps = {
  notifications: [],
  onDismiss: () => null
}

NotificationList.propTypes = {
  /**
   * Array of Notifications, each with properties:
   *
   *   - content {string|node}
   *   - href {string} href for the item's wrapper anchor
   *   - category {array}
   *   - tags {array}
   *   - timestamp {number}
  */
  notifications: PropTypes.array,

  /**
   * Called with array of items to be dismissed.
   *
   * @param items {array} Items to be dismissed
   */
  onDismiss: PropTypes.func,

  /** Called on Settings button click */
  onSettings: PropTypes.func,

  onClose: PropTypes.func
}

export default NotificationList
