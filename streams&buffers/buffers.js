import { error } from "console"
import fs from "fs"
import http from "http"

const file = "video.mp4"

http
    .createServer((req, res) => {
        fs.readFile(file, (error, data) => {
            if (error) {
                console.log(error)
                res.writeHead(500, { "content-type": "text/plain" })
                res.end("internal server error")
                return
            }

            res.writeHead(200, { "content-type": "video/mp4" })
            res.end(data)
        })
    })
    .listen(3000, () => console.log("buffer running"))