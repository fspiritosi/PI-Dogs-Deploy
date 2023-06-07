const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getAllDogs, getDog, createDog} = require('../controllers/dog.controller.js');
const {
  createTemperaments,
} = require("../controllers/temperament.controller.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//------DOGS-------//

//GET

router.get('/dogs', getAllDogs)

//GET for ID

router.get('/dogs/:id', getDog)

//POST

router.post('/dogs', createDog)

//------TEMPERAMENTS-------//

router.get("/temperaments", createTemperaments);

module.exports = router;
