import React from "react";
import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button'


describe('Тестирование компонента Button', () => {
    test('проверка кнопки с текстом', () => {
        const button = TestRenderer
            .create(<Button text={'Тест'} />)
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
            .create(<Button disabled={true} />)
            .toJSON();
        expect(button).toMatchSnapshot();
    })
    test('проверка кнопки с индикацией загрузки', () => {
        const button = TestRenderer
            .create(<Button isLoader={true} />)
            .toJSON();
        expect(button).toMatchSnapshot();
    })
    test('проверка корректности вызова колбека при клике на кнопку', () => {
        window.alert = jest.fn()
        render(<Button text={'Тест клика'} onClick={() => alert('кликнули')} />)
        const button = screen.getByText("Тест клика");
        fireEvent.click(button)
        expect(window.alert).toHaveBeenCalledWith('кликнули')
    })
})