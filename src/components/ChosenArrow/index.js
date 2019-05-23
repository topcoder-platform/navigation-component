import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const ChosenArrow = ({ show, x }) => (
  <div
    className={styles.chosenArrow}
    style={{ transform: `translateX(calc(${x}px - 50%))` }}
    hidden={!show}
  >
    <svg width='40px' height='10px' viewBox='0 0 40 10'>
      {/* Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch */}
      <g id='Page-1' stroke='none' strokeWidth='1' fillRule='evenodd'>
        <g id='Desktop-navigation-specification' transform='translate(-229.000000, -1000.000000)'>
          <path d='M244,1003.53788 L246.138913,1001.25575 C247.682763,999.608539 250.215252,999.577876 251.795386,1001.18726 C251.81754,1001.20983 251.839442,1001.23266 251.861087,1001.25575 L254,1003.53788 C257.197411,1006.94936 260.579378,1009 266.154646,1009 L269,1009 L269,1010 L229,1010 L229,1009 L231.845354,1009 C237.420622,1009 240.802589,1006.94936 244,1003.53788 Z' id='Path-3' />
        </g>
      </g>
    </svg>
  </div>
)

ChosenArrow.propTypes = {
  /** Show or hide the arrow */
  show: PropTypes.bool,
  /** The x position of the arrow. Generally this will be the center of the target */
  x: PropTypes.number
}

export default ChosenArrow
