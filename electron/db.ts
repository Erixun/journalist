import mysql from "mysql2";
import databaseConfig from "./database.config";
import { ipcMain } from "electron";

export const setupDatabase = () => {
  const connection = mysql.createConnection({
    host: databaseConfig.HOST,
    user: databaseConfig.USER,
    password: databaseConfig.PASSWORD,
    database: databaseConfig.DATABASE,
    port: databaseConfig.PORT,
  });

  connection.connect((error) => {
    if (error) {
      console.error("Database connection failed: ", error);
      // Handle the error appropriately, e.g., show an error dialog or quit the app
    } else {
      console.log("Database connected successfully");
    }
  });

  // Set up IPC to handle queries from the renderer process
  ipcMain.on("execute-query", (event, query, values, requestId) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        event.reply(requestId, { error: error.message || "Unknown error" });
      } else {
        event.reply(requestId, results);
      }
    });
  });
};
