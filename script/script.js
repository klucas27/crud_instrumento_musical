let instrumentos = []; // Array para armazenar os instrumentos
let nextId = 1; // Variável para gerar IDs únicos

// Referência ao botão "Salvar"
document.getElementById('salvarBtn').addEventListener('click', function () {
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const marca = document.getElementById('marca').value;
    const preco = document.getElementById('preco').value;

    // Validar os campos obrigatórios
    if (!nome || !tipo || !preco) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Criar um objeto para o instrumento com ID único
    const instrumento = {
        id: nextId++, // Gerar ID único
        nome,
        tipo,
        marca,
        preco: parseFloat(preco).toFixed(2) // Formatar o preço com 2 casas decimais
    };

    instrumentos.push(instrumento); // Adicionar o instrumento ao array

    atualizarTabela(); // Atualizar a tabela

    console.log('Lista de instrumentos:', instrumentos); // Imprimir a lista de instrumentos no console

    // Limpar o formulário
    document.getElementById('instrumentoForm').reset();
});

// Função para atualizar a tabela
function atualizarTabela() {
    const tableBody = document.getElementById('instrumentosTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Limpar a tabela

    // Adicionar cada instrumento na tabela
    instrumentos.forEach((instrumento) => {
        const row = tableBody.insertRow();

        row.innerHTML = `
            <td>${instrumento.nome}</td>
            <td>${instrumento.tipo}</td>
            <td>${instrumento.marca}</td>
            <td>${instrumento.preco}</td>
            <td>
                <button class="editarBtn" data-id="${instrumento.id}">Editar</button>
                <button class="excluirBtn" data-id="${instrumento.id}">Excluir</button>
            </td>
        `;

        // Adicionar eventos aos botões de editar e excluir
        row.querySelector('.excluirBtn').addEventListener('click', function () {
            excluirInstrumento(instrumento.id);
        });

        row.querySelector('.editarBtn').addEventListener('click', function () {
            editarInstrumento(instrumento.id);
        });
    });
}

// Função para excluir um instrumento
function excluirInstrumento(id) {
    instrumentos = instrumentos.filter((instrumento) => instrumento.id !== id); // Remover o instrumento pelo ID
    atualizarTabela(); // Atualizar a tabela
}

// Função para editar um instrumento
function editarInstrumento(id) {
    const instrumento = instrumentos.find((instrumento) => instrumento.id === id);

    if (instrumento) {
        // Preencher o formulário com os dados do instrumento
        document.getElementById('nome').value = instrumento.nome;
        document.getElementById('tipo').value = instrumento.tipo;
        document.getElementById('marca').value = instrumento.marca;
        document.getElementById('preco').value = instrumento.preco;

        // Remover o instrumento do array para evitar duplicação
        instrumentos = instrumentos.filter((instrumento) => instrumento.id !== id);
        atualizarTabela();
    }
}