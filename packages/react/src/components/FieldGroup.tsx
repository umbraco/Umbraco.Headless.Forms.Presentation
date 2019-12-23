import React, { useContext } from 'react'

import useCondition from '../hooks/useCondition'
import useTheme from '../hooks/useTheme'
import FormContext from '../providers/FormContext'
import ThemeContext from '../providers/ThemeContext'
import { FormCondition, FormFieldIndicationType } from '../types'

interface Props {
  alias: string
  caption: string
  errors?: object
  helpText?: string
  required?: boolean
  condition?: FormCondition
}

const FieldGroup: React.FC<Props> = ({
  alias,
  caption,
  children,
  required,
  condition,
}) => {
  const theme = useContext(ThemeContext)
  const {
    form: { fieldIndicationType, indicator },
  } = useContext(FormContext)
  const [className, styles] = useTheme(theme, 'fieldGroup')
  const isVisible = useCondition(condition)

  const showIndicator = () => {
    switch (fieldIndicationType) {
      case FormFieldIndicationType.MarkMandatoryFields:
        return required
      case FormFieldIndicationType.MarkOptionalFields:
        return !required
      default:
        return false
    }
  }
  return (
    <>
      {isVisible && (
        <div className={className} style={styles}>
          <label htmlFor={alias}>
            {caption}
            {showIndicator() && indicator}
          </label>
          {children}
        </div>
      )}
    </>
  )
}

FieldGroup.displayName = 'FieldGroup'

export default FieldGroup
