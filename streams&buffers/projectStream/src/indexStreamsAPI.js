import { pipeline } from 'node:stream/promises'

async function* myReadable() {
    yield Buffer.from("I am")
    await setTimeout(150)
    yield Buffer.from("Beto")
}

async function* myTransform(stream) {
    for await (const chunk of stream) {
        yield chunk.toString().toUpperCase()
    }
}

async function* myWritable(stream) {
    for await (const chunk of stream) {
        console.log("chunk", chunk.toString())
    }
}

async function* myDuplex(stream) {
    let bytes = 0
    const finalMessage = []
    for await (const chunk of stream) {
        console.log("duplex", chunk.toString())
        bytes += chunk.length
        finalMessage.push()
    }

    yield `final message is : ${finalMessage.join()}`
    yield `total bytes ${bytes}`
}

await pipeline(myReadable, myTransform, myDuplex, myWritable)