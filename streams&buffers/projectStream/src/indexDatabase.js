import { pipeline, Readable } from "node:stream"
import { promisify } from "node:util"
import sqlite3 from "sqlite3"
import { createWriteStream } from "node:fs"



const connection = sqlite3.verbose()
const db = new connection.Database("./data/db")

const promisifiedSerialize = promisify(db.serialize.bind(db))
const promisifiedRun = promisify(db.run.bind(db))
const promisifiedAll = promisify(db.all.bind(db))

await promisifiedSerialize()

async function* findAllStream() {
    let pageLimi = 10
    let skip = 0

    while (true) {
        const data = await promisifiedAll(
            `SELECT * FROM users LIMIT${pageLimi} OFFSET ${skip}`
        )

        skip += pageLimi
        if (!data.length) break
        for (const item of data) yield item
    }
}

const stream = Readable.from(findAllStream()).filter(({ age }) => age > 30 && age < 40).map(async (item) => {
    const name = await Promise.resolve(item.name.toUpperCase())
    return {
        ...item,
        name,
        editeAt: new Date().toDateString()
    }
})

await pipeline(stream, createWriteStream("./data/ouput.json"))

stream.forEach((item => console.log(item)
))