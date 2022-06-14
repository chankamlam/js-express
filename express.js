const debug = require('debug')('log')
const http = require('http')
var express={
	mws:[]
}
const mountMW = (path,method,fn)=>{
	express.mws.push({path,method,fn})
}
express.use = fn=>{
	mountMW(null,null,fn)
}
express.handle = (req,res,fn)=>{
	let idx = 0
	let len = express.mws.length
	const income_path = req.url
	const income_method = req.method.toLowerCase()
	debug(`income_request => path : ${income_path} , method : ${income_method}`)
	const next = ()=>{
		if(idx<len){
			let mw = express.mws[idx++]
			if(mw.path==null||(mw.path==income_path&&mw.method==income_method)){
				mw.fn(req,res,next);
			}else{
				next(req,res,next)
			}
		}else{
			fn()
		}
	}
	next()
}
['post','get','put','delete'].forEach(method=>{
	express[method] = (path,fn)=>{
		mountMW(path,method,fn)
	}
})
express.listen = port=>{
	var port = 3000
	const server = http.createServer((req,res)=>{
		express.handle(req,res,()=>{res.end('404')})
	}).listen(port,()=>{
		console.log(`Server start on port ${port}.....`,3000)
	})
}
module.exports = express
