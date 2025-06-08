# Sistema de Controle de Transações

Este é um sistema simples para controle de transações financeiras pessoais, permitindo que cada usuário crie, visualize e consulte suas transações (créditos e débitos).

---

## 📖 Conceitos

### Requisitos Funcionais (RF)

👉 **O que são?**  
Os requisitos funcionais definem *o que o sistema deve fazer*, ou seja, as funcionalidades que ele precisa oferecer aos usuários.

### Regras de Negócio (RN)

👉 **O que são?**  
As regras de negócio determinam as **condições e restrições** que devem ser respeitadas, garantindo que as operações estejam de acordo com o contexto do negócio.

### Requisitos Não Funcionais (RNF)

👉 **O que são?**  
Os requisitos não funcionais descrevem **qualidades e características técnicas** esperadas do sistema, como desempenho, segurança, disponibilidade, entre outras.

---

## ✅ Funcionalidades e Requisitos

### Requisitos Funcionais (RF)

- [ ] O usuário deve poder criar uma nova transação;
- [ ] O usuário deve poder obter um resumo da sua conta (saldo total);
- [ ] O usuário deve poder listar todas as transações que já ocorreram;
- [ ] O usuário deve poder visualizar uma transação única;

### Regras de Negócio (RN)

- [ ] A transação pode ser do tipo **crédito**, que **somará ao saldo total**, ou **débito**, que **subtrairá** do saldo;
- [ ] Deve ser possível identificar o usuário em cada requisição (ex: autenticação via token);
- [ ] O usuário só pode visualizar transações que ele mesmo criou;

### Requisitos Não Funcionais (RNF)

- [ ] As APIs devem ser autenticadas, utilizando um mecanismo seguro (ex: JWT);
- [ ] O sistema deve permitir múltiplos usuários simultâneos sem interferência nos dados (isolamento de dados por usuário);

---
