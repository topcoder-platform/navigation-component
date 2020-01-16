import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const IconSelect = ({ show, x, isResize }) => {
  let styleObj = {
    transform: `translateX(${x}px)`

  }
  // is window is on resize, stop animation
  if (isResize) {
    styleObj['transition'] = 'auto'
    styleObj['-webkit-transition'] = 'auto'
  }
  return <span
    className={styles.iconSelect}
    style={styleObj}
    hidden={!show}
  />
}

IconSelect.propTypes = {
  // screen is changing size
  isResize: PropTypes.bool,
  /** Show or hide the icon */
  show: PropTypes.bool,
  /** The x position of the arrow. Generally this will be the center of the target */
  x: PropTypes.number
}

export default IconSelect
