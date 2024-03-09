# Documentação da API de Agenda de Contatos

Esta é a documentação de requisitos para a API de Agenda de Contatos, que permite aos usuários gerenciar contatos, categorizá-los e realizar operações de CRUD.

## Funcionalidade

Os usuários devem poder adicionar novos contatos com informações como nome, número de telefone, endereço de e-mail, etc.

## Requisitos Funcionais

1. **Cadastro de Contatos**
   - Os usuários podem adicionar novos contatos fornecendo informações como nome, número de telefone e endereço de e-mail.

2. **Visualização de Contatos**
   - Os usuários podem visualizar a lista de todos os contatos cadastrados.

3. **Atualização de Contatos**
   - Os usuários podem atualizar as informações de um contato existente.

4. **Exclusão de Contatos**
   - Os usuários podem excluir um contato existente.

## Requisitos de Autenticação e Autorização

1. **Autenticação de Usuários**
   - Os usuários devem se autenticar usando o e-mail para acessar as operações de criação, atualização e exclusão de contatos.

2. **Autorização de Acesso às Operações**
   - Apenas usuários autenticados têm permissão para realizar operações de CRUD.

## Regras de Negócios

1. Os usuários devem ser cadastrados com nome e e-mail.
2. O e-mail deve ser uma chave única para identificar os usuários.
3. Os contatos devem conter pelo menos um nome e uma forma de contato (número de telefone, endereço de e-mail, etc.).
4. Somente usuários autenticados podem executar operações de criação, atualização e exclusão de contatos.
