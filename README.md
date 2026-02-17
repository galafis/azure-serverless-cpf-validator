# Azure Serverless CPF Validator

Microsservico serverless para validacao de CPF usando Azure Functions - DIO Challenge AZ-204

## Sobre o Projeto

Este projeto implementa uma Azure Function HTTP Trigger que valida numeros de CPF (Cadastro de Pessoas Fisicas) brasileiros. A funcao recebe um CPF via requisicao HTTP e retorna se o CPF e valido ou invalido.

## Tecnologias Utilizadas

- **Azure Functions** - Plataforma serverless para execucao do microsservico
- **Node.js** - Runtime JavaScript
- **JavaScript** - Linguagem de programacao

## Funcionalidades

- Validacao matematica completa do CPF (digitos verificadores)
- Rejeicao de CPFs com todos os digitos iguais
- API REST via HTTP GET e POST
- Resposta em formato JSON

## Como Usar

### Requisicao GET
```
GET /api/validate-cpf?cpf=12345678909
```

### Requisicao POST
```json
POST /api/validate-cpf
Content-Type: application/json

{
  "cpf": "12345678909"
}
```

### Resposta de Sucesso
```json
{
  "cpf": "12345678909",
  "valid": true,
  "formatted": "123.456.789-09"
}
```

### Resposta de Erro
```json
{
  "cpf": "11111111111",
  "valid": false,
  "message": "CPF invalido"
}
```

## Estrutura do Projeto

```
azure-serverless-cpf-validator/
|-- src/
|   |-- functions/
|       |-- validate-cpf.js
|-- host.json
|-- package.json
|-- README.md
```

## Executando Localmente

1. Instale o Azure Functions Core Tools
2. Clone o repositorio
3. Execute `npm install`
4. Execute `func start`

## Deploy no Azure

1. Crie um Function App no Azure Portal
2. Configure o runtime para Node.js
3. Faca o deploy usando Azure CLI ou VS Code

## Licenca

Este projeto esta licenciado sob a licenca MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## DIO Challenge

Este projeto foi desenvolvido como parte do desafio de projeto da trilha Microsoft AZ-204 na plataforma [DIO](https://www.dio.me/).
