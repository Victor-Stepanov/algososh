interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    peak: () => number;
    getSize: () => number;
    printItems: () => T[];
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    peak = (): number => this.getSize() - 1;

    pop = (): void => {
        this.container.pop()
    }


    push = (item: T): void => {
        this.container.push(item)
    };


    clear = (): void => {
        this.container = [];

    }
    getSize = (): number => this.container.length;

    printItems = (): T[] => this.container;

}
