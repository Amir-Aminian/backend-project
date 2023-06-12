const connect = (WebSocket ,wss, ws) => {
  ws.on('message', function message(data, isBinary) {
    ws.userEmail = JSON.parse(data).userEmail;
    if (JSON.parse(data).update == true) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          const index = JSON.parse(data).sharedEmails.findIndex((data) => data == client.userEmail);
          if (index != -1) {
            client.send("true", { binary: isBinary });
          };
        };
      });
    };
  });
};

module.exports = connect;
