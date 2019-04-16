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

      server.use((req, res, next) => {
         res.header('Access-Control-Allow-Origin', '*');
         res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
         res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization');

         // Preflight request is always 200
         if (req.method === 'OPTIONS') {
            return res.status(200).end();
         }

         next();
      });

      server.get('/project/:id_project/description', (req, res) => {
         const actualPage = '/project/description';
         const queryParams = { id_project: req.params.id_project };
         app.render(req, res, actualPage, queryParams);
      });

      server.get('/project/:id_project/content/part/:id_part', (req, res) => {
         const actualPage = '/project/content/part';
         const queryParams = {
            id_project: req.params.id_project,
            id_part: req.params.id_part,
         };
         app.render(req, res, actualPage, queryParams);
      });

      server.get('/project/:id_project/content/create', (req, res) => {
         const actualPage = '/project/content/create';
         const queryParams = { id_project: req.params.id_project };
         app.render(req, res, actualPage, queryParams);
      });

      server.get('/project/:id_project/content', (req, res) => {
         const actualPage = '/project/content';
         const queryParams = { id_project: req.params.id_project };
         app.render(req, res, actualPage, queryParams);
      });

      server.get('/project/:id_project/iterations', (req, res) => {
         const actualPage = '/project/iterations';
         const queryParams = { id_project: req.params.id_project };
         app.render(req, res, actualPage, queryParams);
      });

      server.get('/project/:id_project/contributors', (req, res) => {
         const actualPage = '/project/contributors';
         const queryParams = { id_project: req.params.id_project };
         app.render(req, res, actualPage, queryParams);
      });

      server.get('/project/:id_project/settings', (req, res) => {
         const actualPage = '/project/settings';
         const queryParams = { id_project: req.params.id_project };
         app.render(req, res, actualPage, queryParams);
      });

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
