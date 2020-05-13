import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import { Link } from 'topcoder-react-utils'
import styles from './styles.module.scss'
import BackArrow from '../../assets/images/left-arrow.svg'
// import GearIcon from '../../assets/images/icon-settings-gear.svg'
import TickIcon from '../../assets/images/icon-checkmark.svg'
import NotificationIcon from '../../assets/images/icon-bell.svg'

// TODO: We change this later based on API event mapping
const eventTypes = {
  PROJECT: {
    ACTIVE: [
      'challenge.notification.events',
      'notifications.autopilot.events'
    ],
    COMPLETED: 'challenge.notification.completed'
  },
  BROADCAST: 'admin.notification.broadcast'
}

// Dynamic element, to select between Link and Div
const ConditionalWrapper = ({
  condition, renderLink, renderDiv, children
}) => (
  condition ? renderLink(children) : renderDiv(children)
)

const Item = ({ item, auth, onDismiss, markNotificationAsRead, isLink, tracking }) =>
  <ConditionalWrapper
    condition={
      (eventTypes.PROJECT.ACTIVE.includes(item.eventType) ||
      eventTypes.PROJECT.COMPLETED.includes(item.eventType)) &&
      item.sourceId
    }
    renderLink={children => (
      <Link
        to={`/challenges/${item.sourceId}`}
        className={styles['noti-item']}
        onClick={() => {
          if (!item.isRead) {
            markNotificationAsRead(item, auth.tokenV3)
            tracking.event('Click', 'Mark Notification As Read', 'Dropdown')
          }
          tracking.event('Click', 'Notification Event', String(item.sourceId))
        }}
      >
        {children}
      </Link>
    )}
    renderDiv={children => (
      <div className={styles['noti-item']}>
        {children}
      </div>
    )}
  >
    <Fragment>
      <div className={styles.left}>
        <p
          className={styles['txt']}
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: item.contents || ''
          }}
        />
        <span className={styles['time-txt']}>{moment(item.date).fromNow()}</span>
      </div>
      <div className={styles.right}>
        {
          !item.isRead &&
          (<div className={cn([styles.point, item.isSeen && styles['point-grey'], !item.isSeen && styles['point-red']])}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              e.nativeEvent.stopImmediatePropagation()
              markNotificationAsRead(item, auth.tokenV3)
              tracking.event('Click', 'Mark Notification As Read', 'Dropdown')
            }}
          />)}
      </div>
    </Fragment>
  </ConditionalWrapper>

Item.propTypes = {
  item: PropTypes.object.isRequired,
  auth: PropTypes.shape().isRequired,
  onDismiss: PropTypes.func,
  markNotificationAsRead: PropTypes.func.isRequired,
  isLink: PropTypes.bool.isRequired,
  tracking: PropTypes.shape().isRequired
}

