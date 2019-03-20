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
      config.resolve.alias['pages'] = path.join(__dirname, 'pages');
      config.resolve.alias['actions'] = path.join(__dirname, 'src/actions');
      config.resolve.alias['components'] = path.join(__dirname, 'src/components');
      config.resolve.alias['config'] = path.join(__dirname, 'src/config');
      config.resolve.alias['layouts'] = path.join(__dirname, 'src/layouts');
      config.resolve.alias['reducers'] = path.join(__dirname, 'src/reducers');
      config.resolve.alias['store'] = path.join(__dirname, 'src/store');
      config.resolve.alias['styles'] = path.join(__dirname, 'src/styles');
      config.resolve.alias['utils'] = path.join(__dirname, 'src/utils');

      return config;
   },
};

module.exports = withSass(nextConfig, { cssModules: true });
