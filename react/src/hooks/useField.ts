import { useContext, useEffect } from 'react'

import FormContext from '../providers/FormContext'

const useField = (name: string) => {
  const {
    data,
    errors,
    form,
    registerField,
    unregisterField,
    onValueChange,
  } = useContext(FormContext)

  useEffect(() => () => unregisterField(name), [name, unregisterField])

  const currentValue = data[name]
  const error = errors[name]

  return {
    currentValue,
    error,
    form,
    onValueChange,
    registerField,
  }
}

export default useField
