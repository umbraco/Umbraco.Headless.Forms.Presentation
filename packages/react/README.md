# Umbraco Forms React Components for Umbraco Heartcore

## Install

```bash
> npm install --save @umbraco/headless-forms-react
```

## Usage

```tsx
// src/app.ts
import React, { useEffect, useState } from 'react'
import { Form, FormData, UmbracoForm } from '@umbraco/headless-forms-react'

// import the default styles
import "@umbraco/headless-forms-react/themes/default.css"

const App: React.FC = () => {
  const [form, setForm] = useState<UmbracoForm>()
  useEffect(() => {
    const loadForm = async () => {
      const result = ... // fetch from server
      setForm(result)
    }

    loadForm()
  }, [])

  const handleSubmit = async (data: FormData) => {
    // handle submitted data
  }

  return (
    <div className="App">
      <Form
        form={form}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default App
```

## reCAPTCHA

To use the reCAPTCHA v2 field you need to pass your public site key to the `Forms` component.

```tsx
const App: React.FC = () => {
  return (
    <div className="App">
      <Form
        form={form}
        recaptchaPublicKey="my-site-key"
     />
    </div>
  )
}
```
