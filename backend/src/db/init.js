import { mongoose } from 'mongoose'

export function initDatabase() {
  // const DATABASE_URL = 'mongodb://localhost:27017/blog'
  const DATABASE_URL = process.env.DATABASE_URL

  mongoose.connection.on('open', () => {
    console.log('successfully connected to database:', DATABASE_URL)
  })

  /*const connection = **/
  return mongoose.connect(DATABASE_URL)
}
