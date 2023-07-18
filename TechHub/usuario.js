// Função para exibir o formulário de cadastro
function exibirFormularioCadastro() {
    document.getElementById('cadastro').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    document.getElementById('mensagem').style.display = 'none';
  }
  
  // Função para exibir o formulário de login
  function exibirFormularioLogin() {
    document.getElementById('cadastro').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('mensagem').style.display = 'none';
  }
  
  // Função para alternar entre os formulários de cadastro e login
  function alternarFormulario() {

    var cadastro = document.getElementById('cadastro');
    var login = document.getElementById('login');
    var mensagem = document.getElementById('mensagem');
    if (cadastro.style.display === 'none') {
      exibirFormularioCadastro();
    } else {
      exibirFormularioLogin();
    }
  
    // Limpa os campos e a mensagem de erro
    cadastro.reset();
    login.reset();
    mensagem.style.display = 'none';
  }
  
  // Função para realizar o cadastro do usuário
  function realizarCadastro() {
    var nome = document.getElementById('cadastro-nome').value;
    var email = document.getElementById('cadastro-email').value;
    var senha = document.getElementById('cadastro-senha').value;
  
    // Validação básica
    if (!nome || !email || !senha) {
      alert('Preencha todos os campos.');
      return;
    }
  
    // Verifica se o e-mail já está cadastrado
    var usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    var usuarioExistente = usuariosCadastrados.find(function(usuario) {
      return usuario.email === email;
    });
  
    if (usuarioExistente) {
      alert('E-mail já cadastrado. Por favor, faça login.');
      return;
    }
  
    // Cria um novo objeto de usuário
    var novoUsuario = {
      nome: nome,
      email: email,
      senha: senha,
      cursos: []
    };
  
    // Adiciona o novo usuário à lista de usuários cadastrados
    usuariosCadastrados.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));
  
    // Exibe uma mensagem de sucesso
    alert('Cadastro realizado com sucesso! Faça login para continuar.');
    exibirFormularioLogin();
  }
  
  // Função para realizar o login do usuário
  function realizarLogin() {
    var email = document.getElementById('login-email').value;
    var senha = document.getElementById('login-senha').value;
  
    // Validação básica
    if (!email || !senha) {
      alert('Preencha todos os campos.');
      return;
    }
  
    // Verifica se o usuário existe na lista de cadastrados
    var usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    var usuario = usuariosCadastrados.find(function(usuario) {
      return usuario.email === email && usuario.senha === senha;
    });
    
    if (!usuario) {
      alert('E-mail ou senha incorretos.');
    }
    else{
        localStorage.setItem('usuarioLogado',JSON.stringify(usuario));
        window.location.href = 'areaCliente.html';
    }
}

function verificarAutenticacao() {
    // Verifica se o usuário está logado
    var usuarioLogado = localStorage.getItem('usuarioLogado');
    
    if(!usuarioLogado){
      document.getElementById('login-nav').innerHTML = 'Faça Login';
      if(window.location.href.includes("areaCliente.html")){ 
        alert('Você não está logado');
        window.location.href = 'login.html';
        return false;

      }

    }
    else{
      if (window.location.href.includes("login.html")){
            window.location.href = 'areaCliente.html';  
    }
    return true;
    }


  }

function comprarCursos(curso){

    logado = verificarAutenticacao()
    if(logado){
        var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        var usuarios = JSON.parse(localStorage.getItem('usuarios'))

        for(let j = 0; j< usuarioLogado.cursos.length;j++){
            if (usuarioLogado.cursos[j] == curso ){
                alert("Curso já adquirido!");
                return false;
            }
        }
        
      
        
        for (let i = 0;i < usuarios.length;i++){
            if (usuarios[i].email == usuarioLogado.email){
                usuarios[i].cursos.push(curso);
                break;
            }
        }

        window.location.href = "pagamento.html";
        usuarioLogado.cursos.push(curso);

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        localStorage.setItem('usuarios', JSON.stringify(usuarios));



    }
    else{
      alert('Você não está logado');
    }
}

function pagar(){
  alert('Curso comprado com sucesso!!!');
  window.location.href = "areaCliente.html";
  window.location.href = "areaCliente.html";

}


function logout(){

    localStorage.removeItem('usuarioLogado');
    window.location.href = 'empresa.html';

}

function informacoes(){
    let informacao = JSON.parse(localStorage.getItem("usuarioLogado"));
    let saida = [];
    let container = document.getElementById("informacoes");
    let cursosContainer = document.getElementById("cursosContainer");
    let cursos = [];


    saida.push(
        '<p>Nome: ' + informacao.nome + '<br>Email: ' + informacao.email);
    container.innerHTML = saida.join('');

    if(informacao.cursos.length > 0){
      for (let i = 0; i < informacao.cursos.length;i++){
        cursos.push('<a target="externo"href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"class="course-button-3" target="externo"><img src="imgs/' + informacao.cursos[i] + '.png" alt="'+informacao.cursos[i]+'"><span class="course-button-text-3">'+ informacao.cursos[i] + '</span></a>');
      }
      cursos.join('');
    }
    else{
      cursos = [];
    }
    cursosContainer.innerHTML = cursos;

}

