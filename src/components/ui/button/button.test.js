import React from "react";
import TestRenderer from 'react-test-renderer';
import {fireEvent, render, screen} from '@testing-library/react';
import {Button} from './button'
import {Direction} from "../../../types/direction";


describe('Тестирование компонента Button', () => {
    test('проверка кнопки с текстом', () => {
        const button = TestRenderer
            .create(<Button text={'Тест'}/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    })

    test('проверка кнопки без текста', () => {
        const button = TestRenderer
            .create(<Button />)
            .toJSON();
        expect(button).toMatchSnapshot();
    })
    test('проверка заблокированной кнопки', () => {
        const button = TestRenderer
            .create(<Button disabled={true}/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    })
    test('проверка кнопки с индикацией загрузки', () => {
        const button = TestRenderer
            .create(<Button isLoader={true}/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    })
    test('проверка кнопки c сортировкой по возрастанию', () => {
        const button = TestRenderer
            .create(<Button sorting={Direction.Ascending}/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    })
    test('проверка кнопки c сортировкой по убыванию', () => {
        const button = TestRenderer
            .create(<Button sorting={Direction.Descending}/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    })
    test('проврека кнопки с linkedList big', () => {
        const button = TestRenderer
            .create(<Button linkedList='big'/>)
            .toJSON()
        expect(button).toMatchSnapshot()
    })

    test('проврека кнопки с linkedList small', () => {
        const button = TestRenderer
            .create(<Button linkedList='small'/>)
            .toJSON()
        expect(button).toMatchSnapshot()
    })
    test('проверка корректности вызова колбека при клике на кнопку', () => {
        window.alert = jest.fn()
        render(<Button text={'Тест клика'} onClick={() => alert('кликнули')}/>)
        const button = screen.getByText("Тест клика");
        fireEvent.click(button)
        expect(window.alert).toHaveBeenCalledWith('кликнули')
    })
})