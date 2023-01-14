import React, {ChangeEvent, useState} from "react";
import {ArrowIcon, Button, Circle, Input, SolutionLayout} from "../ui";
import {LinkedList} from "./list";
import styles from './list-page.module.css';
import {delay} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";


enum ListItemAction {
    Add = 'add',
    Delete = 'delete',
    Default = ''

}

type TListItem = {
    value: number | null,
    color: ElementStates,
    action?: ListItemAction,
    circle?: {
        value: number | null
    }

}

const list = new LinkedList<number>()
const getRandomInt = (minLength: number = 4, maxLength: number = 6) =>
    Math.floor(Math.random() * (maxLength - minLength) + minLength)

const newRandomArr = (): TListItem[] => {
    const arr = [];
    const arrLength = getRandomInt()
    for (let i = 0; i < arrLength; i++) {
        arr.push({
            value: Math.round(Math.random() * 100),
            color: ElementStates.Default

        })
    }
    return arr;
}

export const ListPage: React.FC = () => {
    const [listItem, setListItem] = useState<string>('');
    const [listIndex, setListIndex] = useState<string>('');
    const [listItems, setListItems] = useState<TListItem[]>(newRandomArr())
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
        prepend: false,
        append: false,
        removeHead: false,
        removeTail: false,
        addByIndex: false,
        deleteByIndex: false
    })


    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
        setListItem(event.target.value)
    }

    const handleChangeIndex = (event: ChangeEvent<HTMLInputElement>): void => {
        setListIndex(event.target.value)

    }
    const handlePrepend = async (item: string) => {
        setIsLoading({...isLoading, prepend: true})
        const value = Number(item)
        list.prepend(value)
        listItems[0] = {
            ...listItems[0],
            action: ListItemAction.Add,
            circle: {
                value: value
            },
        }
        setListItems([...listItems])
        await delay(500)
        listItems[0] = {
            ...listItems[0],
            action: ListItemAction.Default,
            circle: {
                value: null
            },
        }
        listItems.unshift({
            value: value,
            color: ElementStates.Modified
        })
        setListItems([...listItems])
        await delay(500)
        setListItem('')

        await delay(500)
        listItems.map(item => item.color = ElementStates.Default)
        setListItem('')
        setIsLoading({...isLoading, prepend: false})

    }
    const handleAppend = async (item: string) => {
        setIsLoading({...isLoading, append: true})
        const value = Number(item)
        list.append(value)
        const {length} = listItems;
        const lastItem = length - 1;
        listItems[lastItem] = {
            ...listItems[lastItem],
            action: ListItemAction.Add,
            circle: {
                value: value
            },
        }
        setListItems([...listItems])
        await delay(500)
        listItems[lastItem] = {
            ...listItems[lastItem],
            action: ListItemAction.Default,
            circle: {
                value: null
            },
        }
        listItems.push({
            value: value,
            color: ElementStates.Modified
        })
        setListItems([...listItems])
        await delay(500)
        listItems.map(item => item.color = ElementStates.Default)
        setListItem('')
        setIsLoading({...isLoading, append: false})

    }
    const handleRemovedFromHead = async () => {
        setIsLoading({...isLoading, removeHead: true})
        listItems[0] = {
            ...listItems[0],
            value: null,
            action: ListItemAction.Delete,
            color: ElementStates.Modified,
            circle: {
                value: listItems[0].value as number
            },
        }
        list.deleteHead()
        setListItems([...listItems])
        await delay(500)
        listItems.shift()
        setListItems([...listItems])
        setIsLoading({...isLoading, removeHead: false})

    }
    const handleRemoveFromTail = async () => {
        setIsLoading({...isLoading, removeTail: true})
        const {length} = listItems;
        const lastItem = length - 1;
        listItems[lastItem] = {
            ...listItems[lastItem],
            value: null,
            action: ListItemAction.Delete,
            color: ElementStates.Modified,
            circle: {
                value: listItems[0].value as number
            },
        }
        list.deleteTail()
        setListItems([...listItems])
        await delay(500)
        listItems.pop()
        setListItems([...listItems])
        setIsLoading({...isLoading, removeTail: false})

    }
    const handelAddByIndex = async (item: string, id: string) => {
        const value = Number(item);
        const valueId = Number(id)
        let idx = 0;
        setIsLoading({...isLoading, addByIndex: true})
        list.insertByIndex(value, valueId)
        while (idx <= valueId) {
            listItems[idx] = {
                ...listItems[idx],
                action: ListItemAction.Add,
                circle: {
                    value: value
                }
            }
            if (idx > 0) {
                listItems[idx - 1] = {
                    ...listItems[idx - 1],
                    action: ListItemAction.Default,
                    color: ElementStates.Changing,
                    circle: {
                        value: null
                    }
                }
            }
            setListItems([...listItems])
            await delay(500)
            idx++;
        }
        listItems[valueId] = {
            ...listItems[valueId],
            action: ListItemAction.Default,
            circle: {
                value: null
            }
        }
        listItems.splice(valueId, 0, {
            value: value,
            color: ElementStates.Modified
        })
        listItems.map(item => item.color = ElementStates.Default)
        setListItems([...listItems])
        await delay(500)
        setIsLoading({...isLoading, addByIndex: false})
        setListItem('')
        setListIndex('')
    }

    const handelDeleteByIndex = async (id: string) => {
        const valueId = Number(id)
        let idx = 0;
        setIsLoading({...isLoading, deleteByIndex: true})
        if (valueId > list.getSize()) {
        }
        list.deleteByIndex(valueId)
        while (idx <= valueId) {
            listItems[idx].color = ElementStates.Changing;
            setListItems([...listItems])
            await delay(500)
            idx++;
        }
        listItems[valueId] = {
            ...listItems[valueId],
            value: null,
            action: ListItemAction.Delete,
            circle: {
                value: listItems[valueId].value
            }
        }
        setListItems([...listItems])
        await delay(500)
        listItems.splice(valueId, 1)
        setListItems([...listItems])
        await delay(500)
        listItems.map(item => item.color = ElementStates.Default)
        setIsLoading({...isLoading, deleteByIndex: false})
        setListIndex('')
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
                            <Button disabled={!listItem} isLoader={isLoading.prepend} text={'Добавить в head'}
                                    onClick={() => handlePrepend(listItem)}/>
                            <Button disabled={!listItem} isLoader={isLoading.append} text={'Добавить в tail'}
                                    onClick={() => handleAppend(listItem)}/>
                            <Button disabled={list.isEmpty()} text={'Удалить из head'} isLoader={isLoading.removeHead}
                                    onClick={handleRemovedFromHead}/>
                            <Button disabled={list.isEmpty()} text={'Удалить из tail'} isLoader={isLoading.removeTail}
                                    onClick={handleRemoveFromTail}/>
                        </form>
                        <form className={styles.interfaceIndex} onSubmit={(event) => event.preventDefault()}>
                            <Input value={listIndex} onChange={handleChangeIndex} placeholder={'Введите индекс'}
                                   extraClass={styles.input}/>
                            <Button disabled={!listIndex} isLoader={isLoading.addByIndex} text={'Добавить по индексу'}
                                    onClick={() => handelAddByIndex(listItem, listIndex)}/>
                            <Button disabled={!listIndex} text={'Удалить по индексу'} isLoader={isLoading.deleteByIndex}
                                    onClick={() => handelDeleteByIndex(listIndex)}/>
                        </form>
                    </div>
                    <ul className={styles.list}>
                        {listItems && listItems.map((element, index) =>
                            <li className={styles.listItem} key={index}>
                                {element.action === ListItemAction.Add && (
                                    <Circle
                                        isSmall={true}
                                        extraClass={styles.circleAdd}
                                        state={ElementStates.Changing}
                                        letter={String(element.circle?.value)}
                                    />
                                )}
                                <Circle
                                    index={index}
                                    state={element.color}
                                    letter={String(element.value)}
                                    head={index === 0 && element.action !== ListItemAction.Add ? "head" : ""}
                                    tail={index === listItems.length - 1 && element.action !== ListItemAction.Add ? "tail" : ""}
                                />
                                {index < listItems.length - 1 && <ArrowIcon/>}
                                {element.action === ListItemAction.Delete && (
                                    <Circle
                                        isSmall={true}
                                        extraClass={styles.circleDelete}
                                        state={ElementStates.Changing}
                                        letter={String(element.circle?.value)}
                                    />
                                )}
                            </li>)}
                    </ul>
                </div>
            </section>
        </SolutionLayout>
    );
};