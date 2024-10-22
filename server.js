const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

const app = express();
const sneakersCtrl = require('./controllers/sneakers');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// DB Connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs'); 
});

app.get('/sneakers', sneakersCtrl.index);
app.get('/sneakers/new', sneakersCtrl.new);
app.delete('/sneakers/:sneakerId', sneakersCtrl.delete);
app.get('/sneakers/:sneakerId', sneakersCtrl.show);
app.post('/sneakers', sneakersCtrl.create);
app.get('/sneakers/:sneakerId/edit', sneakersCtrl.edit);
app.put('/sneakers/:sneakerId', sneakersCtrl.update);

// Start the server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
