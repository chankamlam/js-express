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
	next()
	console.log('get /user end...')
})
express.listen(3000)
