import { Transform } from "stream";

class ChangeText extends Transform {
    constructor(char) {
        super()
        this.replaceChar = char
    }

    _transform(chunk, encoding, callback) {
        const transfromedChunk = chunk.toString().replace(/[a-z]|[A-Z]|[0-9]/, this.replaceChar)
        this.push(transfromedChunk)
        callback()
    }

    _flush(callback) {
        this.push('more chunk of data is being passed')
        callback()
    }
}

var smileStream = new ChangeText(":)")
process.stdin.pipe(smileStream).pipe(process.stdout)