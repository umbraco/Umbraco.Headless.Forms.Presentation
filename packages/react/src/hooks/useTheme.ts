import { Theme } from '../types'

const useTheme = (
  theme: Theme,
  type: 'form' | 'page' | 'fieldset' | 'column' | 'fieldGroup',
): [string | undefined, object | undefined] => {
  const value = theme[type]
  if (typeof value === 'string') return [value as string, undefined]

  return [undefined, value as object]
}

export default useTheme
