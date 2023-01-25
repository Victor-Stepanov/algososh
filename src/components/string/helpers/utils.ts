import {ElementStates} from "../../../types/element-states";
import {TArrString} from "./string.types";

export const swap = (arr: TArrString[], firstIndex: number, secondIndex: number): void => {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]]

}
const reversArray = (arr: TArrString[]) => {
    const {length} = arr;
    let start = 0, end = length - 1
    while (start <= end) {
        if (start !== end) {
            arr[start].color = ElementStates.Changing;
            arr[end].color = ElementStates.Changing;
        }
        swap(arr, start, end)
        arr[start].color = ElementStates.Modified;
        arr[end].color = ElementStates.Modified;
        start++;
        end--;
    }
    return arr;

}
export default reversArray;


