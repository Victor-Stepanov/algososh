import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../stack-page/stack.module.css";
import {Button, Circle, Input} from "../ui";
import {Queue} from "./queue";
import {delay} from "../../utils/utils";

const QUEUE_SIZE: number = 7;
const queue = new Queue<number>(QUEUE_SIZE)
export const QueuePage: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [queueItem, setQueueItem] = useState<string>('');
  const [queueItems, setQueueItems] = useState<(number | null)[]>([])

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQueueItem(event.target.value)
  }

  const handleAddItem = async (item: string) => {
    let queueItem = Number(item);
    setLoader(true)
    queue.enqueue(queueItem)
    setQueueItems(queue.printItems())
    await delay(500)
    setLoader(false)
    setQueueItem('')

  }

  const handleDeleteItem = async () => {
    setLoader(true)
    queue.dequeue()
    setQueueItems(queue.printItems())
    await delay(500)
    setLoader(false)
  }

  const handleClearQueue = async () => {
    setLoader(true)
    queue.clear()
    setQueueItems(queue.printItems())
    await delay(500)
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
                  />
                </li>)}
          </ul>
        </section>

      </SolutionLayout>
  );
};
