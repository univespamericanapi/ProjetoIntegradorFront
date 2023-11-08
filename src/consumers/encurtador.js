import axios from 'axios';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

export const encurtador = async (link) => {
    try {
        const data = { url: link };
        const response = await axios.post(
            `${proxyUrl}https://api.encurtador.dev/encurtamentos`,
            data
        );
        return response.data.urlEncurtada;
    } catch (error) {
        console.error(error);
        return '';
    }
};