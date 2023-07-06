
const name =()=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let a ="hello world"
        resolve(a)
        }, 2000);
    })
}
const Class =(a)=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let b = "abc"
        resolve([a,b])
        }, 2000);
    })
}
const section =([a,b,])=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let c = "xyz"
        resolve([a,b,c])
        }, 2000);
    })
}
name()
.then((a)=>{
console.log("hii my name is ",a)
return Class(a)
}).then(([a,b])=>{
    console.log("my name is ",a,"and my class is",b)
    return section([a,b])
}).then(([a,b,c])=>{
    console.log("my name is ",a,"and my class is",b,"and my section is ",c)
})
