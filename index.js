const express = require('./express.js')
const fn1 = (req,res,next)=>{
	console.log('fn1 start...')
	next()
	console.log('fn1 end...')
}
const fn2 = (req,res,next)=>{
	console.log('fn2 start...')
	next()
	console.log('fn2 end...')
}
express.use(fn1)
express.use(fn2)
express.get('/user',(req,res,next)=>{
	console.log('get /user start...')
	console.dir(req,{depth:0})
	console.dir(res,{depth:0})
	res.end('/user page')
	console.log('get /user end...')
})
express.listen(3000)
