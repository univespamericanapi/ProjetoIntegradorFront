const cpfMascara = (cpf) => {
    const value = cpf
        .replace(/\D/g, '') // remove caracteres não numéricos
        .replace(/(\d{3})(\d)/, '$1.$2') // insere o primeiro ponto
        .replace(/(\d{3})(\d)/, '$1.$2') // insere o segundo ponto
        .replace(/(\d{3})(\d{1,2})/, '$1-$2') // insere o traço
        .replace(/(-\d{2})\d$/, '$1'); // remove os dígitos excedentes
    return value;
};

export default cpfMascara;