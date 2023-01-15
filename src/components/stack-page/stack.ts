interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    peak: () => number;
    printItems: () => T[];
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    get sizeStack(): number {
        return this.container.length
    };

    pop = (): void => {
        this.container.pop()
    }


    push = (item: T): void => {
        this.container.push(item)
    };


    clear = (): void => {
        this.container = [];

    }

    peak = (): number => this.sizeStack - 1;

    printItems = (): T[] => this.container;

}
