import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Stack} from "./stack";
import {Button, Circle, Input} from "../ui";
import styles from "../stack-page/stack.module.css";
import {delay} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";

const stack = new Stack<string>();
export const StackPage: React.FC = () => {
  //TODO: Добавить визуальное отоброжение
  const [loader, setLoader] = useState<boolean>(false)
  const [stackItems, setStackItems] = useState<string[]>([]);
  const [stackItem, setStackItem] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);


  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setStackItem(event.target.value)
  }

  const handleAddItem = async (item: string) => {
    setLoader(true)
    stack.push(item)
    setStackItems(stack.printItems())
    await delay(500)
    setCurrentIndex(currentIndex + 1)
    setStackItem('')
    setLoader(false)
  }


  const handleDeleteItem = async () => {
    setLoader(true)
    stack.pop()
    setStackItems(stack.printItems())
    await delay(500)
    setCurrentIndex(currentIndex - 1)
    setLoader(false)
  }

  const handleClearStack = async () => {
    setLoader(true)
    stack.clear()
    setStackItems(stack.printItems())
    await delay(500)
    setCurrentIndex(0)
    setLoader(false)
  }



  return (
      <SolutionLayout title="Стек">
        <section className={styles.section}>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
              <Input isLimitText={true} maxLength={4} value={stackItem} onChange={handleChangeValue}/>
              <div className={styles.buttons}>
                <Button text={'Добавить'}
                        disabled={!stackItem}
                        isLoader={loader}
                        onClick={() => handleAddItem(stackItem)}
                />
                <Button text={'Удалить'}
                        disabled={stackItems.length === 0}
                        isLoader={loader}
                        onClick={handleDeleteItem}/>
              </div>
            </form>
            <div className={styles.buttons}>
              <Button text={'Очистить'}
                      disabled={stackItems.length === 0}
                      isLoader={loader}
                      onClick={handleClearStack}
              />
            </div>
          </div>
          <ul className={styles.list}>
            {stackItems && stackItems.map((element, index) =>
                <li className={styles.list__item} key={index}>
                  <Circle index={index} letter={element} head={stack.peak() === index ? "top" : ''}
                          state={currentIndex === index ? ElementStates.Changing : ElementStates.Default}
                  />
                </li>)}
          </ul>
        </section>
      </SolutionLayout>
  );
};
