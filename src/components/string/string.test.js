import reversArray from "./helpers/utils";
import {
    firstTest,
    firstTestRevers,
    fourthTestRevers,
    secondTest,
    secondTestRevers,
    thirdTest,
    thirdTestRevers,
    fourthTest,
} from "./helpers/testData";


describe('Тестирование алгоритма разворота строки', () => {
    test('проверка с чётным количеством символов',  () => {
        expect(reversArray(firstTest)).toEqual(firstTestRevers)

    })
    test('проверка с нечетным количеством символов', () => {
        expect(reversArray(secondTest)).toEqual(secondTestRevers)

    })
    test('проверка с одним символом', () => {
        expect(reversArray(thirdTest)).toEqual(thirdTestRevers)

    })
    test('проверка пустой строки', () => {
        expect(reversArray(fourthTest)).toEqual(fourthTestRevers)
    })


})