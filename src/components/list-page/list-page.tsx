import React, {ChangeEvent, useState} from "react";
import {ArrowIcon, Button, Circle, Input, SolutionLayout} from "../ui";
import {LinkedList} from "./list";
import styles from './list-page.module.css';


const list = new LinkedList<number>()
export const ListPage: React.FC = () => {
  const [listItem, setListItem] = useState('');
  const [loader, setLoader] = useState<boolean>(false);
  const [listItems, setListItems] = useState<[]>([])

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setListItem(event.target.value)
  }
  const handlePrepend = async (item: string) => {
    setLoader(true)
    const value = Number(item)
    list.prepend(value)
    setListItems(list.toArray())
    setLoader(false)

  }
  const handleAppend = async (item: string) => {
    setLoader(true)
    const value = Number(item)
    list.append(value)
    setLoader(false)

  }
  const handleRemovedFromHead = () => {

  }
  const handleRemoveFromTail = () => {

  }
  const handelAddByIndex = (item: number, id: number) => {
    list.insertByIndex(item, id)
  }

  const handelDeleteByIndex = (id: number) => {
    list.deleteByIndex(id)

  }



  return (
      <SolutionLayout title="Связный список">
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.interfaces}>
              <form className={styles.interfaceValue} onSubmit={(event) => event.preventDefault()}>
                <Input placeholder={'Введите значение'}
                       isLimitText={true}
                       value={listItem}
                       onChange={handleChangeValue}
                       maxLength={4} extraClass={styles.input}/>
                <Button text={'Добавить в head'} onClick={() => handlePrepend(listItem)}/>
                <Button text={'Добавить в tail'} onClick={() => handleAppend(listItem)}/>
                <Button text={'Удалить из head'} onClick={() => handleRemovedFromHead()}/>
                <Button text={'Удалить из tail'} onClick={() => handleRemoveFromTail()}/>
              </form>
              <form className={styles.interfaceIndex} onSubmit={(event) => event.preventDefault()}>
                <Input placeholder={'Введите индекс'} extraClass={styles.input}/>
                <Button text={'Добавить по индексу'} onClick={() => handelAddByIndex(1, 1)}/>
                <Button text={'Удалить по индексу'} onClick={() => handelDeleteByIndex(1)}/>
              </form>
            </div>
            <ul className={styles.list}>
              {listItems && listItems.map((element, index) =>
                  <li className={styles.list__item} key={index}>
                    <Circle index={index} letter={String(element)}/>
                  </li>)}
            </ul>
          </div>
        </section>

      </SolutionLayout>
  );
};
