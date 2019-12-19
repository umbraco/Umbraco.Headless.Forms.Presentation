import React, { useContext } from 'react'

import useCondition from '../hooks/useCondition'
import useTheme from '../hooks/useTheme'
import ThemeContext from '../providers/ThemeContext'
import { FormCondition } from '../types'

interface Props {
  caption?: string
  condition?: FormCondition
}

const Fieldset: React.FC<Props> = ({ caption, children, condition }) => {
  const theme = useContext(ThemeContext)
  const [className, styles] = useTheme(theme, 'fieldset')
  const isVisible = useCondition(condition)

  return (
    <>
      {isVisible && (
        <fieldset className={className} style={styles}>
          {caption && <legend>{caption}</legend>}
          {children}
        </fieldset>
      )}
    </>
  )
}

export default Fieldset
