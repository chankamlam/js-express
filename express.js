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
	var req ={}
	var res = {}
	express.handle(req,res,()=>{
		console.log('--CORE--')
	})
}
module.exports = express
