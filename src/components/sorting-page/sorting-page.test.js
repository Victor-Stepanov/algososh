import {handleChooseSorting} from "./helpers/utils";
import {
    firstTestResult,
    firstTestSorting,
    secondTestResult,
    secondTestSorting,
    thirdTestResultAscending,
    thirdTestResultDescending,
    thirdTestSorting
} from "./helpers/dataSorting";


describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {

    describe('проверка пустого массива:', () => {
        test('пузырьком по возрастанию', () => {
            expect(handleChooseSorting('bubble', 'ascending', firstTestSorting))
                .toEqual(firstTestResult)
        })
        test('пузырьком по убыванию', () => {
            expect(handleChooseSorting('bubble', 'descending', firstTestSorting))
                .toEqual(firstTestResult)

        })
        test('выбором по возрастанию', () => {
            expect(handleChooseSorting('selection', 'ascending', firstTestSorting))
                .toEqual(firstTestResult)

        })
        test('выбором по убыванию', () => {
            expect(handleChooseSorting('selection', 'descending', firstTestSorting))
                .toEqual(firstTestResult)

        })

    })
    describe('проверка массива из одного элемента:', () => {
        test('пузырьком по возрастанию', () => {
            expect(handleChooseSorting('bubble', 'ascending', secondTestSorting))
                .toEqual(secondTestResult)
        })
        test('пузырьком по убыванию', () => {
            expect(handleChooseSorting('bubble', 'descending', secondTestSorting))
                .toEqual(secondTestResult)

        })
        test('выбором по возрастанию', () => {
            expect(handleChooseSorting('selection', 'ascending', secondTestSorting))
                .toEqual(secondTestResult)

        })
        test('выбором по убыванию', () => {
            expect(handleChooseSorting('selection', 'descending', secondTestSorting))
                .toEqual(secondTestResult)

        })

    })
    describe('проверка массива из нескольких элементов:', () => {
        test('пузырьком по возрастанию', () => {
            expect(handleChooseSorting('bubble', 'ascending', thirdTestSorting))
                .toEqual(thirdTestResultAscending)
        })
        test('пузырьком по убыванию', () => {
            expect(handleChooseSorting('bubble', 'descending', thirdTestSorting))
                .toEqual(thirdTestResultDescending)

        })
        test('выбором по возрастанию', () => {
            expect(handleChooseSorting('selection', 'ascending', thirdTestSorting))
                .toEqual(thirdTestResultAscending)

        })
        test('выбором по убыванию', () => {
            expect(handleChooseSorting('selection', 'descending', thirdTestSorting))
                .toEqual(thirdTestResultDescending)

        })

    })
})