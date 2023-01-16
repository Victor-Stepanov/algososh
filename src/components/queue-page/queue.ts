interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    printItems: () => Array<T | undefined>;
    isEmpty: () => boolean;
    clearQueue: () => void;

}

export class Queue<T> implements IQueue<T> {
    private container: (T | undefined)[] = [];
    private head = 0;
    private tail = 0;

    private length: number = 0;

    constructor(private readonly size: number = 0) {
        this.size = size;
        this.container = Array(size)
    }

    get headQueue() {
        return this.head;
    }

    enqueue = (item: T) => { // отвечает за вставку или отправку нового элемента в очередь.
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
    }

    isEmpty = () => this.length === 0;

    get tailQueue() {
        return this.tail;
    }

    get lengthQueue() {
        return this.length;
    }

    dequeue = () => { //отвечает за удаление первого элемента из очереди.
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        this.container[this.head % this.size] = undefined;
        this.head++;
        this.length--;

    };

    printItems = () => [...this.container];
    clearQueue = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.container = [];

    }


}