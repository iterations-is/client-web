/**
 * @file NextJS + Webpack Configuration
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

const path = require('path');
const withSass = require('@zeit/next-sass');
const sassGlob = require('node-sass-glob-importer');

const nextConfig = {
   sassLoaderOptions: {
      importer: sassGlob(),
   },

   webpack(config, options) {
      config.resolve.alias = {
         pages: path.join(__dirname, 'pages'),
         components: path.join(__dirname, 'src/components'),
         config: path.join(__dirname, 'src/config'),
         layouts: path.join(__dirname, 'src/layouts'),
         styles: path.join(__dirname, 'src/styles'),
         utils: path.join(__dirname, 'src/utils'),
      };

      return config;
   },
};

module.exports = withSass(nextConfig, { cssModules: true });
