import {CIRCLE_CHANGING, CIRCLE_CIRCLE, CIRCLE_DEFAULT} from "../const/const";

describe('Стек', () => {
    beforeEach(() => {
        cy.visit('/stack')
    })
    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').should('have.value', '')
        cy.get('button').should('be.disabled').contains('Добавить')
        cy.get('button').should('be.disabled').contains('Удалить')
        cy.get('button').should('be.disabled').contains('Очистить')
    })
    it('проверка добавления и удаления элемента в стек', () => {
        cy.get('input').type('5')
        cy.get('button').contains('Добавить').click()
        cy.get(CIRCLE_CIRCLE).as('circle')
        cy.get('@circle').should('have.length', 1).each(($el, index) => {
            if (index === 0) {
                cy.wrap($el).contains('5')
            }
            if (index === 0) {
                cy.wrap($el).should('have.css', 'border', CIRCLE_CHANGING)
            }
        })
        cy.get('@circle').should('have.length', 1).each(($el, index) => {
            if (index === 0) {
                cy.wrap($el).contains('5')
            }
            if (index === 0) {
                cy.wrap($el).should('have.css', 'border', CIRCLE_DEFAULT)
            }
        })
        cy.wait(1000)
        cy.get('input').should('have.value', '')
        cy.get('button').contains('Удалить').click()
        cy.get('@circle').should('have.length', 0)
    })
    it('проверка очистки стека', () => {
        cy.get('input').type('55')
        cy.get('button').contains('Добавить').click()
        cy.get(CIRCLE_CIRCLE).as('circle')
        cy.get('@circle').should('have.length', 1).each(($el, index) => {
            if (index === 0) {
                cy.wrap($el).contains('55')
            }
            if (index === 0) {
                cy.wrap($el).should('have.css', 'border', CIRCLE_CHANGING)
            }
        })
        cy.get('@circle').should('have.length', 1).each(($el, index) => {
            if (index === 0) {
                cy.wrap($el).contains('55')
            }
            if (index === 0) {
                cy.wrap($el).should('have.css', 'border', CIRCLE_DEFAULT)
            }
        })
        cy.get('input').should('have.value', '')
        cy.get('input').type('155')
        cy.get('button').contains('Добавить').click()
        cy.get('@circle').should('have.length', 2).each(($el, index) => {
            if (index === 1) {
                cy.wrap($el).contains('155')
            }
            if (index === 1) {
                cy.wrap($el).should('have.css', 'border', CIRCLE_CHANGING)
            }
        })
        cy.get('@circle').should('have.length', 2).each(($el, index) => {
            if (index === 1) {
                cy.wrap($el).contains('155')
            }
            if (index === 1) {
                cy.wrap($el).should('have.css', 'border', CIRCLE_DEFAULT)
            }
        })
        cy.wait(1000)
        cy.get('input').should('have.value', '')
        cy.get('button').contains('Очистить').click()
        cy.get('@circle').should('have.length', 0)

    })

})