import Axios from 'axios'
const URL = 'http://localhost:4000'

export const addAmount = async(amount)=>{
    try {
        const response= await Axios.post(`${URL}/addamount`,{amount})
        return response.data
    } catch (error) {
        throw error.response.data.error
    }
}

export const showAmount = async()=>{
    try {
        const response = await Axios.get(`${URL}/showamount`)
        return response.data   
    } catch (error) {
        throw error.response.data.error
    }
}

export const updateAmount = async (id, amount) => {
    try {
        const response = await Axios.put(`${URL}/updateamount/${id}`, { amount });
        return response.data; // Return the data received from the server
    } catch (error) {
        throw error.response.data.error;
    }
};
export const countApi = async()=>{
    try {
        const response = await Axios.get(`${URL}/count`)
        return response.data   
    } catch (error) {
        throw error.response.data.error
    }  
}

