const abc =(a,b,callback)=>{
    return callback(a,b)
}
const xyz =(a,b)=>{
    let c = a+b
    console.log(c)
}
abc (5,10,xyz)
