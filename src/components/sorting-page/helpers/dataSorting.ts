import {TSortedArr} from "./sorting.types";
import {ElementStates} from "../../../types/element-states";

export const firstTestSorting: TSortedArr[] = []
export const firstTestResult: TSortedArr[] = []
export const secondTestSorting: TSortedArr[] = [{
    value: 9,
    color: ElementStates.Default

}]

export const secondTestResult: TSortedArr[] = [{
    value: 9,
    color: ElementStates.Modified
}]

export const thirdTestSorting: TSortedArr[] = [
    {
        value: 9,
        color: ElementStates.Default

    },
    {
        value: 38,
        color: ElementStates.Default

    },
    {
        value: 52,
        color: ElementStates.Default

    },
    {
        value: 39,
        color: ElementStates.Default

    },
]
export const thirdTestResultAscending: TSortedArr[] = [
    {
        value: 9,
        color: ElementStates.Modified

    },
    {
        value: 38,
        color: ElementStates.Modified

    },
    {
        value: 39,
        color: ElementStates.Modified

    },
    {
        value: 52,
        color: ElementStates.Modified

    },
]
export const thirdTestResultDescending: TSortedArr[] = [
    {
        value: 52,
        color: ElementStates.Modified

    },
    {
        value: 39,
        color: ElementStates.Modified

    },
    {
        value: 38,
        color: ElementStates.Modified

    },
    {
        value: 9,
        color: ElementStates.Modified

    },
]