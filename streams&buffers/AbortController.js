
import { Readable, pipeline } from "stream";
import { setTimeout, setInterval } from "timers/promises";


async function* myReadable(ac) {
    for await (const interval of setInterval(300)) {
        if (ac.signal.aborted) break
        yield Buffer.from('beto')
    }


}

async function* myWritable(stream) {
    for await (const chunk of stream) {
        console.log("writable", chunk.toString());

    }
}

const abortController = new AbortController()

abortController.signal.onabort = () => {
    console.log("the process was aborted")
}

setTimeout(() => { abortController.abort() }, 1000)
try {

    await pipeline(Readable.from(myReadable()), myWritable, { signal: abortController.signal })
} catch (e) {

}

pipeline(myReadable, myWritable, { signal: abortController.signal })
