/**
 * @file NextJS + Webpack Configuration
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

const nextConfig = {
   webpack(config, options) {
      config.resolve.alias = {
         component: path.join(__dirname, 'components'),
         config: path.join(__dirname, 'config'),
         layout: path.join(__dirname, 'layouts'),
         style: path.join(__dirname, 'styles'),
         util: path.join(__dirname, 'utils'),
      };

      return config;
   },
};

module.exports = withCSS(withSass(nextConfig));
