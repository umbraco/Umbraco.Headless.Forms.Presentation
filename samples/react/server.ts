import Koa, { ParameterizedContext } from 'koa'
import Router from '@koa/router'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import dotenv from 'dotenv'

import { Client } from '@umbraco/headless-client'

dotenv.config()

const client = new Client({
  projectAlias:
    process.env.UMBRACO__PROJECTALIAS
})

client.setAPIKey(process.env.UMBRACO__APIKEY)

const app = new Koa()
const router = new Router()

router.get('/forms', async (ctx: ParameterizedContext, next: Function) => {
  const forms = await client.management.forms.all()

  ctx.body = forms
  next()
}).get('/forms/:id', async (ctx: ParameterizedContext, next: Function) => {
  const form = await client.management.forms.byId(ctx.params.id)

  ctx.body = form
  next()
}).post('/forms/:id/entries', async (ctx: ParameterizedContext, next: Function) => {

  await client.management.forms.submitEntry(ctx.params.id, ctx.request.body)
  ctx.res.statusCode = 202
  next()
})

app.use(logger())
  .use(bodyParser())
  .use(router.routes())

// listen
const port = process.env.port || 8000;
app.listen(port, () => console.log(`App listening on http://localhost:${port}`));

