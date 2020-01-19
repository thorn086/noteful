import React from 'react'
import './Button.css'
import PropTypes from 'prop-types'


export default function NavButton(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavButton.defaultProps ={
  tag: 'a',
};

NavButton.propTypes={
  className: PropTypes.string,
  childrenm: PropTypes.string,
  otherProps: PropTypes.string
};