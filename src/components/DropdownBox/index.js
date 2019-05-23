import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const optionLabel = (value, options) => {
  const opt = options.find(x => x.value === value)
  return opt && opt.label
}

const DropdownBox = ({ open, onClick, onClose, checked, value, options, onChange }) => {
  const handleClick = e => !e.defaultPrevented && onClick()

  const handleClose = e => {
    e.preventDefault()
    onClose()
  }

  const createHandleChange = value => e => {
    e.preventDefault()
    onClose()
    onChange(value)
  }

  return (
    <div className={cn(styles['dropdown-box'], checked && styles['checked'], open && styles['open'])} onClick={handleClick}>
      <div className={styles['backdrop']} onClick={handleClose} />
      <span className={styles['selected-label']}>
        {optionLabel(value, options)}
        <i className={styles['dropdown-arrow']} />
      </span>

      <ul className={styles['options']}>
        {options.map(opt => (
          <li
            className={cn(styles['option-li'], opt.value === value && styles['active'])}
            key={opt.value}
            onClick={createHandleChange(opt.value)}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

DropdownBox.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default DropdownBox
