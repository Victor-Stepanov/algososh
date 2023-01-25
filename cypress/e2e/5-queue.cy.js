import {
  CIRCLE_CIRCLE,
  CIRCLE_CONTENT,
  CIRCLE_DEFAULT,
} from '../../src/utils/const/const';

describe('Очередь', () => {
  beforeEach(() => {
    cy.visit('/queue');
  });
  it('если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').should('be.disabled').contains('Добавить');
    cy.get('button').should('be.disabled').contains('Удалить');
    cy.get('button').should('be.disabled').contains('Очистить');
    cy.get(CIRCLE_CIRCLE).as('circle');
    cy.get('@circle').should('have.length', 7);
  });
  it('проверка добавления элементов в очередь', () => {
    cy.get('input').type('111'); // 111
    cy.get('button').contains('Добавить').click();
    cy.get('input').should('have.value', '');
    cy.get(CIRCLE_CIRCLE).as('circle');
    cy.get(CIRCLE_CONTENT).as('circle-content');
    cy.get('@circle')
      .should('have.length', 7)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('111');
        }
        if (index === 0) {
          cy.wrap($el).should('have.css', 'border', CIRCLE_DEFAULT);
        }
      });
    cy.get('input').type('222'); // 222
    cy.get('button').contains('Добавить').click();
    cy.get('input').should('have.value', '');
    cy.get('@circle')
      .should('have.length', 7)
      .each(($el, index) => {
        if (index === 1) {
          cy.wrap($el).contains('222');
        }
        if (index === 1) {
          cy.wrap($el).should('have.css', 'border', CIRCLE_DEFAULT);
        }
      });
    cy.get('input').type('333'); // 222
    cy.get('button').contains('Добавить').click();
    cy.get('input').should('have.value', '');
    cy.get('@circle')
      .should('have.length', 7)
      .each(($el, index) => {
        if (index === 2) {
          cy.wrap($el).contains('333');
        }
        if (index === 2) {
          cy.wrap($el).should('have.css', 'border', CIRCLE_DEFAULT);
        }
      });
    cy.get('@circle-content')
      .should('have.length', 7)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('head');
            break;
          case 2:
            cy.wrap($el).contains('tail');
            break;
          default:
            return;
        }
      });
  });
  it('проверка удаления элементов из очереди', () => {
    cy.get('input').type('444');
    cy.get('button').contains('Добавить').click();
    cy.get('input').should('have.value', '');
    cy.get(CIRCLE_CIRCLE).as('circle');
    cy.get(CIRCLE_CONTENT).as('circle-content');
    cy.get('@circle')
      .should('have.length', 7)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('444');
        }
        if (index === 0) {
          cy.wrap($el).should('have.css', 'border', CIRCLE_DEFAULT);
        }
      });
    cy.get('input').type('555');
    cy.get('button').contains('Добавить').click();
    cy.get('input').should('have.value', '');
    cy.get('@circle')
      .should('have.length', 7)
      .each(($el, index) => {
        if (index === 1) {
          cy.wrap($el).contains('555');
        }
        if (index === 1) {
          cy.wrap($el).should('have.css', 'border', CIRCLE_DEFAULT);
        }
      });
    cy.get('input').type('66');
    cy.get('button').contains('Добавить').click();
    cy.get('input').should('have.value', '');
    cy.get('@circle')
      .should('have.length', 7)
      .each(($el, index) => {
        if (index === 2) {
          cy.wrap($el).contains('66');
        }
        if (index === 2) {
          cy.wrap($el).should('have.css', 'border', CIRCLE_DEFAULT);
        }
      });
    cy.get('button').contains('Удалить').click();
    cy.get('@circle')
      .should('have.length', 7)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).should('have.css', 'border', CIRCLE_DEFAULT);
            break;
          case 1:
            cy.wrap($el).contains('555');
            break;
          case 2:
            cy.wrap($el).contains('66');
            break;
          default:
            return;
        }
      });
    cy.get(CIRCLE_CONTENT)
      .should('have.length', 7)
      .each(($el, index) => {
        switch (index) {
          case 1:
            cy.wrap($el).contains('head');
            break;
          case 2:
            cy.wrap($el).contains('tail');
            break;
          default:
            return;
        }
      });
  });
  it('проверка очистки очереди', () => {
    cy.get('button').contains('Очистить').click();
    cy.get(CIRCLE_CIRCLE).as('circle');
    cy.get('@circle')
      .should('have.length', 7)
      .each($el => {
        expect($el.text(''));
      });
  });
});
