export type Status = 'completed' | 'uninitiated' | 'started' 

export type Obra = {
    id: string,
    name: string,
    direction: string,
    status: Status,
    image: string
}