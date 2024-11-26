
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const apiRouter = require('./api/router');
const PORT = process.env.PORT || 8000;

app.use(cors());

// Ajusta el límite de tamaño del cuerpo de la petición JSON a 35MB
app.use(express.json({ limit: '100mb' }));

// Ajusta el límite de tamaño del cuerpo de la petición para los datos codificados en URL a 35MB
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Ajusta el límite para otros tipos de cuerpos de petición si es necesario
app.use(express.raw({ type: 'application/octet-stream', limit: '100mb' }));

//Rutas de la api
app.use('/api/v1', apiRouter);


app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});