import React from "react";
import TestRenderer from 'react-test-renderer';
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe('Тестирование компонента Circle', () => {
    it('проверка компонента без буквы', () => {
        const circle = TestRenderer
            .create(<Circle/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('проверка компонента с буквами', () => {
        const circle = TestRenderer
            .create(<Circle letter={'hello'}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('проверка компонента с head', () => {
        const circle = TestRenderer
            .create(<Circle head={'1'}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('проверка компонента с react-элементом в head', () => {
        const circle = TestRenderer
            .create(<Circle head={<Circle/>}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('проверка компонента с tail', () => {
        const circle = TestRenderer
            .create(<Circle tail={'-1'}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('проверка компонента c react-элементом в tail', () => {
        const circle = TestRenderer
            .create(<Circle tail={<Circle/>}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('проверка компонента с index', () => {
        const circle = TestRenderer
            .create(<Circle index={0}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('проверка компонента с пропом isSmall ===  true', () => {
        const circle = TestRenderer
            .create(<Circle isSmall={true}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('проверка компонента в состоянии default', () => {
        const circle = TestRenderer
            .create(<Circle state={ElementStates.Default}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('проверка компонента в состоянии changing', () => {
        const circle = TestRenderer
            .create(<Circle state={ElementStates.Changing}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('проверка компонента в состоянии modified', () => {
        const circle = TestRenderer
            .create(<Circle state={ElementStates.Modified}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
})