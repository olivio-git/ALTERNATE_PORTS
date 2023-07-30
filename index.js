const net = require('node:net');

const altPort = (portDsigned) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(portDsigned, () => {
      const { port } = server.address();
      server.close(() => {
        resolve(port);
      });
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        altPort(0).then((port) => resolve(port));
      } else {
        reject(err);
      }
    });
  });
};

module.exports = { altPort };
