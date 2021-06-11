const express = require('express')
const app = express();
const mainMiddleware = (req, res, next) => {
    req.customProperty = 100;
    req.nothing = 1000;
    next();
}
const errhandlers = (err, req, res, next) => {
    if (err) res.json({ err: err })
    next()
}
const nextMiddleware = (req, res, next) => {
    req.customProperty = 600
    next();

}
const LastMiddleWare = (req, res, next) => {
    res.send({ valll, innerWare, })
}
const firstMiddleWare = (req, res, next) => {
    const new_Error = new Error('i am new error')
    const innerWare = () => {
        const value = 'fuck your middleware'
        return value
    }
    const vallll = 1000
    next([vallll, innerWare(), new_Error])
}

app.use(mainMiddleware)
app.use(nextMiddleware)
app.get('/', (req, res, next) => {
    res.send(`value of custom property is ${req.customProperty} and value of nothing is ${req.nothing}`)
});
app.use(errhandlers)
app.get('/home', firstMiddleWare, LastMiddleWare)
app.listen(3000, () => console.log('server listening at port 3000'))