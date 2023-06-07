const {getDogsApi} = require('./dog.functions.js')

const getTemperaments = async () => {
    const apiData = await getDogsApi()
    const allTemperament = apiData.map(dog => {return dog.temperament}).flat()
    
    // let splitedTemperament = allTemperament.map((ele) => {
    //      ele ? ele.split(", ") : ""
    // }).flat()
    


    let orderTemperament = allTemperament.sort()

    let reduceTemperament = []

    orderTemperament.forEach((ele) => {
        if(reduceTemperament.indexOf(ele) === -1){
            reduceTemperament.push(ele)
        }
    })

    return reduceTemperament;
}

module.exports = {
    getTemperaments
}