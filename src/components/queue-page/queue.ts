interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    printItems: () => (T | null)[];
    isEmpty: () => boolean;
    getHead: () => number;
    getTail: () => number;
    getLength: () => number;
    clearQueue: () => void;

}

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size)
    }

    dequeue = () => { //отвечает за удаление первого элемента из очереди.
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        this.container[this.head % this.size] = null;
        this.head++;
        this.length--;

    };

    enqueue = (item: T) => { // отвечает за вставку или отправку нового элемента в очередь.
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        if (this.tail > 6) {
            return this.container;
        }
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
    }

    isEmpty = () => this.length === 0;


    getHead = () => {
        return this.head;
    }

    getTail = () => {
        return this.tail;
    }

    getLength = () => {
        return this.length;
    }

    printItems = (): (T | null)[] => [...this.container];
    clearQueue = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.container = [];

    }


}