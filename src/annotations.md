# Tipos de testes

    - Unitários: Unidade da sua aplicação
    - Integração: Comunicação entre duas ou mais unidades
    - e2e - ponta a ponta: Simulam um usuário operando na nossa aplicação

    FRONT-END:
     e2e - Abre a página de login, digite o texto guilherme@email.com no campo com ID email, clique no botão

    BACK-END:
    e2e- chamadas HTTP, WebSockets

    //Pirâmide de testes:
        E2E (não dependem de nenhuma tecnologia, não dependem de arquitetura) | (muito lentos)
        Integração
        Unitários (são a base da pirâmide de testes, são os mais realizados) | (exigem uma melhor arquitetura)
