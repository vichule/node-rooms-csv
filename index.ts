import fs from 'fs'

export interface Room {
    id: number,
    room_type: string,
    room_number: number,
    description: string,
    price: number,
    offer: boolean,
    discount: number,
    cancellation: string,
    photos: Array<string>,
    amenities: Array<string>,
    status: string
}

const readFiles = (): string =>{
    const roomContents = fs.readFileSync('rooms.json')
    

    return roomContents.toString()
}

const orderFilesByPrice = (): Room[] => {
    const rooms: Room[] = JSON.parse(readFiles())
    const orderedRooms = rooms.sort((a, b) => {
        if (a.price > b.price){
            return 1
        }else if (a.price < b.price){
            return -1
        }
        return 0
    })
    return orderedRooms
}

const jsonToCsv = (): void =>{
    const json: Room[] = orderFilesByPrice()
    let fields: string = Object.keys(json[0]).join(' | ');
    
    json.forEach(room => {
        fields +=  `\r\n "${room.id}", "${room.room_type}", "${room.room_number}", ${room.description}, "${room.price}", "${room.offer}",
                    "${room.discount}", "${room.cancellation}", "${room.photos.join(',').toString()}", "${room.amenities.join('-').toString()}",  "${room.status}";\n\r`;
    })

    fs.writeFileSync('./room.csv', fields)
}

jsonToCsv()