import { Database } from 'sqlite3'
import { app } from 'electron'
import { ipcMain } from 'electron'
import path from 'path'

export const getDbPath = (app: Electron.App) => {
  const MODE = import.meta.env.MODE
  const DB_NAME = `${MODE}.db`
  const userData = app.getPath('userData')
  return path.join(userData, DB_NAME)
}

export function initSqlite() {
  const dbPath = getDbPath(app)
  console.log(dbPath)
  const db = new Database(dbPath, (error) => {
    if (error) return console.error('Database connection failed: ', error)

    console.log('Database connection success!')
    console.log(`Running in mode: ${import.meta.env.MODE}`)
  })

  db.run(
    `CREATE TABLE IF NOT EXISTS entries (
    [id] NVARCHAR(160) NOT NULL,
    [text] nvarchar(255) NOT NULL,
    [createdAt] nvarchar(255) NOT NULL,
    [updatedAt] nvarchar(255),
    PRIMARY KEY ([id])
  )`,
    (error) => {
      if (error) return console.error('Table creation failed: ', error)

      console.log('Table creation success!')
    }
  )

  ipcMain.on('execute-query', (event, query, values, requestId) => {
    db.all(query, values, (error, results) => {
      if (error) {
        event.reply(requestId, { error: error.message || 'Unknown error' })
      } else {
        event.reply(requestId, results)
      }
    })
  })
}
