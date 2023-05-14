const validaCpf = (cpf) => {
	let soma = 0;
	let restante;

	cpf = cpf.replace('.', '').replace('.', '').replace('-', '').trim();

	let tudoIgual = true;

	for (let i = 0; i < cpf.length - 1; i++) {
		if (cpf[i] !== cpf[i + 1]) tudoIgual = false;
	}

	if (tudoIgual) {
		return false;
	}

	for (let i = 1; i <= 9; i++) {
		soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
	}

	restante = (soma * 10) % 11;

	if (restante === 10 || restante === 11) {
		restante = 0;
	}

	if (restante !== parseInt(cpf.substring(9, 10))) {
		return false;
	}

	soma = 0;

	for (let i = 1; i <= 10; i++) {
		soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
		restante = (soma * 10) % 11;
	}

	if (restante === 10 || restante === 11) {
		restante = 0;
	}

	return restante === parseInt(cpf.substring(10, 11));
};

export default validaCpf;
