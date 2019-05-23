import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const CheckBox = ({ checked, onClick }) => (
  <div className={styles['checkbox']} onClick={onClick}>
    <div className={cn(styles['check-icon'], checked && styles['checked'])} />
  </div>
)

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func
}

export default CheckBox
