const express = require('express');
const cors = require('cors');
const path = require('path');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname + './client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './client/build/index.html'), err => {
        if (err) res.status(500).send(err);
    });
});

app.use((req, res) => {
    res.status(404).send({ message: 'not found...'});
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });