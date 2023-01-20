import {TSortedArr} from "./sorting.types";
import {ElementStates} from "../../../types/element-states";

const getRandomInt = (minLength: number = 3, maxLength: number = 17) =>
    Math.floor(Math.random() * (maxLength - minLength) + minLength)

export const newRandomArr = (): TSortedArr[] => {
    const arr = [];
    const arrLength = getRandomInt()
    for (let i = 0; i < arrLength; i++) {
        arr.push({
            value: Math.round(Math.random() * 100),
            color: ElementStates.Default

        })
    }
    return arr;
}

export const swap = (arr: TSortedArr[], firstIndex: number, secondIndex: number): void => {
    [arr[firstIndex].value, arr[secondIndex].value] = [arr[secondIndex].value, arr[firstIndex].value]
}


const bubbleSortAscending = (arr: TSortedArr[]) => {
    const {length} = arr;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            arr[j].color = ElementStates.Changing;
            arr[j + 1].color = ElementStates.Changing;
            if (arr[j].value > arr[j + 1].value) {
                swap(arr, j, j + 1);
            }
            arr[j].color = ElementStates.Default;
            arr[j + 1].color = ElementStates.Default;
        }
        arr[arr.length - i - 1].color = ElementStates.Modified;
    }
    return arr;
}


const bubbleSortDescending = (arr: TSortedArr[]) => {
    const {length} = arr;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            arr[j].color = ElementStates.Changing;
            arr[j + 1].color = ElementStates.Changing;
            if (arr[j].value < arr[j + 1].value) {
                swap(arr, j, j + 1);
            }
            arr[j].color = ElementStates.Default;
            arr[j + 1].color = ElementStates.Default;

        }
        arr[arr.length - i - 1].color = ElementStates.Modified;

    }
    return arr;

}

const selectionSortAscending = (arr: TSortedArr[]) => {

    const {length} = arr;
    for (let i = 0; i < length; i++) {
        let minInd = i;
        arr[minInd].color = ElementStates.Changing;
        for (let j = i + 1; j < length; j++) {
            if (arr[j].value < arr[minInd].value) {
                minInd = j;
            }
        }
        swap(arr, i, minInd)
        arr[minInd].color = ElementStates.Default;
        arr[i].color = ElementStates.Modified;
    }
    return arr;

}
const selectionSortDescending = (arr: TSortedArr[]) => {
    const {length} = arr;
    for (let i = 0; i < length; i++) {
        let maxInd = i;
        arr[maxInd].color = ElementStates.Changing;
        for (let j = i + 1; j < length; j++) {
            if (arr[j].value > arr[maxInd].value) {
                maxInd = j;
            }
        }
        swap(arr, i, maxInd)
        arr[maxInd].color = ElementStates.Default;
        arr[i].color = ElementStates.Modified;
    }
    return arr;

}

export const handleChooseSorting = (type: string, condition: string, arr: TSortedArr[]) => {
    if (type === 'bubble' && condition === "ascending") {
        return bubbleSortAscending(arr)
    }
    if (type === 'bubble' && condition === "descending") {
        return bubbleSortDescending(arr)
    }
    if (type === 'selection' && condition === "ascending") {
        return selectionSortAscending(arr)
    }
    if (type === 'selection' && condition === "descending") {
        return selectionSortDescending(arr)
    }

}

