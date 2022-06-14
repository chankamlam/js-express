const debug = require('debug')('log')
const express = require('./express.js')
const fn1 = (req,res,next)=>{
	debug(`fn1...`)
	next()
}
const fn2 = (req,res,next)=>{
	debug(`fn2...`)
	next()
}
express.get('/user',(req,res,next)=>{
	debug(`get /user`)
	res.end('get /user')
})
express.post('/user',(req,res,next)=>{
	debug(`post /user`)
	res.end('post /user')
})

express.use(fn1)
express.use(fn2)
express.listen(3000)
