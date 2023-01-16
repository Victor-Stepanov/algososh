import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {Button, Column, RadioInput, SolutionLayout} from "../ui";
import styles from './sorting-page.module.css';
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/utils";


type TSortedArr = {
  value: number,
  color: ElementStates
}

export const SortingPage: FC = () => {
  const [typeSorting, setTypeSorting] = useState('select') //Тип сортировки
  const [sortedArr, setSortedArr] = useState<TSortedArr[]>([]); //Массив для сортировки
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    ascending: false,
    descending: false
  })


  //1. Создаем новый массив
  const getRandomInt = (minLength: number = 3, maxLength: number = 17) =>
      Math.floor(Math.random() * (maxLength - minLength) + minLength)

  const newRandomArr = (): TSortedArr[] => {
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
  const handleCreateNewArr = () => {
    setSortedArr([...newRandomArr()])
  }
  //2. Выбираем сортировку
  const handleSelectSorting = (event: ChangeEvent<HTMLInputElement>) => {
    setTypeSorting(event.target.value)
  }
  //3. Выбираем тип сортировки
  const handleSelectAscending = async () => {
    if (typeSorting !== 'bubble') {
      await selectionSortAscending(sortedArr)
    } else {
      await bubbleSortAscending(sortedArr)
    }

  }
  const handleSelectDescending = async () => {
    if (typeSorting !== 'bubble') {
      await selectionSortDescending(sortedArr)
    } else {
      await bubbleSortDescending(sortedArr)
    }

  }

  //4. Сортировки
  const swap = (arr: TSortedArr[], firstIndex: number, secondIndex: number): void => {
    [arr[firstIndex].value, arr[secondIndex].value] = [arr[secondIndex].value, arr[firstIndex].value]
  }

  const bubbleSortAscending = async (arr: TSortedArr[]) => {
    setIsLoading({...isLoading, ascending: true})
    const {length} = arr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setSortedArr([...arr])
        await delay(500)
        if (arr[j].value > arr[j + 1].value) {
          swap(arr, j, j + 1);
          await delay(500)
        }
        arr[j].color = ElementStates.Default;
        arr[j + 1].color = ElementStates.Default;
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
      await delay(500)
    }
    setIsLoading({...isLoading, ascending: false})
  }


  const bubbleSortDescending = async (arr: TSortedArr[]) => {
    setIsLoading({...isLoading, descending: true})
    const {length} = arr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setSortedArr([...arr])
        await delay(500)
        if (arr[j].value < arr[j + 1].value) {
          swap(arr, j, j + 1);
          await delay(500)
        }
        arr[j].color = ElementStates.Default;
        arr[j + 1].color = ElementStates.Default;

      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
      await delay(500)

    }
    setIsLoading({...isLoading, descending: false})

  }

  const selectionSortAscending = async (arr: TSortedArr[]) => {
    setIsLoading({...isLoading, ascending: true})
    const {length} = arr;
    for (let i = 0; i < length; i++) {
      let minInd = i;
      arr[minInd].color = ElementStates.Changing;
      setSortedArr([...arr])
      await delay(500)
      for (let j = i + 1; j < length; j++) {
        if (arr[j].value < arr[minInd].value) {
          minInd = j;
        }
      }
      swap(arr, i, minInd)
      arr[minInd].color = ElementStates.Default;
      arr[i].color = ElementStates.Modified;
      setSortedArr([...arr])
      await delay(500)
    }
    setIsLoading({...isLoading, ascending: false})
  }
  const selectionSortDescending = async (arr: TSortedArr[]) => {
    setIsLoading({...isLoading, descending: true})
    const {length} = arr;
    for (let i = 0; i < length; i++) {
      let maxInd = i;
      arr[maxInd].color = ElementStates.Changing;
      setSortedArr([...arr])
      await delay(500)
      for (let j = i + 1; j < length; j++) {
        if (arr[j].value > arr[maxInd].value) {
          maxInd = j;
        }
      }
      swap(arr, i, maxInd)
      arr[maxInd].color = ElementStates.Default;
      arr[i].color = ElementStates.Modified;
      setSortedArr([...arr])
      await delay(500)
    }
    setIsLoading({...isLoading, descending: false})

  }


  useEffect(() => {
    handleCreateNewArr()
  }, [])


  return (
      <SolutionLayout title="Сортировка массива">
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.buttonsBox}>
              <div className={styles.buttonsRadio}>
                <RadioInput
                    label={"Выбор"}
                    value={'select'}
                    checked={typeSorting === 'select'}
                    onChange={handleSelectSorting}
                />
                <RadioInput
                    label={"Пузырёк"}
                    value={'bubble'}
                    checked={typeSorting === 'bubble'}
                    onChange={handleSelectSorting}
                />
              </div>
              <div className={styles.buttonsSorting}>
                <Button text={'По возрастанию'}
                        sorting={Direction.Ascending}
                        onClick={handleSelectAscending}
                        disabled={isLoading.descending}
                        isLoader={isLoading.ascending}
                />
                <Button text={'По убыванию'}
                        sorting={Direction.Descending}
                        disabled={isLoading.ascending}
                        isLoader={isLoading.descending}
                        onClick={handleSelectDescending}/>
              </div>
              <div className={styles.buttonsArr}>
                <Button onClick={handleCreateNewArr} disabled={isLoading.ascending || isLoading.descending}
                        text={'Новый массив'}/>
              </div>
            </div>
            <ul className={styles.list}>
              {sortedArr && sortedArr.map((item, index) => <li key={index}>
                <Column index={item.value} state={item.color}/>
              </li>)}
            </ul>
          </div>
        </section>

      </SolutionLayout>
  );
};
