describe('Teste de Cadastro', () => {
    // Antes de cada teste, acesse a página inicial
    beforeEach(() => {
        cy.visit('https://sign-up-gules.vercel.app/')
    });
    it('CT01 - Deve realizar o cadastro com sucesso', () => {
        // Aqui preenche o campo de e-mail
        cy.get('#email').type('test@exemplo.com');
        // Aqui preencha o campo de Senha
        cy.get('#password').type('Test#1234');
        // Aqui preenche o campo Confirme senha 
        cy.get('#confirmPassword').type('Test#1234')
        // Aqui clica no botão Sing Up
        cy.get('button').click();
        // Aqui valida se a mensagem de sucesso do alert aparece
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Cadastro realizado com sucesso!');
        });
    });

    it('CT02 - Deve exibir mensagem de erro ao tentar cadastrar um e-mail inválido', () => {
        // Aqui preenche o campo de e-mail
        cy.get('#email').type('test@.com');
        // Aqui preencha o campo Senha
        cy.get('#password').type('Test#1234');
        // Aqui preenhece o campo Confirma a Senha  
        cy.get('#confirmPassword').type('Test#1234')

        // Aqui clica no botão Sing Up
        cy.get('button').click();

        // Verifique se a mensagem de erro apareceu
        cy.get('#emailError').invoke('text').then((erro) => {
            const msgErro = erro.trim();
            expect('Email inválido.').to.equal(msgErro);
        });
    });

    it('CT03 - Validar Senha ', () => {
        // Aqui preenche o campo de e-mail com endereço válido
        cy.get('#email').type('test@exemplo.com');
        // Aqui preencha o campo  Senha
        cy.get('#password').type('Test&123456');
        // Aqui preenche o campo Confirma a Senha  
        cy.get('#confirmPassword').type('Test&1234')

        // Aqui clica no botão Sing Up
        cy.get('button').click();

        cy.get('#password').invoke('val') //Aqui guarda o valor da senha do na vareavel val
            .then((senha) => {
                cy.get('#confirmPassword')
                    .invoke('val') // Aqui confirma se as senhas são iguais
                    .should('not.equal', senha); // Aqui verifica se as senhas são diferentes
            });
    });

    it('CT04 - Validar mensagem campo obrigatório - E-mail ', () => {
        cy.get('#email')
        cy.get('#password').type('Test#1234'); // Aqui preenche o campo Senha
        cy.get('#confirmPassword').type('Test#1234'); // Aqui preenche o campo Confirme a Senha

        // Aqui clica no botão  Sing Up
        cy.get('button').click();


        cy.get('#emailError', { timeout: 10000 })  // Selecione o elemento com o erro
            .invoke('show')  // Força o erro a ser visível (apenas para testes)
            .should('not.visible'); // Aqui valida se a mensagem está visivel 
    });

    it('CT05 - Validar mensagem campo obrigatório - Senha ', () => {
        // Aqui preenche o campo de e-mail
        cy.get('#email').type('Test!@exemplo.com')
        cy.get('#password'); //Aqui o campo senha fica em branco para a mesagem ficar visivel

        // Aqui clica no botão Sign up
        cy.get('button').click();

        cy.get('#emailError', { timeout: 10000 })  // Selecione o elemento com o erro
            .invoke('show')  // Força o erro a ser visível (apenas para testes)
            .should('not.visible');

    });
    it('CT06 - Validar mensagem campo obrigatório - Confirme a Senha ', () => {
        // Aqui preenche o campo de e-mail
        cy.get('#email').type('Test!@exemplo.com');
        cy.get('#password').type('Test!1234456');
        cy.get('#confirmPassword'); //Aqui o campo senha fica em branco para a mesagem ficar visivel

        // Aqui clica no botão Sign up
        cy.get('button').click();

        cy.get('#emailError', { timeout: 10000 })  // Selecione o elemento com o erro
            .invoke('show')  // Força o erro a ser visível (apenas para testes)
            .should('not.visible');
    });

    it('CT07 - Deve exibir e ocultar senha do campo Senha', () => {
        // Aqui preenche o campo  senha
        cy.get('#password').type('Test#1234');
        cy.get('[qa-datatest="formGroup-password"] > .password-container > .toggle-password')
            .click()  // Exibe a senha
            .wait(2000)
            .click(); // Oculta a senha
    });

    it('CT08 - Deve exibir e ocultar senha  do campo Confirme a Senha', () => {
        // Aqui preenche o campo Confirme a Senha
        cy.get('#confirmPassword').type('Casa123!')
        cy.get('[qa-datatest="formGroup-confirmPassword"] > .password-container > .toggle-password')
            .click()  // Exibe a senha
            .wait(2000)
            .click(); // Oculta a senha
    });

    it('CT09 - Ativar e Dasativar  modo noturno', () => {
        // Aqui Ativa o  modo noturno
        cy.get('#darkModeIcon').should('be.visible').click();
        cy.get('body').should('have.class', 'dark-mode');
        cy.get('body').should('have.css', 'background-color', 'rgb(51, 51, 51)');

        cy.wait(3000);

        cy.get('#darkModeIcon').click(); // Desativa o modo noturno
        cy.get('body').should('not.have.class', 'dark-mode');
        cy.get('body').should('have.css', 'background-color', 'rgb(244, 244, 244)');

    });

});






