describe('Тестирование переходов по страницам', () => [
    beforeEach('проверка работоспособности сайта', () => {
        cy.visit('/')
    }),
    it('проверка переходов', () => {
        cy.visit('/recursion')
        cy.visit('/fibonacci')
        cy.visit('/sorting')
        cy.visit('/stack')
        cy.visit('/queue')
        cy.visit('/list')
    })
])