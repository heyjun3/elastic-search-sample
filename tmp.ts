type Account = {
    id: string,
    email: string,
}

class User {
    private readonly name: string;
    private readonly age:number; 
    readonly account: Account;
    readonly tenant: string;

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

type U = NestedKeyOf<User>
const u: U = "account.email"
const keys = ["showAll", "tenant"] as const
type Typekeys = typeof keys[number]

type NestedKeyOf<ObjectType extends object> = 
{[Key in keyof ObjectType]: ObjectType[Key] extends object 
? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
: Key
}[keyof ObjectType];


