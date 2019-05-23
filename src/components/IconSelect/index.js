import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const IconSelect = ({ show, x }) => (
  <span
    className={styles.iconSelect}
    style={{ transform: `translateX(calc(${x}px - 50%))` }}
    hidden={!show}
  />
)

IconSelect.propTypes = {
  /** Show or hide the icon */
  show: PropTypes.bool,
  /** The x position of the arrow. Generally this will be the center of the target */
  x: PropTypes.number
}

export default IconSelect
