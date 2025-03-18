const url = 'http://127.0.0.1:8000/char/save';

const Cadastro = async (pack) => {


    return await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pack)
    })
        .then((response) => {
            if (response.status > 200 && response.status < 300) {
                alert("Cadastro realizado com sucesso!");
            } else {
                console.log(`Erro do servidor: ${response.status}`);
            }
        })
};

export { Cadastro };