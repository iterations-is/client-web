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
         components: path.join(__dirname, 'components'),
         config: path.join(__dirname, 'config'),
         layouts: path.join(__dirname, 'layouts'),
         styles: path.join(__dirname, 'styles'),
         utils: path.join(__dirname, 'utils'),
      };

      return config;
   },
};

module.exports = withSass(nextConfig, { cssModules: true });
