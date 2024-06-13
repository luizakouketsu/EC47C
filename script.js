
// Criar lista vazia 
var usuarioList = []; 
var count = 1;

// Adiciona novo usuário
function addUsuario(nome, email) {

  const dataAtual = new Date();
  const dia = dataAtual.getDate(); // Dia do mês (1-31)
  const mes = dataAtual.getMonth() + 1; // Mês (0-11, janeiro é 0, então somamos 1)
  const ano = dataAtual.getFullYear();

  const diaFormatado = dia.toString().padStart(2, '0'); // Garantir que o dia tenha 2 dígitos
  const mesFormatado = mes.toString().padStart(2, '0'); // Garantir que o dia tenha 2 dígitos
  const data = `${diaFormatado}/${mesFormatado}/${ano}`;

  var newUsuario = { id: count++, data: data, nome: nome, email: email }; 
  usuarioList.push(newUsuario); 
  localStorage.setItem('usuarioList', JSON.stringify(usuarioList));
  renderUsuarioList();
}

// Exclui usuário
function deleteUsuario(usuarioId) {
  var novoUsuarioList = usuarioList.filter(function (usuario) {
    return usuario.id !== usuarioId;
  });

  if (novoUsuarioList.length < usuarioList.length) { 
    usuarioList = novoUsuarioList;
    localStorage.setItem('usuarioList', JSON.stringify(usuarioList)); 
    renderUsuarioList();
  } else {
    alert('Usuário não encontrado.');
  }
}

// Recupera lista de usuários do localStorage
function getUsuarioList() {
  var storedList = JSON.parse(localStorage.getItem('usuarioList'));
  usuarioList = storedList || []; 
}

// Renderiza lista de usuário no HTML
function renderUsuarioList() {
  var usuarioListElement = document.getElementById('usuarioList');
  usuarioListElement.innerHTML = '';

  usuarioList.forEach(function (usuario) {
    var listItem = document.createElement('li');
    listItem.innerHTML = '<span class="usuario-nome">' + usuario.nome + '</span> (Email: ' + usuario.email + ') <button class="botaoExcluir" onclick="deleteUsuario(' + usuario.id + ')">Excluir</button>';
    usuarioListElement.appendChild(listItem);
  });
}

// Recupera lista de usuários do localStorage
getUsuarioList();

// Renderiza lista de usuários no HTML
renderUsuarioList();

// Event listener para o formulário de cadastro de usuários
document.getElementById('formUsuario').addEventListener('submit', function (event) {
  event.preventDefault();
  var nome = document.getElementById('nome');
  var email = document.getElementById('email');
  addUsuario(nome.value, email.value);
  nome.value = '';
  email.value = '';
});
