import React, {ChangeEvent, FormEvent, useState} from "react";
import {Button, Circle, Input, SolutionLayout} from "../ui";
import styles from "./queue.module.css";
import {Queue} from "./queue";
import {delay} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";

const QUEUE_SIZE: number = 7;
const queue = new Queue<number>(QUEUE_SIZE)
export const QueuePage: React.FC = () => {
    const [queueItem, setQueueItem] = useState<string>('');
    const [queueItems, setQueueItems] = useState<(number | null)[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
        add: false,
        delete: false,
        clear: false
    })

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setQueueItem(event.target.value)
    }

    const handleAddItem = async (item: string) => {
        let queueItem = Number(item);
        setIsLoading({...isLoading, add: true})
        queue.enqueue(queueItem)
        setQueueItems(queue.printItems())
        await delay(500)
        setCurrentIndex(currentIndex + 1)
        setIsLoading({...isLoading, add: false})
        setQueueItem('')

    }

    const handleDeleteItem = async () => {
        setIsLoading({...isLoading, delete: true})
        queue.dequeue()
        setQueueItems(queue.printItems())
        await delay(500)
        setCurrentIndex(currentIndex - 1)
        setIsLoading({...isLoading, delete: false})
    }

    const handleClearQueue = async () => {
        setIsLoading({...isLoading, clear: true})
        queue.clearQueue()
        setQueueItems(queue.printItems())
        await delay(500)
        setCurrentIndex(0)
        setIsLoading({...isLoading, clear: false})
    }


    return (
        <SolutionLayout title="Очередь">
            <section className={styles.section}>
                <div className={styles.container}>
                    <form className={styles.form}
                          onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}>
                        <Input isLimitText={true} maxLength={4} value={queueItem} onChange={handleChangeInput}/>
                        <div className={styles.buttons}>
                            <Button text={'Добавить'}
                                    isLoader={isLoading.add}
                                    disabled={QUEUE_SIZE === queue.getLength() || !queueItem}
                                    onClick={() => handleAddItem(queueItem)}
                            />
                            <Button text={'Удалить'}
                                    isLoader={isLoading.delete}
                                    disabled={queue.isEmpty()}
                                    onClick={handleDeleteItem}
                            />
                        </div>
                    </form>
                    <div className={styles.buttons}>
                        <Button text={'Очистить'}
                                isLoader={isLoading.clear}
                                disabled={queue.isEmpty()}
                                onClick={handleClearQueue}
                        />
                    </div>
                </div>
                <ul className={styles.list}>
                    {queueItems && queueItems.map((element, index) =>
                        <li key={index}>
                            <Circle index={index} letter={String(element)}
                                    head={queue.getHead() === index ? "head" : ''}
                                    tail={queue.getTail() - 1 === index ? 'tail' : ''}
                                    state={currentIndex === index ? ElementStates.Changing : ElementStates.Default}
                            />
                        </li>)}
                </ul>
            </section>

        </SolutionLayout>
    );
};
