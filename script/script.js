let instrumentos = []; 
let nextId = 1; 
document.getElementById('salvarBtn').addEventListener('click', function () {
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const marca = document.getElementById('marca').value;
    const preco = parseFloat(document.getElementById('preco').value);

    if (!nome || !tipo || isNaN(preco)) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (preco < 100 || preco > 50000) {
        alert('O preço deve estar entre R$ 100 e R$ 50.000.');
        return;
    }

    const instrumento = {
        id: nextId++,
        nome,
        tipo,
        marca,
        preco: preco.toFixed(2) 
    };

    instrumentos.push(instrumento); 
    atualizarTabela(); // Atualizar a tabela

    console.log('Lista de instrumentos:', instrumentos); // Imprimir a lista de instrumentos no console

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
            <td>R$ ${instrumento.preco}</td>
            <td>
                <button class="editarBtn btn btn-warning btn-sm" data-id="${instrumento.id}">Editar</button>
                <button class="excluirBtn btn btn-danger btn-sm" data-id="${instrumento.id}">Excluir</button>
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