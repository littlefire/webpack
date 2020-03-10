const express = require("express")
const app = express()
const port = 3000
const birdRouter = require("./src/routes/userRoutes")
// const finalhandler = require("finalhandler")
// const serveStatic = require("serve-static")

// app.use(serveStatic('public/ftp', { 'index': ['default.html', 'default.htm'] }))

// 路由的使用
app.use('/user',birdRouter)
// 静态文件的访问
app.use("/static",express.static('src/public'))
app.get('/',(req,res)=>{
    res.send("hello world")
})
app.listen(port,()=>{
    console.log(`Server started with port `+port)
})

/**
 * 1, Express 应用程序生成器
 * #1.1 npx express-generator
 * #1.2 npm i express-generator -g
 * 
 * 
 * 
 */