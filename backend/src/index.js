import { app } from './app.js'
import dotenv from 'dotenv'
import { initDatabase } from './db/init.js'
dotenv.config()

try {
  await initDatabase()
  const PORT = process.env.PORT
  app.listen(PORT)
  console.log(`express server running on http://localhost:${PORT}`)
} catch (e) {
  console.log('error connecting to database:', e)
}
/* const PORT = 3000 */
