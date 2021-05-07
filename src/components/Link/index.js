/* eslint-disable react/prop-types */
import React from 'react'

/**
 * Generic link wrapper
 * @param {Object} props the props
 */
export default function Link (props) {
  return <a href={props.to} target={props.openNewTab ? '_blank' : '_self'} rel='noreferrer' style={props.style}>
    {props.children}
  </a >
}
