window.DOM = {};    

window.JS = {};

window.onload = function() {    
    window.DOM.tree = {};
    window.DOM.tree.body = document.body;
    window.DOM.tree.main = document.body.querySelector('main');
    
    window.JS.user = {};
    window.JS.user.script = function() {
        console.log(12, 'JS.user.script');
    };
}