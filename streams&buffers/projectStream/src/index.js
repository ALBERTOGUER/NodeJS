import { createServer } from "http"
import { stat, createReadStream, createWriteStream } from "fs"
import { promisify } from "util"
const fileName = "./video.mp4"
const fileInfo = promisify(stat)

// handling range requests
// start bytes - end bytes


const respondWithvideoStream = async (req, res) => {
    // req and res are streams readable req, writable res
    const { size } = await fileInfo(fileName)

    const range = req.headers.range
    if (range) {
        const [start, end] = range.replace(/bytes=/, '').split('-') //[123,675]
        start = parseInt(start)
        end = end ? parseInt(end) : size - 1
        res.writeHead(206, {
            'content-range': `bytes ${start}-${end}/${size}`,
            'accept-range': 'bytes',
            'content-length': (end - start) + 1,
            'content-type': 'video/mp4',
        })
        createReadStream(fileName, { start, end }).pipe(res)
    } else {
        res.writeHead(200, {
            'content-length': size,
            'content-type': 'video/mp4',
        })
        createReadStream(fileName).pipe(res)
    }
    console.log('range request', range);



}

createServer((req, res) => {
    if (req.method == 'POST') {
        req.pipe(res)
        req.pipe(createWriteStream('./test-upload.file'))
    }
    else if (req.url == '/video') {
        respondWithvideoStream(req, res)
    } else {
        res.writeHead(200, {
            'content-type': 'text/html'
        })

        res.end(`
            <form enctype="multipart/form-data" method="POST" action="/">
                <input type="file" name="upload-file" /> 
                <button>Upload </button>
            </form>
            `)
    }
}).listen(3000, () => console.log('server is running'))