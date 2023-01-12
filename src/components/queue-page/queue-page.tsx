import React, {ChangeEvent, useState} from "react";
import {Button, Circle, Input, SolutionLayout} from "../ui";
import styles from "./queue.module.css";
import {Queue} from "./queue";
import {delay} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";

const QUEUE_SIZE: number = 7;
const queue = new Queue<number>(QUEUE_SIZE)
export const QueuePage: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [queueItem, setQueueItem] = useState<string>('');
  const [queueItems, setQueueItems] = useState<(number | null)[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQueueItem(event.target.value)
  }

  const handleAddItem = async (item: string) => {
    let queueItem = Number(item);
    setLoader(true)
    queue.enqueue(queueItem)
    setQueueItems(queue.printItems())
    await delay(500)
    setCurrentIndex(currentIndex + 1)
    setLoader(false)
    setQueueItem('')

  }

  const handleDeleteItem = async () => {
    setLoader(true)
    queue.dequeue()
    setQueueItems(queue.printItems())
    await delay(500)
    setCurrentIndex(currentIndex - 1)
    setLoader(false)
  }

  const handleClearQueue = async () => {
    setLoader(true)
    queue.clearQueue()
    setQueueItems(queue.printItems())
    await delay(500)
    setCurrentIndex(0)
    setLoader(false)
  }


  return (
      <SolutionLayout title="Очередь">
        <section className={styles.section}>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
              <Input isLimitText={true} maxLength={4} value={queueItem} onChange={handleChangeInput}/>
              <div className={styles.buttons}>
                <Button text={'Добавить'}
                        isLoader={loader}
                        disabled={QUEUE_SIZE === queue.getLength() || !queueItem}
                        onClick={() => handleAddItem(queueItem)}
                />
                <Button text={'Удалить'}
                        isLoader={loader}
                        disabled={queue.isEmpty()}
                        onClick={handleDeleteItem}
                />
              </div>
            </form>
            <div className={styles.buttons}>
              <Button text={'Очистить'}
                      isLoader={loader}
                      disabled={queue.isEmpty()}
                      onClick={handleClearQueue}
              />
            </div>
          </div>
          <ul className={styles.list}>
            {queueItems && queueItems.map((element, index) =>
                <li className={styles.list__item} key={index}>
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
