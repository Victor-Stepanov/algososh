import {CIRCLE_CIRCLE} from "../const/const";

describe('Фибоначчи', () => {
    beforeEach(() => {
        cy.visit('/fibonacci')
    });

    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').should('have.value', '')
        cy.get('button').should('be.disabled').contains('Рассчитать')
    })
    it('если в инпуте есть значение, то кнопка добавления доступна ', () => {
        cy.get('input').type('12')
        cy.get('button').should('not.be.disabled')
    })

    it('проверка расчета значения Фибоначчи', () => {
        cy.get('input').type('10')
        cy.get('button').contains('Рассчитать').click()
        cy.get(CIRCLE_CIRCLE).as('circle')
        cy.get('@circle').should('have.length', 10).each(($el, index) => {
            switch (index) {
                case 0:
                    cy.wrap($el).contains('0')
                    break;
                case 1:
                    cy.wrap($el).contains('1')
                    break;
                case 2:
                    cy.wrap($el).contains('1')
                    break;
                case 3:
                    cy.wrap($el).contains('2')
                    break;
                case 4:
                    cy.wrap($el).contains('3')
                    break;
                case 5:
                    cy.wrap($el).contains('5')
                    break;
                case 6:
                    cy.wrap($el).contains('8')
                    break;
                case 7:
                    cy.wrap($el).contains('13')
                    break;
                case 8:
                    cy.wrap($el).contains('21')
                    break;
                case 9:
                    cy.wrap($el).contains('34')
                    break;
                case 10:
                    cy.wrap($el).contains('55')
                    break;
                default:
                    return;
            }
        })
    });

})