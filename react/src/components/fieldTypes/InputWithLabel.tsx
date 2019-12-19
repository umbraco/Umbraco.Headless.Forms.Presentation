import React from 'react'

import { FieldProps } from '../../types'
import FieldGroup from '../FieldGroup'

import Input from './Input'

type Props = JSX.IntrinsicElements['input'] &
  FieldProps & {
    patternErrorMessage?: string
  }

const Text: React.FC<Props> = ({
  alias,
  caption,
  condition,
  helpText,
  required,
  ...props
}) => {
  return (
    <FieldGroup
      alias={alias}
      caption={caption}
      condition={condition}
      helpText={helpText}
      required={required}
    >
      <Input type="text" alias={alias} required={required} {...props} />
    </FieldGroup>
  )
}

export default Text
