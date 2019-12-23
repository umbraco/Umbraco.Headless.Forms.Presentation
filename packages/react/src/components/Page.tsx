import React, { useContext } from 'react'

import useTheme from '../hooks/useTheme'
import ThemeContext from '../providers/ThemeContext'

interface Props {
  caption?: string
}

const Page: React.FC<Props> = ({ caption, children }) => {
  const theme = useContext(ThemeContext)
  const [className, styles] = useTheme(theme, 'page')

  return (
    <div className={className} style={styles}>
      {caption && <h1>{caption}</h1>}
      {children}
    </div>
  )
}

Page.displayName = 'Page'

export default Page
