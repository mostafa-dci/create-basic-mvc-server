const http =  require('http')
const {log} = require('console')
const readFile = require('./models/readFile')

const server = http.createServer((req, res)=>{
    // if browser asking for front-end files

    if(req.url.split('/')[1] === "assets"){
        readFile.getFileContent(__dirname + "/public" + req.url).then(data=>{
            let ext = req.url.split('.')[req.url.split('.').length - 1]
            if(ext === 'js'){
                res.writeHead(200, {"content-type": "text/javascript"})
            }else if(ext === "css"){
                res.writeHead(200, {"content-type": "text/css"})
            }else{
                res.writeHead(200, {"content-type": "image/" + ext})
            }
            res.end(data);
        }).catch(error=>{
            res.writeHead(404)
            res.end(JSON.stringify(error))
        })

    }else{
        // getting homepage
        if(req.url === "/"){
            readFile.getFileContent(__dirname + "/views/index.html").then(data=>{
                res.writeHead(200, {"content-type": "text/html"})
                res.end(data)
            }).catch(error=>{
                log(error)
                readFile.getFileContent(__dirname + "/views/notfound.html").then(data=>{
                    res.writeHead(404, {"content-type": "text/html"})
                    res.end(data)
                }).catch(error=>{
                    log(error)
                    res.writeHead(404)
                    res.end("Page Not Found")
                })
            })  
        }else{
            readFile.getFileContent(__dirname + "/views" + req.url + ".html").then(data=>{
                res.writeHead(200, {"content-type": "text/html"})
                res.end(data)
            }).catch(error=>{
                log(error)
                readFile.getFileContent(__dirname + "/views/notfound.html").then(data=>{
                    res.writeHead(404, {"content-type": "text/html"})
                    res.end(data)
                }).catch(error=>{
                    log(error)
                    res.writeHead(404)
                    res.end("Page Not Found")
                })
            })
        }
        
    }

})


server.listen(3000, ()=>log("Server is running on port 3000"))