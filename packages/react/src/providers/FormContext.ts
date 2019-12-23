import { createContext } from 'react'

import { FormContext, Form } from '../types'

const Context = createContext<FormContext>({
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

Context.displayName = 'FormContext'

export default Context
