require('dotenv').config()
const { Dog, Temperament } = require("../db.js");
const axios = require('axios');
const {URL_API, API_KEY} = process.env

const getDogsApi = async () => {
    
    try {
        let apiDogs = [];
        const apiData = await axios.get(`${URL_API}?key=${API_KEY}`)
        .then(response => apiDogs.push(response.data))
        
        const flatApiDogs = apiDogs.flat()
     

        const mappedData = flatApiDogs.map((dog) => {        

            const dogsTemps = dog.temperament;
            const temperament = dogsTemps ? dogsTemps.split(", ") : [];

            const dogWeight = dog.weight.metric;
           
            const weightArr = dogWeight ? dogWeight.split(' - '): [];
           
            const weight = weightArr?.map(e => {
                if(e === 'NaN') {
                    return ;
                }else{
                    return parseInt(e);
                }
            });
                 
            

          return {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height: dog.height.metric,
            weight: weight,
            life_span: dog.life_span,
            temperament: temperament,
          };
        });

        return mappedData;

    } catch (error) {
        throw new Error(error)
    }
};

const getDogsDB = async () => {
    try {
        const allDbDogs = await Dog.findAll({
            include:{
                model: Temperament,
                attributes: ["name"],
                through:{
                    attributes: [],
                }
            }
        });
  
        
        const refactoringDogData = allDbDogs.map((dog) => {

            const dogTemp = dog.temperaments
            const temperamentDog = dogTemp?.map(e => {return e.name})


            const dogWeight = dog.weight;
            
            const weightArr = dogWeight ? dogWeight.split(",") : [];
            
            const weight = weightArr?.map((e) => {
              if (e === "NaN") {
                return ;
              } else {
                return parseInt(e);
              }
            });
            

            return {
              id: dog.id,
              name: dog.name,
              image: dog.image,
              height: dog.height.metric,
              weight: weight,
              life_span: dog.life_span,
              temperament: temperamentDog,
            };
        })

        
        return refactoringDogData;
    } catch (error) {
        throw new Error(error)
    }
};

const getDogByID = async (id) => {
    
    const dbInfo = await getDogsDB()
    const findDogInDb = dbInfo.find((item) => item.id.toString() === id)
   
    if(findDogInDb){
        return findDogInDb; 
    }else{
         try {
           const apiData = await axios.get(`${URL_API}/${id}key=${API_KEY}`);
           const refenceImg = apiData.data.reference_image_id;

           const allApiDogs = await getDogsApi();

           const urlImage = allApiDogs.find((e) => e.image.id === refenceImg);

           const imageData = urlImage.image;

           const apiDog = {
             id: apiData.data.id,
             name: apiData.data.name,
             image: urlImage.image.url,
             height: apiData.data.height.metric,
             weight: apiData.data.weight.metric,
             life_span: apiData.data.life_span,
             temperament: apiData.data.temperament,
           };

           return apiDog;
         } catch (error) {
           throw new Error("No existe Dog");
         }
    } 
    
}

module.exports = {
    getDogsApi,
    getDogsDB,
    getDogByID
}