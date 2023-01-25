describe('Тестирование переходов по страницам', () => {
  beforeEach('проверка работоспособности сайта', () => {
    cy.visit('/');
  })
  describe('проверка переходов:', () => {
    it('по адресу localhost:3000/recursion', () => {
      cy.visit('/recursion');
      cy.contains('Строка')
    })
    it('по адресу localhost:3000/fibonacci', () => {
      cy.visit('/fibonacci');
      cy.contains('Последовательность Фибоначчи')
    })
    it('по адресу localhost:3000/sorting', () => {
      cy.visit('/sorting');
      cy.contains('Сортировка массива')
    })
    it('по адресу localhost:3000/stack', () => {
      cy.visit('/stack');
      cy.contains('Стек')
    })
    it('по адресу localhost:3000/queue', () => {
      cy.visit('/queue');
      cy.contains('Очередь')
    })
    it('по адресу localhost:3000/list', () => {
      cy.visit('/list');
      cy.contains('Связный список')
    })
  })
});
