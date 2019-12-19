import { createContext } from 'react'

import { ThemeContext } from '../types'

export const defaultTheme = {
  form: 'Form',
  page: 'Form-Page',
  fieldset: 'Form-Fieldset',
  column: 'Form-Column',
  fieldGroup: 'Form-FieldGroup',
}

export default createContext<ThemeContext>(defaultTheme)
