import React, { useState, FormEvent, useEffect, useCallback } from 'react'

import useTheme from '../hooks/useTheme'
import FormContext from '../providers/FormContext'
import ThemeContext, { defaultTheme } from '../providers/ThemeContext'
import * as types from '../types'

import Column from './Column'
import Fieldset from './Fieldset'
import {
  Input,
  InputWithLabel,
  Checkbox,
  Choice,
  Recaptcha2,
  Select,
  Textarea,
  TitleAndDescription,
} from './fieldTypes'
import Page from './Page'

interface Props {
  form: types.Form
  recaptchaPublicKey?: string
  theme?: types.Theme
  onSubmit: (data: object) => void
}

interface TypeMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.FC<any>
}
/* eslint-disable react/display-name */
const fieldTypes: TypeMap = {
  checkbox: Checkbox,
  checkboxList: props => <Choice multiple={true} {...props} />,
  dataConsent: ({ acceptCopy, ...props }) => (
    <Checkbox label={acceptCopy} {...props} />
  ),
  date: props => <InputWithLabel type="date" {...props} />,
  hidden: props => <Input type="hidden" {...props} />,
  password: props => <InputWithLabel type="password" {...props} />,
  recaptcha2: Recaptcha2,
  radioList: props => <Choice multiple={true} {...props} />,
  select: Select,
  text: props => <InputWithLabel type="text" {...props} />,
  textarea: Textarea,
  titleAndDescription: TitleAndDescription,
}
/* eslint-enable react/display-name */

const Form: React.FC<Props> = ({
  form,
  recaptchaPublicKey,
  theme = defaultTheme,
  onSubmit,
}) => {
  const formFields = form.pages
    .reduce((prev, cur) => {
      prev.push(...cur.fieldsets)
      return prev
    }, [] as types.FormFieldset[])
    .reduce((prev, cur) => {
      prev.push(...cur.columns)
      return prev
    }, [] as types.FormColumn[])
    .reduce((prev, cur) => {
      prev.push(...cur.fields)
      return prev
    }, [] as types.FormField[])

  const [data, setData] = useState(
    formFields.reduce((prev, cur) => {
      if (Object.prototype.hasOwnProperty.call(cur.settings, 'defaultValue')) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prev[cur.alias] = (cur.settings as any).defaultValue
      }
      return prev
    }, {} as types.FormData),
  )

  const [errors, setErrors] = useState<types.Errors>({})
  const [fields, setFields] = useState<types.Field[]>([])

  const [currentPage, setCurrentPage] = useState(0)
  const [className, styles] = useTheme(theme, 'form')

  const formRef = React.createRef<HTMLFormElement>()
  const isCurrentPage = (index: number) => index === currentPage

  const validateField = (field: types.Field) => {
    const formField = formFields.find(f => f.alias === field.name)
    if (!formField) return

    const fieldErrors: string[] = []

    const value = data[formField.alias]

    if (formField.required && !value) {
      fieldErrors.push(
        formField.requiredErrorMessage || 'This field is required',
      )
    }

    if (field.validate) {
      const customErrors = field.validate(value)
      if (customErrors && customErrors.length) {
        fieldErrors.push(...customErrors)
      }
    }

    if (fieldErrors.length) {
      setErrors(state => ({ ...state, [formField.alias]: fieldErrors }))
    } else {
      setErrors(state => {
        delete state[formField.alias]
        return state
      })
    }

    return fieldErrors
  }

  const validateForm = useCallback((revalidate = false) => {
    let isValid = true
    for (const field of fields) {
      if (!revalidate || errors[field.name]) {
        const fieldErrors = validateField(field)
        if (fieldErrors && fieldErrors.length) isValid = false
      }
    }

    return isValid
  }, [])

  useEffect(() => {
    validateForm(true)
  }, [data, validateForm])

  const handleValueChange = useCallback(
    (name: string, value?: types.FieldValue) => {
      setData(state => ({ ...state, [name]: value }))
    },
    [],
  )

  const registerField = useCallback(
    (field: types.Field) => {
      setFields(state => [...state, field])

      if (field.ref) {
        if (Array.isArray(field.ref)) {
          const handleOnChange = () => {
            const ref = field.ref as HTMLInputElement[]
            const value = field.parseValue
              ? field.parseValue(ref)
              : ref.map(f => f.value)
            handleValueChange(field.name, value)
          }
          for (const ref of field.ref) {
            if (ref) ref.onchange = handleOnChange
          }
        } else {
          field.ref.onchange = () => {
            const ref = field.ref as
              | HTMLInputElement
              | HTMLTextAreaElement
              | HTMLSelectElement
            const value = field.parseValue
              ? field.parseValue(ref.value)
              : ref.value
            handleValueChange(field.name, value)
          }
        }
      }
    },
    [handleValueChange],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validateForm()) onSubmit(data)
  }

  const handlePreviousPageClick = (event: FormEvent) => {
    event.preventDefault()

    setCurrentPage(val => --val)
  }

  const handleNextPageClick = (event: FormEvent) => {
    event.preventDefault()

    if (validateForm()) setCurrentPage(val => ++val)
  }

  const unregisterField = useCallback((name: string) => {
    setFields(state => state.filter(field => field.name !== name))
  }, [])

  const renderField = (field: types.FormField): React.ReactElement => {
    const {
      alias,
      caption,
      condition,
      required,
      requiredErrorMessage,
      settings,
      type,
    } = field
    const Field = fieldTypes[type]
    if (!Field) return <div key={alias}>Missing field {field.type}</div>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = { ...settings } as any
    if (field.preValues) props.preValues = field.preValues

    return (
      <Field
        caption={caption}
        condition={condition}
        key={alias}
        alias={alias}
        required={required}
        requiredErrorMessage={requiredErrorMessage}
        {...props}
      />
    )
  }

  return (
    <FormContext.Provider
      value={{
        form,
        data,
        errors,
        registerField,
        unregisterField,
        onValueChange: handleValueChange,
        recaptchaPublicKey,
      }}
    >
      <ThemeContext.Provider value={theme}>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className={className}
          style={styles}
          noValidate={true}
        >
          {form.pages.map(
            (p, i) =>
              isCurrentPage(i) && (
                <Page key={i} caption={p.caption}>
                  {p.fieldsets.map((f, i) => (
                    <Fieldset
                      key={i}
                      caption={f.caption}
                      condition={f.condition}
                    >
                      {f.columns.map((c, i) => (
                        <Column key={i} caption={c.caption} width={c.width}>
                          {c.fields.map(renderField)}
                        </Column>
                      ))}
                    </Fieldset>
                  ))}
                </Page>
              ),
          )}
          {currentPage > 0 && (
            <button type="button" onClick={handlePreviousPageClick}>
              Previous
            </button>
          )}
          {form.pages.length - 1 > currentPage && (
            <button type="button" onClick={handleNextPageClick}>
              Next
            </button>
          )}
          {form.pages.length - 1 === currentPage && <button>Submit</button>}
        </form>
      </ThemeContext.Provider>
    </FormContext.Provider>
  )
}

export default Form
