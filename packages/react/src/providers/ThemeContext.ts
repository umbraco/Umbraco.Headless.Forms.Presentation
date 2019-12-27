import { createContext } from 'react'

import { ThemeContext } from '../types'

export const defaultTheme = {
  form: 'Form',
  page: 'Form-page',
  fieldset: 'Form-fieldset',
  column: 'Form-column',
  fieldGroup: 'Form-fieldGroup',
}

const Context = createContext<ThemeContext>(defaultTheme)

Context.displayName = 'ThemeContext'

export default Context
