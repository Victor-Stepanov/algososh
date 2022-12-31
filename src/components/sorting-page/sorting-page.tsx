import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Button, Column, RadioInput} from "../ui";
import styles from './sorting-page.module.css';
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/utils";


type TSortedArr = {
  value: number,
  color: ElementStates
}
export const SortingPage: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false); //Loader
  const [typeSorting, setTypeSorting] = useState('select') //Тип сортировки
  const [isAscending, setIsAscending] = useState<boolean>(false); //Флаг по возрастанию
  const [type, setType] = useState<string>('');
  const [sortedArr, setSortedArr] = useState<TSortedArr[]>([]); //Массив для сортировки


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
  //3. Выбираем критерий сортировки
  const handleSelectAscending = async () => {
    setIsAscending(true)
    setType('ascending')
    if (typeSorting === 'bubble' && type === 'ascending') {
      await bubbleSort(sortedArr)
    } else {
      await selectionSort(sortedArr)
    }

  }
  const handleSelectDescending = async () => {
    setIsAscending(false)
    setType('descending');
    if (typeSorting === 'bubble' && type === 'descending') {
      await bubbleSort(sortedArr)
    } else {
      await selectionSort(sortedArr)
    }

  }

  //4. Сортировки
  const swap = (arr: TSortedArr[], firstIndex: number, secondIndex: number): void => {
    [arr[firstIndex].value, arr[secondIndex].value] = [arr[secondIndex].value, arr[firstIndex].value]
  }

  const bubbleSort = async (arr: TSortedArr[]) => {
    setLoader(true)
    const {length} = arr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setSortedArr([...arr])
        await delay(500)
        //По возрастанию
        if (isAscending) {
          if (arr[j].value > arr[j + 1].value) {
            swap(arr, j, j + 1);
            await delay(500)
          }
        }
        //По убыванию
        else {
          if (arr[j].value < arr[j + 1].value) {
            swap(arr, j, j + 1);
            await delay(500)
          }
        }
        arr[j].color = ElementStates.Default;
        arr[j + 1].color = ElementStates.Default;
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
      await delay(500)
    }
    setLoader(false);
  }
  const selectionSort = async (arr: TSortedArr[]) => {
    setLoader(true)
    const {length} = arr;
    for (let i = 0; i < length; i++) {
      if (isAscending) {
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
      } else {
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
    }
    setLoader(false)

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
                    value='select'
                    checked={typeSorting === 'select'}
                    onChange={handleSelectSorting}
                />
                <RadioInput
                    label={"Пузырёк"}
                    value='bubble'
                    checked={typeSorting === 'bubble'}
                    onChange={handleSelectSorting}
                />
              </div>
              <div className={styles.buttonsSorting}>
                <Button text={'По возрастанию'}
                        sorting={Direction.Ascending}
                        disabled={loader}
                        onClick={handleSelectAscending}
                        isLoader={loader && type === 'ascending'}
                />
                <Button text={'По убыванию'}
                        sorting={Direction.Descending}
                        disabled={loader}
                        isLoader={loader && type === 'descending'}
                        onClick={handleSelectDescending}/>
              </div>
              <div className={styles.buttonsArr}>
                <Button onClick={handleCreateNewArr} disabled={loader} text={'Новый массив'}/>
              </div>
            </div>
            <ul className={styles.list}>
              {sortedArr && sortedArr.map((item, index) => <li className={styles.list__item} key={index}>
                <Column index={item.value} state={item.color}/>
              </li>)}
            </ul>
          </div>
        </section>

      </SolutionLayout>
  );
};
