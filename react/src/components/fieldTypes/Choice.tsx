import React, { useEffect, useRef, useCallback } from 'react'

import useField from '../../hooks/useField'
import { FieldProps } from '../../types'
import FieldGroup from '../FieldGroup'

interface KeyValue {
  [key: string]: string
}

type Props = JSX.IntrinsicElements['input'] &
  FieldProps & {
    multiple: boolean
    preValues: []
  }

const Choice: React.FC<Props> = ({
  alias,
  caption,
  condition,
  helpText,
  multiple,
  preValues,
  required,
}) => {
  const { registerField, currentValue, error } = useField(alias)
  const ref = useRef<HTMLInputElement[] | null[]>([])

  const parseValue = useCallback(
    (inputs: HTMLInputElement[]) => {
      const values = inputs.filter(r => r.checked).map(r => r.value)
      return multiple ? values : values[0]
    },
    [multiple],
  )

  useEffect(() => {
    registerField({
      name: alias,
      ref: ref.current,
      parseValue,
    })
  }, [alias, ref, registerField, parseValue])

  const isChecked = (value: string) => {
    if (!currentValue) return false
    if (typeof currentValue === `string`) return currentValue === value
    return Array.from(currentValue).includes(value)
  }

  const inputType = multiple ? 'checkbox' : 'radio'

  const renderOption = (value: string, name: string, index: number) => {
    const id = `${alias}-${index}`
    return (
      <div key={value}>
        <input
          type={inputType}
          name={alias}
          id={id}
          defaultChecked={isChecked(value)}
          ref={el => {
            ref.current[index] = el
          }}
          value={value}
          required={required}
        />{' '}
        <label htmlFor={id}>{name}</label>
      </div>
    )
  }

  const renderOptions = (values: object | []) => {
    if (values instanceof Array)
      return values.map((x, i) => renderOption(x, x, i))

    const kv = values as KeyValue

    return Object.keys(values).map((x, i) => renderOption(x, kv[x], i))
  }

  return (
    <FieldGroup
      alias={alias}
      caption={caption}
      helpText={helpText}
      required={required || false}
      condition={condition}
    >
      {renderOptions(preValues)}
      {error && <span>{error}</span>}
    </FieldGroup>
  )
}

export default Choice
