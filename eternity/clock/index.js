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
    window.t = {
        ick: 0,
        ock: 0
    }

    async function process() {
        return new Promise(async(resolve,reject)=>{
            setTimeout(()=>resolve(), 500);
        }
        )
    }

    //document.body.setAttribute("theme", "auto");

    document.body.querySelector("page[routes='/']");
}

window.time = 0;
