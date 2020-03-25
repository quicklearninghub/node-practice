//global  is node global object like window in Browser
/*
console , require, exports,__dirname , __filename, 
setInterval, setTimeout
*/
global.company='Murthy Infotek';   // global variable
global.console.log('Welcome to '+company);

console.log(__dirname + ' - ' + __filename);

global.setTimeout(()=>console.log('Hi! Murthy'),2000);

var ctr=0;
var timer=global.setInterval(()=>{
    ctr++;
    console.log('Happy new year 2019')
    if(ctr==3)  clearInterval(timer);
},1000)
