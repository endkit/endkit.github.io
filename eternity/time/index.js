window.Crypto = crypt = cx = {
    uid: {
        create: x=>{
            if (window.crypto || window.msCrypto) {
                var array = new Uint32Array(x);
                window.crypto.getRandomValues(array);
                array.length === 1 ? array = array[0] : null;
                return array;
            } else {
                throw new Error("Your browser can't generate secure random numbers");
            }
        }
    }
};

window.eternity = {};
window.eternity.core = {};
window.eternity.core.state = [];
window.eternity.loop = {};
window.eternity.loop.input = function() {
    return new Promise(function(resolve, reject) {
        resolve([0]);
    }
    )
}
window.eternity.loop.update = function() {
    return new Promise(function(resolve, reject) {
        resolve([1]);
    }
    )
}
window.eternity.loop.render = function() {
    return new Promise(function(resolve, reject) {
        //resolve(Math.random() >= 0.5 ? [0, 1] : [1, 0]);
        resolve([Crypto.uid.create(1)]);
    }
    )
}

window.onload = function() {
    var tick = 0;
    var tock = 0;

    const myWorker = new Worker("clock.js");
    myWorker.onmessage = (e)=>{
        console.log(2, "Message received from worker script", e.data);
        document.body.innerHTML = JSON.stringify(e.data, null, 4)
        var a = tock;
        var b = tick === tock && tock < 1 ? 1 : tick + tock;
        var data = {
            tick: a,
            tock: b
        }
        myWorker.postMessage(data);
    }

    document.body.dataset.flashrate = window.god = new MutationObserver(async function(elem) {
        window.time++;
        var frame = await process();
        const data = {
            tick,
            tock
        }
        myWorker.postMessage(data);
        console.log(0, "Message sent to the worker script", data);
    }
    ).observe(document.body, {
        attributeOldValue: true
    });

    function process() {
        return new Promise(async(resolve,reject)=>{
            var state = await window.eternity.loop.render();
            //console.log(window.time, state);
            setTimeout(()=>resolve(state), 500);
        }
        )
    }

    //document.body.setAttribute("theme", "auto");

    document.body.querySelector("page[routes='/']");
}

window.time = 0;
