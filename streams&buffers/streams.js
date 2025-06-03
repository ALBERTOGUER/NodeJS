import { Readable } from "stream"
import fs from "fs"
import { log } from "console"

const rivers = [
    "Amazon",
    "Nile",
    "Missisipi",
    "ganges",
    "Danube",
    "Mekong"
]

class ArrayStream extends Readable {
    constructor(array) {
        super()
        this.array = array
        this.indec = 0
    }
    _read() {
        if (this.indec <= this.array.length) {

            const chunk = this.array[this.indec]
            this.push(chunk)
            this.indec += 1
        } else {
            this.push(null)
        }
    }
}
const riversStream = new ArrayStream(rivers)

riversStream.on("data", (chunk) => console.log(chunk))
riversStream.on("end", () => console.log("end"))

const readStream = fs.createReadStream("vide.mp4")
const writeStream = fs.createWriteStream("./copy.mp4", { highWaterMark: 162922 })

readStream.on("data", (chunk) => {
    console.log("size of chunk");
    const res = writeStream.write(chunk)
    if (!res) {
        //backpressure
        readStream.pause()
    }
})
readStream.pipe(writeStream).on("error", (chunk) => {
    console.log("stream ended");

})

writeStream.on("drain", () => {
    readStream.resume()
})

readStream.on("end", (chunk) => {
    console.log("stream ended");

})

readStream.on("error", (chunk) => {
    console.log("stream ended");

})

readStream.pause()

process.stdin.on("data", (chunk) => {
    if (chunk.toString().trim() == "end") {
        readStream.resume()
    }
    readStream.read()
})

writeStream.on("close", () => {
    process.stdout.write('file copied')
})