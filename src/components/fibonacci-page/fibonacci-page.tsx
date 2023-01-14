import React, {ChangeEvent, FormEvent, useState} from "react";
import {Button, Circle, Input, SolutionLayout} from "../ui";
import styles from "./fibonacci.module.css";
import {delay} from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<string>('') //input
  const [fibArr, setFibArr] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false) // loader
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const findFib = async (item: string) => {
    setIsLoading(true)
    let result: number[] = [0, 1];
    for (let i = 2; i <= Number(item); i++) {
      await delay(500);
      result[i] = result[i - 2] + result[i - 1];
      setFibArr([...result])

    }
    setIsLoading(false)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await findFib(value)
    setValue('')

  }


  return (
      <SolutionLayout title="Последовательность Фибоначчи">
        <section className={styles.section}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input min={1} max={19} isLimitText type="number" value={value}
                   onChange={handleChangeValue}/>
            <Button onClick={handleSubmit} text="Рассчитать" isLoader={isLoading} type='submit'
                    disabled={!value || Number(value) > 19}/>
          </form>
          <ul className={styles.list}>
            {fibArr.map((element, index) =>
                <li key={index}>
                  <Circle index={index} letter={element.toString()}/>
                </li>)}
          </ul>
        </section>
      </SolutionLayout>
  );
};
