const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

require('./database');

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/api', require('./routes/index'));

// a partir de aqui las rutas llevan token
app.use('/api', require('./routes/rutas'));
app.use('/api', require('./routes/rutasApis'));

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));
