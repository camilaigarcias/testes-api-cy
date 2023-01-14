/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contracts'
var faker = require('faker');
const Faker = require('faker');


describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(15)

          })
     });



     it('Deve cadastrar um usuário com sucesso', () => {
          let nomeFaker = faker.name.firstName()
          let emailFaker = faker.internet.email()

          cy.cadastrarUsuario(nomeFaker, emailFaker, "abc123", "true")
               .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal("Cadastro realizado com sucesso")
               })



     });

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuario("Fulano da Silva", "fulano@qa.com", "1234", "true")
               .then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.body.message).to.equal("Este email já está sendo usado")
               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let nomeFaker = faker.name.firstName()
          let emailFaker = faker.internet.email()

          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[1]._id
               cy.editarUsuario(nomeFaker, emailFaker, "axv111", "true")
                    .then(response => {
                         expect(response.status).to.equal(201)
                         expect(response.body.message).to.equal("Cadastro realizado com sucesso")
                    })




          })




     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let nomeFaker = faker.name.firstName()
          let emailFaker = faker.internet.email()
          cy.cadastrarUsuario(nomeFaker, emailFaker, "abcd", "true")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: "DELETE",
                         url: `usuarios/${id}`

                    }).then(response => {
                         expect(response.body.message).to.equal("Registro excluído com sucesso")
                         expect(response.status).to.equal(200)


                    })





               })





     });


});
