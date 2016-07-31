/*eslint-env node*/
import express from 'express';
import webpack from 'webpack';
import history from 'connect-history-api-fallback';
import portNumber from 'port-number';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import devConfig from './webpack/webpack.dev.config.babel.js';

const env = process.env.NODE_ENV;
const isDeveloping = env !== 'production';
const port = process.env.PORT ? process.env.PORT : portNumber();
const ip = isDeveloping ? '0.0.0.0' : '0.0.0.0';

const app = express();

app.use( history() );

if( isDeveloping ) {

  const compiler = webpack( devConfig );

  app.use( webpackDevMiddleware( compiler, {
    publicPath: devConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }) );

  app.use( webpackHotMiddleware( compiler ) );

  // Serve pure static assets
  app.use( express.static( './static' ) );

} else {

  app.use( express.static( __dirname + '/dist' ) );
}

app.listen( port, ip, error => {
  if ( error ) throw error;

  /*eslint-disable no-console */
  console.info( `[${env}] Listening on port ${port}. Open up http://${ip}:${port}/ in your browser.` );
  /*eslint-enable no-console */
});
