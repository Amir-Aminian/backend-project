const connect = (WebSocket ,wss, ws) => {
  ws.on('message', function message(data, isBinary) {
    ws.userEmail = JSON.parse(data).userEmail;
    if (JSON.parse(data).update == true) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          const index = JSON.parse(data).sharedEmails.findIndex((data) => data == client.userEmail);
          if (index != -1) {
            client.send(JSON.stringify({status: "true"}), { binary: isBinary });
          };
        };
      });
    } else if (JSON.parse(data).update.status == true && JSON.parse(data).update.userEmail != null) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN && JSON.parse(data).update.userEmail == client.userEmail) {
          client.send(JSON.stringify({status: "true", from: JSON.parse(data).update.from}), { binary: isBinary });
        };
      });
    };
  });
};

module.exports = connect;
