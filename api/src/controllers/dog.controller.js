const {getDogsApi, getDogsDB, getDogByID} = require('../func/dog.functions.js')
const { Dog, Temperament } = require("../db.js");

const getAllDogs = async (req, res) => {
    
    const {name} = req.query
   
    try {
        const apiDogs = await getDogsApi();
        const dbDogs = await getDogsDB();
        const allDogs = [...apiDogs, ...dbDogs];

        if (name) {
          try {
            const filterDogs = allDogs.filter((dog) =>
              dog.name.toLowerCase().includes(name.toLowerCase())
            );
            res.status(200).json(filterDogs);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
        } else {
            res.status(200).json(allDogs)
        }
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getDog = async (req, res) => {
    const {id} = req.params
    try {
        const dogInfo = await getDogByID(id)
        res.status(200).json(dogInfo)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const createDog = async (req, res) => {
  const { name, image, height, weight, life_span, temperament } = req.body;
 
  try {

    const apiDogs = await getDogsApi();
    const dbDogs = await getDogsDB();
    const allDogs = [...apiDogs, ...dbDogs];

    if(allDogs.find((e) => e.name.replace(/\s+/g, "").toLowerCase() === name.replace(/\s+/g, "").toLowerCase())) {
      res.status(400).json({message: "The Dog allready exist"})
    }else{
      const newDog = await Dog.create(
        {
          name,
          image,
          height,
          weight,
          life_span,
        }
      )
      if(temperament.length){
        temperament.map(async temp => {
          try {
            let tempe = await Temperament.findOrCreate({where: {name: temp}})
            newDog.addTemperament(tempe[0])
          } catch (error) {
            throw new Error(error)
          }
        })
      }

      // newDog.addTemperament(temperamentDB)
      res.status(200).json({ message: "Dog created successfully" });
    }
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

module.exports = {
    getAllDogs,
    getDog,
    createDog
}