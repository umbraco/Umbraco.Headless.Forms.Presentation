import { createContext } from 'react'

import { FormContext, Form } from '../types'

export default createContext<FormContext>({
  data: {},
  errors: {},
  form: {} as Form,
  registerField: () => {
    return
  },
  unregisterField: () => {
    return
  },
  onValueChange: () => {
    return
  },
})
