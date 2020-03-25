
>npm install nodemon -g
>npm install hapi --save


// in route.js add below code step by step
'use strict';
module.exports = function() {
    var store = [
       {   
            name: 'Pendrive',
            price: '500'
        },
        {
            
            name: 'Keyboard',
            price: '1200'
        }
    ]
           
        return [
               { // localhost:3000/store
            method: 'GET',
            path: '/store',
            config : {
                handler: function(req, reply){
                    reply({'store':store, 'responseCode':0});
                }
            }
        }
        ];
}();
