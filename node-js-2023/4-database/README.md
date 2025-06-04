# Estratégias de Acesso a Banco de Dados 💾


## SQLite: O Ponto de Partida Ideal 🚀

Para quem está começando a estudar bancos de dados, o **SQLite** surge como uma excelente primeira opção.

**Por que usar SQLite primeiro?**

* **Simplicidade:** Não é preciso instalar e configurar um servidor de banco de dados complexo na sua máquina. O SQLite salva tudo em um **arquivo único**, o que simplifica muito o setup inicial.
* **Sintaxe Familiar:** Boa parte das consultas (queries) que você aprender com SQLite são **muito semelhantes** às usadas em outros bancos de dados SQL como PostgreSQL, MySQL, SQL Server, etc.
* **Fácil Transição:** Ao dominar os conceitos com SQLite, a migração do seu conhecimento para outros bancos de dados relacionais se torna mais suave, pois a lógica principal do SQL é a mesma. Se decidir mudar de banco no futuro, grande parte das suas queries não precisará de grandes alterações conceituais.

---

## Formas de Comunicação com o Banco de Dados 🗣️

Existem várias maneiras de um aplicativo se comunicar com um banco de dados. As principais incluem:

### 1. Drives Nativos

São bibliotecas específicas fornecidas pelos próprios bancos de dados (ou por terceiros) que permitem que uma linguagem de programação (como Python, Java, JavaScript) se conecte e execute comandos SQL diretamente no banco.

### 2. Query Builders (Construtores de Consultas)

**Query Builders** são ferramentas que facilitam a escrita de consultas SQL utilizando a sintaxe da própria linguagem de programação (como JavaScript, por exemplo). Em vez de escrever strings de SQL puras, você utiliza métodos e funções que constroem a consulta dinamicamente.

**Vantagens:**

* **Facilidade de Escrita e Leitura:** O código para construir a query geralmente é mais legível e fácil de manter do que strings SQL longas e complexas.
* **Reaproveitamento de Sintaxe:** Se você mudar de banco de dados (desde que o Query Builder dê suporte), a sintaxe que você usou para construir as queries geralmente pode ser reaproveitada, pois o Query Builder se encarrega de traduzi-la para o dialeto SQL específico do novo banco.
* **Segurança:** Muitos Query Builders ajudam a prevenir ataques de SQL Injection, tratando automaticamente os dados de entrada.

**Exemplo Simples:**

Digamos que você queira selecionar todos os usuários ativos de uma tabela `usuarios` onde a idade é maior que 18.

* **Sem Query Builder (SQL puro em uma string):**
    ```javascript
    const idade = 18;
    const status = "ativo";
    const sqlQuery = "SELECT * FROM usuarios WHERE idade > " + idade + " AND status = '" + status + "';";
    // Nota: Este exemplo é vulnerável a SQL Injection e concatenação de strings é má prática.
    ```

* **Com um Query Builder (conceitual):**
    ```javascript
    // Exemplo conceitual com uma biblioteca hipotética de Query Builder em JavaScript
    const qb = database.table('usuarios');
    const usuariosAtivos = await qb.select('*')
                                  .where('idade', '>', 18)
                                  .andWhere('status', '=', 'ativo')
                                  .get();
    ```
    Neste caso, o Query Builder se encarrega de gerar o SQL correto e seguro.

---

## ORM (Object-Relational Mapper)  Mapeador Objeto-Relacional 🗺️

**ORMs** são ferramentas que vão um passo além dos Query Builders. Eles permitem que você interaja com seu banco de dados usando **objetos** da sua linguagem de programação, em vez de escrever SQL diretamente ou usar apenas construtores de consultas.

Basicamente, um ORM mapeia as tabelas do seu banco de dados para classes (ou objetos) no seu código, e as linhas das tabelas para instâncias dessas classes. Isso permite uma interação mais natural e orientada a objetos com os dados.

*Fique tranquilo, abordaremos os ORMs com muito mais detalhes e exemplos práticos mais adiante! Por agora, basta saber que eles existem e representam um nível de abstração ainda maior sobre o acesso a dados.*

---