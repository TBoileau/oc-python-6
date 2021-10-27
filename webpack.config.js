const Encore = require('@symfony/webpack-encore');
const dotenv = require('dotenv');
const fs = require("fs");

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  .setOutputPath('public/build/')
  .setPublicPath('/build')
  .addEntry('app', './assets/js/app.js')
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .configureBabel((config) => {
    config.plugins.push('@babel/plugin-proposal-class-properties');
  })
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = 3;
  })
  .enableReactPreset()
  .enableSassLoader()
  .copyFiles({
    from: './assets/images',
    to: 'images/[path][name].[ext]',
  })
  .configureDefinePlugin((options) => {
    let env = dotenv.config();

    env = Object.assign(env, dotenv.config({ path: '.env.local'}));

    options['process.env'].API_URL = JSON.stringify(env.parsed.API_URL);
  })
;

module.exports = Encore.getWebpackConfig();
