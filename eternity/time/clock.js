onmessage = (e)=>{
    console.log(1, "Message received from main script", e.data);
    var data = e.data;
    var tick = data.tick;
    var tock = data.tock;
    var a = tock;
    var b = tick === tock && tock < 1 ? 1 : tick + tock;
    const obj = {
        tick: a,
        tock: b,
        time: new Date().getTime()
    };
    postMessage(obj);
}
;
