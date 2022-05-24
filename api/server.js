const jsonServer = require('json-server')
const auth = require('json-server-auth')
const middlewares = jsonServer.defaults({noCors:true})
const app = jsonServer.create()
const router = jsonServer.router('data.json')
var cors = require("cors")
const rules = auth.rewriter({
  users:660,
  api:660,

})

// /!\ Bind the router db to the app
app.db = router.db

// You must apply the auth middleware before the router

app.use(cors())
app.use(rules)
app.use(auth)
app.use(middlewares)
app.use(router)
app.listen(5000, () => {
  console.log('JSON Server with Token is running')
})