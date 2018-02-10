const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackConfig = require('../webpack.dev');

const log = require('./log');
const {endpointRouter} = require('just-write-api');

const app = express();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
const PUBLIC_DIR = path.join(__dirname, '../public');

const compiler = webpack(webpackConfig);


app.use(express.static(PUBLIC_DIR));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', endpointRouter());


// webpack middleware
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));


// anything not handled by the API, send through index.html
app.use('*', (req, res) => {
    let index = path.join(PUBLIC_DIR, 'index.html');
    res.sendFile(index);
});

app.listen(PORT, HOST, () => {
    log(`App running at http://${HOST}:${PORT}`);
});
