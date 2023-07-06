let h = 0
let m = 0
let s = 0

setInterval(() => {
    console.log(h, m, s)
    s++
    if (s == 60) {
        m++
        s = 0
    }
    if (m == 60) {
        h++
        m = 0
    }
    if (h > 12) {
        h = 1
    }
 
}, 1000);