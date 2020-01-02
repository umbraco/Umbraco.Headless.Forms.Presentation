import React, { useEffect, useState } from "react"
import { Form, FormData, UmbracoForm } from "@umbraco/headless-forms-react"

import "@umbraco/headless-forms-react/themes/default.css"

const App: React.FC = () => {
  const [allForms, setAllForms] = useState<UmbracoForm[]>([])
  const [form, setForm] = useState<UmbracoForm>()
  useEffect(() => {
    const loadAllForms = async() => {
      const response = await fetch('/forms')
      const result = await response.json()
      setAllForms(result)
    }

    loadAllForms()
  }, [])

  return (
    <div className="App">
      {!form && allForms &&
        <ul>
          {allForms.map(form => <li key={form._id}>
            <a href="" onClick={(e) => {e.preventDefault(); setForm(form)}}>{form.name}</a>
          </li>)}
        </ul>
      }

      {form && (
        <Form
          form={form}
          onSubmit={async (data: FormData) => {
            await fetch(`/forms/${form._id}/entries`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            setForm(undefined)
          }}
        />
      )}
    </div>
  )
}

export default App
