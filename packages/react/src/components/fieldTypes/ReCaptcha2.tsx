import React, { useContext, useEffect } from 'react'

import useField from '../../hooks/useField'
import useTheme from '../../hooks/useTheme'
import FormContext from '../../providers/FormContext'
import ThemeContext from '../../providers/ThemeContext'
import { FieldProps } from '../../types'

type Props = FieldProps & {
  size?: string
  theme?: string
}

const ReCaptcha2: React.FC<Props> = ({
  alias,
  theme = 'clean',
  size = 'normal',
}) => {
  const containerRef = React.createRef<HTMLDivElement>()
  const { error, registerField, onValueChange } = useField(alias)
  const formContext = useContext(FormContext)
  const themeContext = useContext(ThemeContext)
  const [className, styles] = useTheme(themeContext, 'fieldGroup')

  useEffect(() => {
    onValueChange(alias, null)
  }, [alias, onValueChange])

  useEffect(() => {
    registerField({
      name: alias,
    })
  }, [alias, registerField])

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    script.async = true
    script.defer = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const intervalId = setInterval(() => {
    if (containerRef.current && containerRef.current.children.length) {
      clearInterval(intervalId)
      return
    }

    if (
      Object.prototype.hasOwnProperty.call(window, 'grecaptcha') &&
      containerRef.current
    ) {
      clearInterval(intervalId)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const grecaptcha = (window as any).grecaptcha

      grecaptcha.ready(() => {
        grecaptcha.render(containerRef.current, {
          sitekey: formContext.recaptchaPublicKey,
          size: size,
          theme: theme,
          callback: (response: string) => {
            onValueChange(alias, response)
          },
          'expired-callback': () => {
            onValueChange(alias, undefined)
          },
        })
      })
    }
  }, 500)

  return (
    <div className={className} style={styles}>
      <div className="g-recaptcha" ref={containerRef} />
      {error && <span>{error}</span>}
    </div>
  )
}

ReCaptcha2.displayName = 'ReCaptcha2'

export default ReCaptcha2
