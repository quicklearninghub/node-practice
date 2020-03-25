'use strict';
// joi is plugin provided by hapi for validations
var joi = require('joi');
module.exports = function() {
    var store = [
        {   
            prodname: 'Pendrive',
            price: 500
        },
        {            
            prodname: 'Keyboard',
            price: 1200
        },
        {   
            prodname: 'Processor',
            price: 5000
        },
        {           
            prodname: 'Mouse',
            price: 800
        }
    ];
    return [
        {
            // open postman and type localhost:3000/store
            method: 'GET',
            path: '/store',
            config : {
                handler: function(req, reply){
                    reply({'store':store, 'responseCode':0});
                }
            }
        },

        // get with ID  
        {
            //localhost:3000/store/1
            method: 'GET',
            path: '/store/{id}',
            config : {
            handler: function(req, reply){
             if(store.length <= req.params.id){
                return reply({message:"product does not exists",
                     responseCode: 1}).code(404);
                    }
            reply({'store':store[req.params.id], 'responseCode':0});
                },
                validate: {
                    params: {
                        id: joi.number()
                    }
                }
            }
        },
         // post
        {
            // in postman, select post with localhost:3000/store url
            // select body-> x-www-form-urlencoded and 
            //  key:prodname, value:Monitor            (no quotes)
            // key: price, value:5000 , check the boxes, select POST and click send

            method: 'POST',
            path: '/store',
            config : {
                handler: function(req, reply){
                    console.log(req.payload);
                    store.push({
                        name: req.payload.prodname,
                        price: req.payload.price
                    });
                    reply({message:'Successfully added the data',responseCode:0});
                },
                validate: {
                    payload : {
                        prodname: joi.string(),
                        price: joi.number()
                    }
                }
            }
        },
           // delete
        {   // localhost:3000/store/0  
            method: 'DELETE',
            path: '/store/{id}',
            config : {
                handler: function(req, reply){
                    if(store.length <= req.params.id){
                        return reply({message:"product does not exists", responseCode: 1}).code(404);
                    }
                    store.splice(req.params.id, 1);
                    reply({message:`Successfully deleted ${req.params.id}`, responseCode:0});
                },
                validate: {
                    params : {
                        id: joi.number()
                    }
                }
            }
        }
    ];
}();
