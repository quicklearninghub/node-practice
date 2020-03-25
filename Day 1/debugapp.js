var a = 0;
function init() {
  a = 1;
}
function incr() {
  var a = a + 1;    
}
debugger;
init();
console.log('a before: %d', a);
incr();

console.log('a after: %d', a);
for (var i=0;i<5;i++){
  console.log(i);
}

/*
Node js debugging :

> npm install -g node-inspect

1. install node-inspect globally and invoke 
> node inspect debugapp.js

2. use Visual Studio Code debug launcher (select node launcher (built-in))

*/