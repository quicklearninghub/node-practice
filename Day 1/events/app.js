const events=require('events');

//Level 1: Simple Event
/*
let myEmitter=new events.EventEmitter();

myEmitter.on('greet',(msg)=>{
    console.log(msg)
})

myEmitter.emit('greet','Welcome to Node world')
*/

//Level 2 :Event inheritance
let util=require('util'); // util builtin module for inheritng events

let Person=function(name){
    this.name=name
}
//Event Inheritance
util.inherits(Person,events.EventEmitter);

let p1=new Person('Sriram');
let p2=new Person('Rama');
let p3=new Person('Kavitha');

// wireup event listeners
let people=[p1,p2,p3]
people.forEach((person)=>{
    person.on('speak',(msg)=>{
        console.log(person.name+' said '+msg)
    });
});

p1.emit('speak','Hi dudes! How r u people');
p2.emit('speak','I am fine')
p3.emit('speak','i am hungry... give me some food please')

