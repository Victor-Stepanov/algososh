import React, {ChangeEvent, FC, useState} from "react";
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
    value: string,
    color: ElementStates,
    action?: ListItemAction,
    circle?: {
        value: string;
    }

}
const initialArr = ['12', '33', '44', '55'];
const list = new LinkedList<string>(initialArr)
const defaultArr: TListItem[] = initialArr.map((item) => ({
    value: item,
    color: ElementStates.Default,
}))

export const ListPage: FC = () => {
    const [listItem, setListItem] = useState('');
    const [listIndex, setListIndex] = useState('');
    const [listItems, setListItems] = useState<TListItem[]>(defaultArr)
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
        list.prepend(item)
        listItems[0] = {
            ...listItems[0],
            action: ListItemAction.Add,
            circle: {
                value: item
            },
        }
        setListItems([...listItems])
        await delay(500)
        listItems[0] = {
            ...listItems[0],
            action: ListItemAction.Default,
            circle: {
                value: ''
            },
        }
        listItems.unshift({
            value: item,
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
        list.append(item)
        const {length} = listItems;
        const lastItem = length - 1;
        listItems[lastItem] = {
            ...listItems[lastItem],
            action: ListItemAction.Add,
            circle: {
                value: item
            },
        }
        setListItems([...listItems])
        await delay(500)
        listItems[lastItem] = {
            ...listItems[lastItem],
            action: ListItemAction.Default,
            circle: {
                value: ''
            },
        }
        listItems.push({
            value: item,
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
            value: '',
            action: ListItemAction.Delete,
            color: ElementStates.Modified,
            circle: {
                value: listItems[0].value
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
            value: '',
            action: ListItemAction.Delete,
            color: ElementStates.Modified,
            circle: {
                value: listItems[0].value
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
        const valueId = Number(id)
        let idx = 0;
        setIsLoading({...isLoading, addByIndex: true})
        list.insertByIndex(item, valueId)
        while (idx <= valueId) {
            listItems[idx] = {
                ...listItems[idx],
                action: ListItemAction.Add,
                circle: {
                    value: item
                }
            }
            if (idx > 0) {
                listItems[idx - 1] = {
                    ...listItems[idx - 1],
                    action: ListItemAction.Default,
                    color: ElementStates.Changing,
                    circle: {
                        value: ''
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
                value: ''
            }
        }
        listItems.splice(valueId, 0, {
            value: item,
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
        list.deleteByIndex(valueId)
        while (idx <= valueId) {
            listItems[idx].color = ElementStates.Changing;
            setListItems([...listItems])
            await delay(500)
            idx++;
        }
        listItems[valueId] = {
            ...listItems[valueId],
            value: '',
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
                            <Input value={listIndex} min={0} type="number" onChange={handleChangeIndex}
                                   placeholder={'Введите индекс'}
                                   extraClass={styles.input}/>
                            <Button disabled={!listIndex || Number(listIndex) > list.sizeList - 1}
                                    isLoader={isLoading.addByIndex} text={'Добавить по индексу'}
                                    onClick={() => handelAddByIndex(listItem, listIndex)}/>
                            <Button disabled={!listIndex || Number(listIndex) > list.sizeList - 1}
                                    text={'Удалить по индексу'} isLoader={isLoading.deleteByIndex}
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