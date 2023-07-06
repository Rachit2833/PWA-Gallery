function fibonacciGenerator (n) {
    
        a=0;
        b=1;
        console.log(a);
        console.log(b);
        for(z=1;z<=n;z++){
            
        c=a+b;
        console.log(c);
        a=b;
        b=c;  
    }
    
}
fibonacciGenerator(9);
    
    