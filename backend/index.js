const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');


app.use(cors());
app.use(express.json());


app.use('/', routes);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
