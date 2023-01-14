export class Node<T> {
    value: T
    next: Node<T> | null

    constructor(value: T, next?: Node<T> | null) {
        this.value = value; // Значение
        this.next = (next === undefined ? null : next); //Ссылка на следующий узел списка
    }
}

interface ILinkedList<T> {
    append: (element: T) => void; //Добавление нового элемента в конец списка
    prepend: (element: T) => void; // Добавление нового элемента в начало списка
    deleteHead: () => void; //Удалить элемент из головы
    deleteTail: () => void; //Удалить элемент из хвоста
    getSize: () => number;
    isEmpty: () => boolean; //Пустой ли?
    toArray: () => T[]

    insertByIndex: (element: T, index: number) => void; // Добавление по индексу
    deleteByIndex: (index: number) => void; //Удаление по индексу
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(element: T): void {
        const node = new Node(element); //Новый узел
        // ваш код
        if (this.head === null) {
            this.head = node;
        }
        if (!this.isEmpty()) {
            let prev = this.head;
            while (prev?.next) {
                prev = prev.next;
            }

            prev.next = node;
        }

        this.size++;
    }

    prepend(element: T):void {
        const node = new Node(element);
        if (!this.isEmpty()) {
            node.next = this.head
            this.head = node;
        }
        this.head = node;
        this.size++;

    }


    deleteHead():void {
        if (!this.head) {
            return;
        }
        this.head = this.head.next;
        this.size--;

    }

    deleteTail():void {
        let current = this.head;
        let previous;
        while (current?.next) {
            previous = current;
            current = current.next;
        }
        if (previous?.next) {
            previous.next = null;
        }
        this.size--;
    }

    insertByIndex(element: T, index: number): void {
        if (!(index < 0 || index > this.size)) {
            if (index === 0) {
                this.prepend(element)
            } else {
                const node = new Node(element);
                let prev = this.head;
                for (let i = 0; i < index - 1; i++) {
                    if (prev?.next) {
                        prev = prev.next
                    }
                }
                if (prev) {
                    node.next = prev.next;
                    prev.next = node;
                }
                this.size++;
            }
        }
        return;

    }

    deleteByIndex(index: number): void {
        if (!(index < 0 || index >= this.size)) {
            let removedNode = this.head;
            if (index === 0) {
                if (this.head) {
                    this.head = this.head.next;
                }
            } else {
                let prev = this.head;
                for (let i = 0; i < index - 1; i++) {
                    if (removedNode) {
                        removedNode = removedNode.next
                    }
                }
                if (prev?.next) {
                    prev.next = removedNode?.next ? removedNode.next : null;
                }


            }
            this.size--;
        }
        return;

    }

    getSize(): number {
        return this.size;
    }

    isEmpty = (): boolean => this.getSize() === 0;

    toArray(): T[] {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode.value)
            currentNode = currentNode.next;
        }

        return nodes;
    }

}

