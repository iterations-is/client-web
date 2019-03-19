/**
 * @file Server
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

const express = require('express');
const next = require('next');

const configClient = require('./src/config/client.config');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
   .then(() => {
      const server = express();

      server.get('*', (req, res) => {
         return handle(req, res);
      });

      server.listen(configClient.port, err => {
         if (err) throw err;
         console.log(`Server: http://localhost:${configClient.port}`);
      });
   })
   .catch(ex => {
      console.error(ex.stack);
      process.exit(1);
   });