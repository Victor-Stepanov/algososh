import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Stack} from "./stack";
import {Button, Circle, Input} from "../ui";
import styles from "../stack-page/stack.module.css";
import {delay} from "../../utils/utils";

const stack = new Stack<string>();
export const StackPage: React.FC = () => {
  //TODO: Добавить визуальное отоброжение
  const [loader, setLoader] = useState<boolean>(false)
  const [stackItems, setStackItems] = useState<string[]>([]);
  const [stackItem, setStackItem] = useState<string>('');


  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setStackItem(event.target.value)
  }

  const handleAddItem = async (item: string) => {
    setLoader(true)
    stack.push(item)
    setStackItems(stack.printItems())
    await delay(500)
    setStackItem('')
    setLoader(false)
  }


  const handleDeleteItem = async () => {
    setLoader(true)
    stack.pop()
    setStackItems(stack.printItems())
    await delay(500)
    setLoader(false)
  }

  const handleClearStack = async () => {
    setLoader(true)
    stack.clear()
    setStackItems(stack.printItems())
    await delay(500)
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
                        isLoader={loader}
                        onClick={handleDeleteItem}/>
              </div>
            </form>
            <div className={styles.buttons}>
              <Button text={'Очистить'}
                      isLoader={loader}
                      onClick={handleClearStack}
              />
            </div>
          </div>
          <ul className={styles.list}>
            {stackItems && stackItems.map((element, index) =>
                <li className={styles.list__item} key={index}>
                  <Circle index={index} letter={element} head={stack.peak() === index ? "top" : ''}/>
                </li>)}
          </ul>
        </section>
      </SolutionLayout>
  );
};
