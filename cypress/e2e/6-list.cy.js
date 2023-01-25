import {
    CIRCLE_CIRCLE,
    CIRCLE_CONTENT,
    CIRCLE_DEFAULT
} from '../../src/utils/const/const';

describe('Список', () => {
  beforeEach(() => {
    cy.visit('/list');
  });
  it('если в инпуте пусто, то кнопки добавления недоступны', () => {
    cy.get("input[type='text']").should('have.value', '');
    cy.get("input[type='number']").should('have.value', '');
    cy.get('button').should('be.disabled').contains('Добавить в head');
    cy.get('button').should('be.disabled').contains('Добавить в tail');
    cy.get('button').should('be.disabled').contains('Добавить по индексу');
    cy.get('button').should('be.disabled').contains('Удалить по индексу');
  });
  it('проверка отрисовки дефолтного списка', () => {
    cy.get(CIRCLE_CIRCLE).as('circle');
    cy.get('@circle')
      .should('have.length', 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('12');
            break;
          case 1:
            cy.wrap($el).contains('33');
            break;
          case 2:
            cy.wrap($el).contains('44');
            break;
          case 3:
            cy.wrap($el).contains('55');
            break;
          default:
            return;
        }
      });
  });
  it('проверка добавления элемента в head', () => {
    cy.get("input[type='text']").type('33');
    cy.get('button').contains('Добавить в head').click();
    cy.get("input[type='text']").should('have.value', '');
    cy.get(CIRCLE_CIRCLE).as('circle');
    cy.get(CIRCLE_CONTENT).as('circle-content');
    cy.get('@circle')
      .should('have.length', 5)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('33');
        }
        if (index === 0) {
          cy.wrap($el).should('have.css', 'border', CIRCLE_DEFAULT);
        }
      });
    cy.get('@circle-content')
      .should('have.length', 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('head');
            break;
          case 4:
            cy.wrap($el).contains('tail');
            break;
          default:
            return;
        }
      });
  });
  it('проверка добавления элемента в tail', () => {
    cy.get("input[type='text']").type('133');
    cy.get('button').contains('Добавить в tail').click();
    cy.get("input[type='text']").should('have.value', '');
    cy.get(CIRCLE_CIRCLE).as('circle');
    cy.get(CIRCLE_CONTENT).as('circle-content');
    cy.get('@circle')
      .should('have.length', 5)
      .each(($el, index) => {
        if (index === 4) {
          cy.wrap($el).contains('133');
        }
      });
    cy.get('@circle-content')
      .should('have.length', 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('head');
            break;
          case 4:
            cy.wrap($el).contains('tail');
            break;
          default:
            return;
        }
      });
  });
  it('проверка добавления элемента по индексу', () => {
    cy.get("input[type='text']").type('99');
    cy.get("input[type='number']").type('3');
    cy.get('button').contains('Добавить по индексу').click();
    cy.get("input[type='text']").should('have.value', '');
    cy.get("input[type='number']").should('have.value', '');
    cy.get(CIRCLE_CIRCLE).as('circle');
    cy.get(CIRCLE_CONTENT).as('circle-content');
    cy.get('@circle')
      .should('have.length', 5)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('12');
            break;
          case 1:
            cy.wrap($el).contains('33');
            break;
          case 2:
            cy.wrap($el).contains('44');
            break;
          case 3:
            cy.wrap($el).contains('99');
            break;
          case 4:
            cy.wrap($el).contains('55');
            break;
          default:
            return;
        }
      });
  });
  it('проверка удаления элемента из head', () => {
    cy.get(CIRCLE_CIRCLE).as('circle');
    cy.get(CIRCLE_CONTENT).as('circle-content');
    cy.get('@circle')
      .should('have.length', 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('12');
            break;
          case 1:
            cy.wrap($el).contains('33');
            break;
          case 2:
            cy.wrap($el).contains('44');
            break;
          case 3:
            cy.wrap($el).contains('55');
            break;
          default:
            return;
        }
      });
    cy.get('@circle-content')
      .should('have.length', 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('head');
            break;
          case 3:
            cy.wrap($el).contains('tail');
            break;
          default:
            return;
        }
      });
    cy.get('button').contains('Удалить из head').click();
    cy.get('@circle')
      .should('have.length', 3)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('33');
            break;
          case 1:
            cy.wrap($el).contains('44');
            break;
          case 2:
            cy.wrap($el).contains('55');
            break;
          default:
            return;
        }
      });
    cy.get('@circle-content').each(($el, index) => {
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
  it('проверка удаления элемента из tail', () => {
    cy.get(CIRCLE_CIRCLE).as('circle');
    cy.get(CIRCLE_CONTENT).as('circle-content');
    cy.get('@circle')
      .should('have.length', 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('12');
            break;
          case 1:
            cy.wrap($el).contains('33');
            break;
          case 2:
            cy.wrap($el).contains('44');
            break;
          case 3:
            cy.wrap($el).contains('55');
            break;
          default:
            return;
        }
      });
    cy.get('@circle-content')
      .should('have.length', 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('head');
            break;
          case 3:
            cy.wrap($el).contains('tail');
            break;
          default:
            return;
        }
      });
    cy.get('button').contains('Удалить из tail').click();
    cy.get('@circle')
      .should('have.length', 3)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('12');
            break;
          case 1:
            cy.wrap($el).contains('33');
            break;
          case 2:
            cy.wrap($el).contains('44');
            break;
          default:
            return;
        }
      });
    cy.get('@circle-content').each(($el, index) => {
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
  it('проверка удаления элемента по индексу', () => {
    cy.get(CIRCLE_CIRCLE).as('circle');
    cy.get('@circle')
      .should('have.length', 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('12');
            break;
          case 1:
            cy.wrap($el).contains('33');
            break;
          case 2:
            cy.wrap($el).contains('44');
            break;
          case 3:
            cy.wrap($el).contains('55');
            break;
          default:
            return;
        }
      });
    cy.get(CIRCLE_CONTENT).as('circle-content');
    cy.get('@circle-content').each(($el, index) => {
      switch (index) {
        case 0:
          cy.wrap($el).contains('head');
          break;
        case 3:
          cy.wrap($el).contains('tail');
          break;
        default:
          return;
      }
    });
    cy.get("input[type='number']").type('3');
    cy.get('button').contains('Удалить по индексу').click();
    cy.get("input[type='number']").should('have.value', '');
    cy.get('@circle')
      .should('have.length', 3)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains('12');
            break;
          case 1:
            cy.wrap($el).contains('33');
            break;
          case 2:
            cy.wrap($el).contains('44');
            break;
          default:
            return;
        }
      });
    cy.get('@circle-content').each(($el, index) => {
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
});
