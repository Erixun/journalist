export const executeQuery = (query: string, values: string[]) => {
  return new Promise((resolve, reject) => {
    const requestId = Date.now().toString();
    window.ipcRenderer.send('execute-query', query, values, requestId);
    window.ipcRenderer.once(requestId, (_, response) => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
};

// // Example usage
// executeQuery("SELECT * FROM your_table", [])
//   .then((results) => console.log(results))
//   .catch((error) => console.error(error));