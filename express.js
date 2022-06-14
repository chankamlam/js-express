const http = require('http')
var express={
	mws:[]
}
const mountMW = (path,fn)=>{
	express.mws.push({path,fn})
}
express.use = fn=>{
	mountMW('/',fn)
}
express.handle = (req,res,fn)=>{
	let idx = 0
	let len = express.mws.length
	const next = ()=>{
		if(idx<len){
			express.mws[idx++].fn(req,res,next)
		}else{
			fn()
		}
	}
	next()
}
['post','get','put','delete'].forEach(method=>{
	express[method] = (path,fn)=>{
		mountMW(path,fn)
	}
})
express.listen = port=>{
	var port = 3000
	const server = http.createServer((req,res)=>{
		express.handle(req,res,()=>{
			console.log('--CORE--')
		})
	}).listen(port,()=>{
		console.log(`Server start on port ${port}.....`,3000)
	})
}
module.exports = express
