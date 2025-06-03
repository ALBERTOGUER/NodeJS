import { createReadStream, createWriteStream } from "fs";
import { PassThrough, Duplex } from "stream";

class Throttle extends Duplex {
    constructor(ms) {
        super()
        this.delay = ms;
    }
    _write(chunk, encoding, callback) {
        this.push(chunk)
        setTimeout(callback(), this.delay)
    }

    _read() {

    }

    _final() {
        this.push(null)
    }
}
const readStream = createReadStream("./video.mp4")
const writeStream = createReadStream("./copy.mp4")
const report = new PassThrough();
const throttle = new Throttle(20);

const size = 0

report.on('data', (chunk) => {
    size += chunk.length
    console.log("bytes of data ", size)

})
readStream.pipe(throttle).pipe(report).pipe(writeStream)