export default class NotificationList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nonCompletedSection: [],
      unreadCount: 0
    }
  }

  challenges (list) {
    list = list || []
    const challengeTitles = _.uniq(list.map(noti => noti.sourceName).filter(x => x))
    return challengeTitles.map(title =>
      ({
        challengeTitle: title, items: list.filter(t => t.sourceName === title)
      }))
  }

  isLink (item) {
    const ret = (eventTypes.PROJECT.ACTIVE.includes(item.eventType) ||
      eventTypes.PROJECT.COMPLETED.includes(item.eventType)) &&
      item.sourceId > 0
    return ret
  }

  render () {
    const { onClose, notifications, onDismiss, unReadNotifications,
      markNotificationAsRead, markAllNotificationAsRead, auth, tracking } = this.props

    return (
      <>
        <div className={styles['noti-header']}>
          <div className={styles['lefts']}>
            <div
              className={styles['notification-icon']}
            >
              <NotificationIcon />
            </div>
            <div
              className={styles['notification-left-btn-mobile']}
              role='button'
              onClick={onClose}
            >
              <BackArrow />
            </div>
            <span className={styles['noti-title']}>Notifications</span>
          </div>
          <span className={styles['noti-title-mobileonly']}>Notifications</span>

          <div className={styles.rights}>
            <span
              role='button'
              className={cn(styles['white-link'], !unReadNotifications && styles['disabled'])}
              onClick={() => {
                if (unReadNotifications) {
                  markAllNotificationAsRead(auth.tokenV3)
                  tracking.event('Click', 'Mark All Notifications As Read', 'Dropdown')
                }
              }}
            >
              Mark All as Read
            </span>
            {/*
              * Disabled until Settings page is ready
              *
            &nbsp;<span className={styles.point} />&nbsp;
            <span
              role='button'
              className={styles['white-link']}
              onClick={onSettings}
            >
              Settings
            </span>
            */}
          </div>
          <div className={styles['rights-mobile']}>
            <div
              className={cn(styles['btn-tick'], !unReadNotifications && styles['disabled'])}
              role='button'
              onClick={() => {
                if (unReadNotifications) {
                  markAllNotificationAsRead(auth.tokenV3)
                  tracking.event('Click', 'Mark All Notifications As Read', 'Dropdown')
                }
              }}
            >
              <TickIcon />
            </div>
            {/*
              * Disabled until Settings page is ready
              *
            <div
              role='button'
              className={styles['btn-setting']}
            >
              <GearIcon />
            </div>
            */}
          </div>
        </div>
        <div className={styles['noti-body']}>
          <Fragment>
            {
              this.challenges(
                _.uniq((notifications || [])).filter(t =>
                  eventTypes.PROJECT.ACTIVE.includes(t.eventType) ||
                  eventTypes.BROADCAST.includes(t.eventType)
                )
              ).map((challenge, challengeIdx) =>
                (
                  <Fragment key={`nonComplete-${challengeIdx}`}>
                    <div key={`noti-${challengeIdx}`} className={styles['challenge-title']}>
                      <span>{challenge.challengeTitle}</span>
                    </div>
                    {challenge.items.map((item, itemIdx) =>
                      (<Item
                        item={item}
                        auth={auth}
                        markNotificationAsRead={markNotificationAsRead}
                        key={`noti-${challengeIdx}-${itemIdx}`}
                        onDismiss={() => onDismiss([item])}
                        isLink={this.isLink(item)}
                        tracking={tracking}
                      />))}
                  </Fragment>
                ))
            }
          </Fragment>
        </div>
        <div className={styles['view-all-notifications']}>
          <Link
            to='/notifications'
            onClick={() => tracking.event('Click', 'View All Notifications', 'Dropdown')}
          >View all Notifications</Link>
        </div>
      </>
    )
  }
}

NotificationList.defaultProps = {
  notifications: [],
  auth: null,
  onDismiss: () => null,
  markAllNotificationAsRead: () => null,
  markNotificationAsRead: () => null
}

NotificationList.propTypes = {
  auth: PropTypes.shape(),
  /**
   * Array of Notifications, each with properties:
   *
   *   - id {number} message identifier
   *   - sourceId {number} identifies the associated challenge
   *   - sourceName {string} challenge title
   *   - eventType {string} indicates if challenge is active(connect.notification.project.active)
   *       or completed(connect.notification.project.completed)
   *   - date {date} when notification was raised
   *   - isRead {boolean} indicates if is read
   *   - isSeen {boolean} indicates if is seen
   *   - contents {string} message
   *
  */
  notifications: PropTypes.array,

  /**
   * Called with array of items to be dismissed.
   *
   * @param items {array} Items to be dismissed
   */
  onDismiss: PropTypes.func,

  onClose: PropTypes.func,
  unReadNotifications: PropTypes.bool,
  markNotificationAsRead: PropTypes.func.isRequired,
  markAllNotificationAsRead: PropTypes.func.isRequired,
  tracking: PropTypes.shape().isRequired
}
