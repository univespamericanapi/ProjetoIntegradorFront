const celularMascara = (celular) => {
    const value = celular
        .replace(/\D/g, '') // remove caracteres não numéricos
        .replace(/(\d{2})(\d)/, '($1) $2') // insere o parêntese e espaço
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2'); // insere o traços
    return value;
};

export default celularMascara;