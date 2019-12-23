import React, { useContext } from 'react'

import useTheme from '../hooks/useTheme'
import ThemeContext from '../providers/ThemeContext'

interface Props {
  caption?: string
  width: number
}

const Column: React.FC<Props> = ({ caption, children, width }) => {
  const theme = useContext(ThemeContext)
  const [className, styles] = useTheme(theme, 'column')

  return (
    <div className={className} style={styles} data-columns={width}>
      {caption && <span>{caption}</span>}
      {children}
    </div>
  )
}

Column.displayName = 'Column'

export default Column
