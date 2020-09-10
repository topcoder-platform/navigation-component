import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import _ from 'lodash'

import styles from './styles.module.scss'

import CheckBox from '../CheckBox'
import SwitchBox from '../SwitchBox'
import DropdownBox from '../DropdownBox'

const ItemControl = ({ control, name, value, options, onChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState()
  return (
    control === 'checkbox' ? (
      <CheckBox
        checked={value}
        onClick={() => onChange(name, !value)}
      />
    ) : control === 'switch' ? (
      <SwitchBox
        checked={value}
        onClick={() => onChange(name, !value)}
      />
    ) : control === 'dropdown' && (
      <DropdownBox
        open={dropdownOpen}
        onClick={() => setDropdownOpen(x => !x)}
        onClose={() => setDropdownOpen(false)}
        checked={value !== options[0].value}
        value={value}
        options={options}
        onChange={value => onChange(name, value)}
      />
    )
  )
}

ItemControl.propTypes = {
  control: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func
}

/**
 * Render option controls.
 *
 * @param item {item} The option object
 * @param onChange {function} Called with name (eg. website) and the new value
 */
const Item = ({ item, onChange }) => {
  return (
    <li>
      <div className={styles['list-item']}>
        <div className={styles['left']}>
          <div className={styles['title']}>
            {item.title}
          </div>
          <div className={styles['description']}>
            {item.description}
          </div>
        </div>

        <div className={styles['website']}>
          <ItemControl
            control={item.websiteControl}
            name='website'
            value={item.website}
            options={item.websiteOptions}
            onChange={onChange}
          />
        </div>

        <div className={styles['as-email']}>
          <ItemControl
            control={item.emailControl}
            name='email'
            value={item.email}
            options={item.emailOptions}
            onChange={onChange}
          />
        </div>
      </div>

      <div className={styles['description-mobile']}>
        {item.description}
      </div>
    </li>
  )
}

Item.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func
}

const NotificationSettings = ({ open, settings, theme, onChange, onClose, onSave }) => {
  const settingsWithId = useMemo(() => {
    return settings.map((x, i) => ({ ...x, id: x.id || i }))
  }, [settings])

  const categories = useMemo(() => {
    return _.uniq(settingsWithId.map(x => x.category))
      .map(category => ({
        category,
        settings: settingsWithId.filter(x => x.category === category)
      }))
  }, [settingsWithId])

  const createHandleChangeItem = item => (name, value) => {
    const _settings = settingsWithId.map(x => {
      x = { ...x }
      if (x.id === item.id) {
        x[name] = value
      }
      delete x.id
      return x
    })
    item = { ...item, [name]: value }
    delete item.id
    onChange(_settings, item, name)
  }

  return (
    <div className={cn(styles['settings-dialog'], styles['theme-wrapper'], `theme-${theme}`, open && styles.open)}>

      <div className={styles['header-nav-ui']}>
        <div className={styles['settings-nav']}>
          <img className={styles['tc-logo']} src='../../assets/images/tc-logo.svg' alt='logo' />
          <span className={styles['title']}>Topcoder Settings</span>
          <span
            role='button'
            className={styles['close-btn']}
            onClick={onClose}
          >
            <img src='../../assets/images/icon-close.svg' alt='close' />
          </span>
        </div>
      </div>

      <div className={styles['settings-panel']}>

        <div className={styles['title']}>
          Notifications
        </div>

        {categories.map(category => (
          <div className={styles['panel-content']} key={category.category}>
            <div className={styles['section-title']}>
              <div className={styles['left']}>
                {category.category}
              </div>
              <div className={styles['website']}>
                <span><em>Website</em></span>
              </div>

              <div className={styles['as-email']}>
                <span><em>As email</em></span>
              </div>
            </div>

            <ul className={styles['section-list']}>
              {category.settings.map((item, i) => (
                <Item
                  item={item}
                  key={`item-${i}`}
                  onChange={createHandleChangeItem(item)}
                />
              ))}
            </ul>
          </div>
        ))}

        <div className={styles['bottom-btn']}>
          <span
            role='button'
            className={cn(styles['btn'], styles['btn-gray'])}
            onClick={onSave}
          >
            Save settings
          </span>
        </div>

      </div>

    </div>
  )
}

NotificationSettings.defaultProps = {
  theme: 'light',
  settings: [
    {
      category: 'Project notifications',
      title: 'New posts and replies',
      description: `Get a notification any time somebody posts on your project. This will make sure you can stay up-to-date with what's happening on your project.`,
      websiteControl: 'checkbox',
      website: true,
      emailControl: 'dropdown',
      email: 'immediately',
      emailOptions: [
        { value: 'off', label: 'Off' },
        { value: 'immediately', label: 'Immediately' },
        { value: 'daily', label: 'Daily' },
        { value: 'everyOtherDay', label: 'Every other day' }
      ]
    }
  ]
}

NotificationSettings.propTypes = {
  open: PropTypes.bool,

  /**
   * Array of options object, each with properties:
   *
   *   - id (optional)
   *   - title {string} Option title
   *   - description {string} Option description
   *   - category {string} Option category. Eg. Project notifications
   *   - websiteControl {string(checkbox|switch|dropdown)} Type of control for website
   *   - website {bool|string} Website value
   *   - websiteOptions {array({ value, label })} Website options for dropdown
   *   - emailControl {string(checkbox|switch|dropdown)} Type of control for email
   *   - email {bool|string} Email value
   *   - emailOptions {array({ value, label })} Email options for dropdown
  */
  settings: PropTypes.array,

  theme: PropTypes.string,

  /**
   * Called when changing settings.
   *
   * @param settings {array} The updated settings
   * @param option {object} The specific settings item that changed
   * @param name {object} The value that changed. Eg. website
   *
  */
  onChange: PropTypes.func,

  /** Called when save button is clicked */
  onSave: PropTypes.func,

  onClose: PropTypes.func
}

export default NotificationSettings
