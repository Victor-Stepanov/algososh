import {CIRCLE_CHANGING, CIRCLE_CIRCLE, CIRCLE_MODIFIED} from "../const/const";

describe('Строка', () => {
    beforeEach(() => {
        cy.visit('/recursion')
    });

    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').should('have.value', '')
        cy.get('button').should('be.disabled').contains('Развернуть')
    })
    it('если в инпуте есть значение, то кнопка добавления доступна ', () => {
        cy.get('input').type('dream')
        cy.get('button').should('not.be.disabled')
    })
    it('проверка разворота строки', () => {
        cy.get('input').type('dream').should('have.value', 'dream') //maerd
        cy.get('button').contains('Развернуть').click()
        cy.get(CIRCLE_CIRCLE).as("circle"); //@circle -> alias
        //Начальная строка
        cy.get('@circle').should('have.length', 5).each(($el, index) => {
            switch (index) {
                case  0:
                    cy.wrap($el).contains('d')
                    break;
                case 1:
                    cy.wrap($el).contains('r')
                    break;
                case  2:
                    cy.wrap($el).contains('e')
                    break;
                case  3:
                    cy.wrap($el).contains('a')
                    break;
                case 4:
                    cy.wrap($el).contains('m')
                    break;
                default:
                    return;


            }

        });
        cy.get('@circle').each(($el, index) => {
            switch (index) {
                case  0:
                    cy.wrap($el)
                        .should("have.css", "border", CIRCLE_MODIFIED)
                        .contains("m");
                    break;
                case 4:
                    cy.wrap($el)
                        .should("have.css", "border", CIRCLE_MODIFIED)
                        .contains('d')
                    break;
                case 0 || 4:
                    cy.wrap($el).should('have.css', 'border', CIRCLE_CHANGING)
                    break;
                default:
                    return;


            }

        });
        cy.get('@circle').each(($el, index) => {
            switch (index) {
                case  1:
                    cy.wrap($el)
                        .should("have.css", "border", CIRCLE_MODIFIED)
                        .contains("a");
                    break;
                case 3:
                    cy.wrap($el)
                        .should("have.css", "border", CIRCLE_MODIFIED)
                        .contains('r')
                    break;
                case 1 || 3:
                    cy.wrap($el).should('have.css', 'border', CIRCLE_CHANGING)
                    break;
                default:
                    return;


            }

        });
        cy.get('@circle').each(($el, index) => {
            switch (index) {
                case 2:
                    cy.wrap($el)
                        .should("have.css", "border", CIRCLE_MODIFIED)
                        .contains('e')
                    break;
                default:
                    return;


            }

        });
        //Итоговая строка
        cy.get('@circle').should('have.length', 5).each(($el, index) => {
            switch (index) {
                case  0:
                    cy.wrap($el).contains('m')
                    break;
                case 1:
                    cy.wrap($el).contains('a')
                    break;
                case  2:
                    cy.wrap($el).contains('e')
                    break;
                case  3:
                    cy.wrap($el).contains('r')
                    break;
                case 4:
                    cy.wrap($el).contains('d')
                    break;
                default:
                    return;

            }

        });

    })

})