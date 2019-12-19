# React Umbraco Forms Components for Umbraco Heartcore

## Install

```bash
> npm install --save @umbraco/headless-forms-react
```

## Usage

```tsx
// src/app.ts
import React from 'react'
import { Client } from '@umbraco/headless-client'
import { Form } from '@umbraco/headless-forms-react'

const client = new Client({ projectAlias: '' })
client.setAPIKey('')

const formData = await client.management.forms.byId('')

const App: React.FC = () => {
  return (
    <div className="App">
      <Form
        form={formData}
        onSubmit={(data): void => {
          // handle submit
          console.log(data)
        }}
      />
    </div>
  )
}

export default App
```

## reCAPTCHA

## Themes
