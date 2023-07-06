const getcheeze =(callback)=>{
    setTimeout(() => {
        let cheeze ="🟡"
        console.log("got the cheeze", cheeze);
        return cheeze
        callback(cheeze)
    }, 2000);
}
const makedough =(cheeze)=>{
    setTimeout(() => {
        let dough=" ⚪️"
        console.log("got the dough", dough);
        return [cheeze,dough]
    }, 2000);
}
const getpizza =([cheeze,dough])=>{
    setTimeout(() => {
        let pizza="🍕"
        console.log("got the pizza", pizza);
        return [cheeze,dough,pizza]
    }, 2000);
}
