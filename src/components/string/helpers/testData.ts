import {ElementStates} from "../../../types/element-states";
import {TArrString} from "./string.types";

export const firstTest: TArrString[] = [
    {
        item: 'h',
        color: ElementStates.Default
    },
    {
        item: 'e',
        color: ElementStates.Default
    },
    {
        item: 'l',
        color: ElementStates.Default
    },
    {
        item: 'p',
        color: ElementStates.Default
    },

]
export const firstTestRevers: TArrString[] = [
    {
        item: 'p',
        color: ElementStates.Modified
    },
    {
        item: 'l',
        color: ElementStates.Modified
    },
    {
        item: 'e',
        color: ElementStates.Modified
    },
    {
        item: 'h',
        color: ElementStates.Modified
    },

]

export const secondTest: TArrString[] = [
    {
        item: 'h',
        color: ElementStates.Default
    },
    {
        item: 'e',
        color: ElementStates.Default
    },
    {
        item: 'l',
        color: ElementStates.Default
    },


]
export const secondTestRevers: TArrString[] = [
    {
        item: 'l',
        color: ElementStates.Modified
    },
    {
        item: 'e',
        color: ElementStates.Modified
    },
    {
        item: 'h',
        color: ElementStates.Modified
    },

]

export const thirdTest: TArrString[] = [
    {
        item: 'l',
        color: ElementStates.Default
    },

]
export const thirdTestRevers: TArrString[] = [
    {
        item: 'l',
        color: ElementStates.Modified
    },

]

export const fourthTest: TArrString[] = [
    {
        item: '',
        color: ElementStates.Default
    },

]
export const fourthTestRevers: TArrString[] = [
    {
        item: '',
        color: ElementStates.Modified
    },

]