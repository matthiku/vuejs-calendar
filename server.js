require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone');
moment.tz.setDefault("UTC");
const serialize = require('serialize-javascript')

app.use('/public', express.static(path.join(__dirname, 'public')));

const events = [
  { description: 'random event', date: '2018-01-25T00:00:00.000Z' }
];

let renderer;

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  let contentMarker = '<!-- APP-DATA -->'
  if (renderer) {
    renderer.renderToString({ events }, (err, html) => {
      if (err) {
        console.log(err);
      } else {
        res.send(template.replace(contentMarker, `
          <script>
            var __INITIAL_STATE__ = ${serialize(events)};
          </script>
          ${html}
        `));
      }
    })
  } else {
    res.send('<p>awaiting built...</p>');
  }
});

app.use(require('body-parser').json());
app.post('/add_event', (req, res) => {
  events.push(req.body)
  res.sendStatus(200);
})

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(server, app);
  require('./webpack-dev-middleware').init(app);
  require('./webpack-server-compiler').init(function(bundle) {
    renderer = require('vue-server-renderer').createBundleRenderer(bundle)
  });
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require("open")(`http://localhost:${process.env.PORT}`);
  }
});
