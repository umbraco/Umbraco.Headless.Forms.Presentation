import React, { useCallback } from 'react'

import useField from '../../hooks/useField'
import { FieldProps } from '../../types'
import FieldGroup from '../FieldGroup'

type Props = JSX.IntrinsicElements['textarea'] & FieldProps

const Textarea: React.FC<Props> = ({
  alias,
  caption,
  condition,
  helpText,
  placeholder,
  required,
}) => {
  const { currentValue, error, registerField } = useField(alias)

  const ref = useCallback(
    node => {
      registerField({
        name: alias,
        ref: node,
      })
    },
    [alias, registerField],
  )

  return (
    <FieldGroup
      alias={alias}
      caption={caption}
      condition={condition}
      helpText={helpText}
      required={required}
    >
      <textarea
        name={alias}
        id={alias}
        defaultValue={currentValue as string}
        placeholder={placeholder}
        required={required}
        ref={ref}
      />

      {error && <span>{error}</span>}
    </FieldGroup>
  )
}

Textarea.displayName = 'TextArea'

export default Textarea
