import React, { useEffect } from 'react'

import useField from '../../hooks/useField'
import { FieldProps } from '../../types'
import FieldGroup from '../FieldGroup'

type Props = JSX.IntrinsicElements['input'] &
  FieldProps & {
    label?: string
  }

const Checkbox: React.FC<Props> = ({
  alias,
  caption,
  condition,
  helpText,
  label,
  required,
}) => {
  const { currentValue, error, registerField, onValueChange } = useField(alias)

  useEffect(() => {
    registerField({
      name: alias,
    })
  }, [alias, registerField])

  return (
    <FieldGroup
      alias={alias}
      caption={caption}
      helpText={helpText}
      required={required}
      condition={condition}
    >
      <input
        type="checkbox"
        name={alias}
        id={alias}
        defaultChecked={currentValue === 'true' || currentValue === 'on'}
        required={required}
        onChange={evt =>
          onValueChange(alias, evt.currentTarget.checked ? 'true' : null)
        }
      />
      {label && <label htmlFor={alias}>{label}</label>}
      {error && <span>{error}</span>}
    </FieldGroup>
  )
}

Checkbox.displayName = 'Checkbox'

export default Checkbox
