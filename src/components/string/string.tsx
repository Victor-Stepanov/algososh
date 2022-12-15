import React, {ChangeEvent, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Button, Circle, Input} from "../ui";
import styles from './string.module.css';
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/utils";


type TArrString = {
    item: string;
    color: ElementStates
}

export const StringComponent: React.FC = () => {
    const [value, setValue] = useState<string>('') //input
    const [reveresArr, setReveresArr] = useState<TArrString[]>([]) // arrStr
    const [loader, setLoader] = useState<boolean>(false) // loader
    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    //Swap элементов
    const swap = (arr: TArrString[], firstIndex: number, secondIndex: number): void => {
        [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]]

    }


    const reversArray = async (arr: TArrString[]) => {
        setLoader(true);
        const {length} = arr;
        let start = 0, end = length - 1
        while (start <= end) {
            if (start !== end) {
                arr[start].color = ElementStates.Changing;
                arr[end].color = ElementStates.Changing;
                setReveresArr([...arr])
                await delay(1000)
            }
            swap(arr, start, end)
            arr[start].color = ElementStates.Modified;
            arr[end].color = ElementStates.Modified;
            setReveresArr([...arr])
            start++;
            end--;
        }
        setLoader(false)

    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const arr = value.split('').map(item => ({
            item,
            color: ElementStates.Default
        }))
        reversArray(arr)
        setValue('')

    }

    return (
        <SolutionLayout title="Строка">
            <section className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input isLimitText={true} maxLength={11} value={value} onChange={handleChangeValue}/>
                    <Button onClick={handleSubmit} text="Развернуть" isLoader={loader} type='submit' disabled={!value}/>
                </form>
                <ul className={styles.list}>
                    {reveresArr.map((element, index) =>
                        <li className={styles.list__item} key={index}>
                            <Circle letter={element.item} state={element.color}/>
                        </li>)}
                </ul>
            </section>
        </SolutionLayout>
    );
};
