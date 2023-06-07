import axios from 'axios'

export const dogNameData = async (name) => {
    const url = `http://localhost:3001/dogs?name=${name}`
    const dataDogs = await axios.get(url)
    return dataDogs.data
}

