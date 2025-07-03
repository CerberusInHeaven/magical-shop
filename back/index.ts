import express from 'express'
import cors from 'cors'
import routesCarros from './routes/artefatos.ts'
import routesFotos from './routes/fotos.ts'
import routesClientes from './routes/clientes.ts'
import routesLogin from './routes/login.ts'
import routesPropostas from './routes/propostas.ts'
import routeTipo from'./routes/tipos.ts'
import routeAdmin from'./routes/admins.ts'
import routeAdminLogin from'./routes/adminLogin.ts'
import routeDashboard from'./routes/dashboard.ts'
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

app.use("/artefatos", routesCarros)
app.use("/fotos", routesFotos)
app.use("/clientes", routesClientes)
app.use("/clientes/login", routesLogin)
app.use("/propostas", routesPropostas)
app.use("/tipos", routeTipo)
app.use("/admin", routeAdmin)
app.use("/admin/login", routeAdminLogin)
app.use("/dashboard", routeDashboard)

app.get('/', (req, res) => {
  res.send('WORLD OF ARTIFACTS OF POWER')
})

app.listen(process.env.PORT || 3000);
