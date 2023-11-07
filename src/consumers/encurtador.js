import axios from 'axios';

export const encurtador = async (link) => {
    try {
        const data = { "url": link };
        const response = await axios.post('https://api.encurtador.dev/encurtamentos', data);
        return response.data.urlEncurtada;
    } catch (error) {
        console.error(error);
        return "";
    }
}