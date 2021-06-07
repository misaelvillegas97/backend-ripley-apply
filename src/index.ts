import * as fs from 'fs'
import * as https from 'https'
import config from '~/config'
import { getConnection } from './packages/database'
import server from './server'

const PORT = parseInt(process.env.SERVER_PORT, 0) || 8080

async function onStart(): Promise<any> {
  try {
    await getConnection()
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err)
    throw err
  }
}

const currentServer = https.createServer(
  {
    cert: fs.readFileSync(`${__dirname}/../server.cert`, 'utf8'),
    key: fs.readFileSync(`${__dirname}/../server.key`, 'utf8'),
  },
  server,
)

currentServer.listen(PORT, '0.0.0.0', onStart)
console.log(process.env)
console.log(`Server up and running on https://localhost:${PORT}`)
