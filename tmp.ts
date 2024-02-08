class User {
    private readonly name: string;
    private readonly age:number; 

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    showAll() {
        const a = [this.name, this.age].map((v) => {
            console.warn(v)
        })
    }
}

function getEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

const user = new User('tom', 5)
user.showAll()

