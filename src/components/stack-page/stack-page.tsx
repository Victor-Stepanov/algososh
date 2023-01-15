import React, {ChangeEvent, FC, useState} from "react";
import {Button, Circle, Input, SolutionLayout} from "../ui";
import {Stack} from "./stack";
import styles from "../stack-page/stack.module.css";
import {delay} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";

const stack = new Stack<string>();
export const StackPage: FC = () => {
  const [stackItems, setStackItems] = useState<string[]>([]);
  const [stackItem, setStackItem] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    add: false,
    delete: false,
    clear: false
  })


  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setStackItem(event.target.value)
  }

  const handleAddItem = async (item: string) => {
    setIsLoading({...isLoading, add: true})
    stack.push(item)
    setStackItems(stack.printItems())
    await delay(500)
    setCurrentIndex(currentIndex + 1)
    setIsLoading({...isLoading, add: false})
    setStackItem('')
  }


  const handleDeleteItem = async () => {
    setIsLoading({...isLoading, delete: true})
    stack.pop()
    setStackItems(stack.printItems())
    await delay(500)
    setCurrentIndex(currentIndex - 1)
    setIsLoading({...isLoading, delete: false})
  }

  const handleClearStack = async () => {
    setIsLoading({...isLoading, clear: true})
    stack.clear()
    setStackItems(stack.printItems())
    await delay(500)
    setCurrentIndex(0)
    setIsLoading({...isLoading, clear: false})
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
                        isLoader={isLoading.add}
                        onClick={() => handleAddItem(stackItem)}
                />
                <Button text={'Удалить'}
                        disabled={stackItems.length === 0}
                        isLoader={isLoading.delete}
                        onClick={handleDeleteItem}/>
              </div>
            </form>
            <div className={styles.buttons}>
              <Button text={'Очистить'}
                      disabled={stackItems.length === 0}
                      isLoader={isLoading.clear}
                      onClick={handleClearStack}
              />
            </div>
          </div>
          <ul className={styles.list}>
            {stackItems && stackItems.map((element, index) =>
                <li key={index}>
                  <Circle index={index} letter={element} head={stack.peak() === index ? "top" : ''}
                          state={currentIndex === index ? ElementStates.Changing : ElementStates.Default}
                  />
                </li>)}
          </ul>
        </section>
      </SolutionLayout>
  );
};
