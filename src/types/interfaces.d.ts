interface User { 
    id: number
    firstName: string
    lastName: string
    email: string
    password: string
}

interface Item {
    id: number
    list_id: number
    name: string
    description: string
    checked: boolean
}

interface List {
    id: number
    title: string
    description: string
    creator_id: number
    user: User
    items: Item[]
}