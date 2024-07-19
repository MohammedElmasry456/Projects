new Promise((res,rej)=>{
    setTimeout(()=>{
       console.log("time 1");
       res();
    },1000)
}).then(()=>{
    return new Promise((res,rej)=>{
        setTimeout(()=>{
           console.log("time 2");
           res();
        },1000)})
}).then(()=>{
    return new Promise((res,rej)=>{
        setTimeout(()=>{
           console.log("time 3");
           res();
        },1000)})
})