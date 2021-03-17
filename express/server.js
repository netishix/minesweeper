const express = require('express');
const path = require('path');
const app = express();
const staticPath = __dirname + '/../dist';

app.set('port', (process.env.PORT || 3000));

app.use(express.static(staticPath));

function getRoot(request, response) {
  response.sendFile(path.join(staticPath, 'index.html'));
}

function getUndefined(request, response) {
  response.sendFile(path.join(staticPath, 'index.html'));
}


app.get('/', getRoot);
app.get('/*', getUndefined);

app.listen(app.get('port'), () => {
  console.log('Server listening on on port', app.get('port'));
});
