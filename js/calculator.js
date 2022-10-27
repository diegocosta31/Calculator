const operacaoAnteriorTela = document.querySelector("#operacao-anterior");
const operacaoAtualTela = document.querySelector("#operacao-atual");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(operacaoAnteriorTela, operacaoAtualTela) {
    this.operacaoAnteriorTela = operacaoAnteriorTela;
    this.operacaoAtualTela = operacaoAtualTela;
    this.operacaoAtual = "";
  }

  // adicionando digito na tela
  addDigit(digito) {
    // verificar ponto no digito
    if (digito === "." && this.operacaoAtualTela.innerText.includes(".")) {
      return;
    }
    this.operacaoAtual = digito;
    this.atualizarTela();
  }

  // processar operações
  processarOperacao(operacao) {
    // Verificar se o valor atual está vazio
    if (this.operacaoAtualTela.innerText === "" && operacao !== "C") {
      // Alterar operação
      if (this.operacaoAnteriorTela.innerText !== "") {
        this.mudarOperacao(operacao);
      }
      return;
    }

    // Obter valores atuais e anteriores
    let valorOperacao;
    let anterior = +this.operacaoAnteriorTela.innerText.split(" ")[0];
    let atual = +this.operacaoAtualTela.innerText;

    switch (operacao) {
      case "+":
        valorOperacao = anterior + atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "-":
        valorOperacao = anterior - atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "*":
        valorOperacao = anterior * atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "/":
        valorOperacao = anterior / atual;
        this.atualizarTela(valorOperacao, operacao, atual, anterior);
        break;
      case "DEL":
        this.processoOperadorDelete();
        break;
      case "CE":
        this.processoOperadorLimparAtual();
        break;
      case "C":
        this.processoOperadorLimpar();
        break;
      case "=":
        this.processoOperadorIgual();
        break;
      default:
        return;
    }
  }

  // Atualizar valores da tela
  atualizarTela(
    valorOperacao = null,
    operacao = null,
    atual = null,
    anterior = null
  ) {
    if (valorOperacao === null) {
      // Anexar número ao valor atual
      this.operacaoAtualTela.innerText += this.operacaoAtual;
    } else {
      // Verifique se o valor é zero, se for apenas adicione o valor atual
      if (anterior === 0) {
        valorOperacao = atual;
      }
      // Adicionar valor atual ao anterior
      this.operacaoAnteriorTela.innerText = `${valorOperacao} ${operacao}`;
      this.operacaoAtualTela.innerText = "";
    }
  }

  // Alterar operação matemática
  mudarOperacao(operacao) {
    const operacoesMatematicas = ["*", "-", "+", "/"];

    if (!operacoesMatematicas.includes(operacao)) {
      return;
    }

    this.operacaoAnteriorTela.innerText =
      this.operacaoAnteriorTela.innerText.slice(0, -1) + operacao;
  }

  // Excluir um dígito
  processoOperadorDelete() {
    this.operacaoAtualTela.innerText =
      this.operacaoAtualTela.innerText.slice(0, -1);
  }

  // Limpar operação atual
  processoOperadorLimparAtual() {
    this.operacaoAtualTela.innerText = "";
  }

  // Limpar todas as operações
  processoOperadorLimpar() {
    this.operacaoAtualTela.innerText = "";
    this.operacaoAnteriorTela.innerText = "";
  }

  // Processar uma operação
  processoOperadorIgual() {
    let operacao = this.operacaoAnteriorTela.innerText.split(" ")[1];
    this.processarOperacao(operacao);
  }
}

const calc = new Calculator(operacaoAnteriorTela, operacaoAtualTela);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const valor = e.target.innerText;

    if (+valor >= 0 || valor === ".") {
      calc.addDigit(valor);
    } else {
      calc.processarOperacao(valor);
    }
  });
});