//elementos DOM

const nameBox = document.querySelector(".nameBox");
const inputBox = document.querySelector(".inputBox");
const textBox = document.querySelector(".textBox");

const inputText = document.querySelector("#inputText");
const inputEmail = document.querySelector("#inputEmail");
const textArea = document.querySelector("#textArea");

const erroText = document.querySelector("#erroText");
const erroEmail = document.querySelector("#erroEmail");
const erroArea = document.querySelector("#erroArea");

const inputSubmit = document.querySelector("#inputSubmit");

const regexNome = /^[a-zA-ZÀ-ú\s'-]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarNome() {
  nome = nameBox.querySelector("#inputText").value.trim();
  if (nome === "") {
    nameBox.classList.remove("valid");
    nameBox.classList.add("active");
    erroText.innerHTML = " * Preencha o Campo";
    return false;
  } else if (!regexNome.test(nome)) {
    nameBox.classList.remove("valid");
    nameBox.classList.add("active");
    erroText.innerHTML =
      " * Nome inválido. Use apenas letras, espaços, hífens ou apóstrofos";
    return false;
  } else {
    nameBox.classList.remove("active");
    nameBox.classList.add("valid");
    erroText.innerHTML = "";
    return true;
  }
}

function validarEmail() {
  email = inputBox.querySelector("#inputEmail").value.trim();
  if (email === "") {
    nameBox.classList.remove("valid");
    inputBox.classList.add("active");
    erroEmail.innerHTML = " * Preencha o Campo";
    return false;
  } else if (!regexEmail.test(email)) {
    nameBox.classList.remove("valid");
    inputBox.classList.add("active");
    erroEmail.innerHTML = " * Insira um email válido";
    return false;
  } else {
    textBox.classList.remove("active");
    inputBox.classList.add("valid");
    erroEmail.innerHTML = "";
    return true;
  }
}

function validarTextArea() {
  areaText = textArea.value.trim();
  if (areaText === "") {
    textBox.classList.remove("valid");
    textBox.classList.add("active");
    erroArea.innerHTML = " * Preencha o Campo";
    return false;
  } else {
    textBox.classList.remove("active");
    textBox.classList.add("valid");
    erroArea.innerHTML = "";
    return true;
  }
}

function limparEstilosValidacao() {
  nameBox.classList.remove("active");
  nameBox.classList.remove("valid");
  erroText.innerHTML = "";

  inputBox.classList.remove("active");
  inputBox.classList.remove("valid");
  erroEmail.innerHTML = "";

  textBox.classList.remove("active");
  textBox.classList.remove("valid");
  erroArea.innerHTML = "";

  inputText.value = "";
  inputEmail.value = "";
  textArea.value = "";
}

inputText.onblur = validarNome;
inputEmail.onblur = validarEmail;
textArea.onblur = validarTextArea;

inputSubmit.onclick = (event) => {
  const isNome = validarNome();
  const isEmail = validarEmail();
  const isText = validarTextArea();
  if (!isNome || !isEmail || !isText) {
    event.preventDefault();
  } else {
    limparEstilosValidacao();
  }
};
