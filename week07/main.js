function party() {
    console.log('Wow this is amazing!');

    party = function(){
        console.log('Been there, got the T-Shirt');
        }
    }
    
    party.music = 'Classical Jazz';



    function ride(){
        if (window.unicorn) { 
            ride = function(){
            // some code that uses the brand new and sparkly unicorn methods
            return 'Riding on a unicorn is the best!';
        }
        } else {
            ride = function(){
            // some code that uses the older pony methods
            return 'Riding on a pony is still pretty good';
        }
        }
        return ride();
    }


    function factorial(n) {
        if (n === 0) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }

    function wait(message, callback, seconds){
        setTimeout(callback,seconds * 1000);
        console.log(message);
    }

    login(userName, function(error,user) {
        if(error){
            throw error;
        } else {  
            getPlayerInfo(user.id, function(error,info){
            if(error){
            throw error;
            } else {
                loadGame(info, function(error,game) {
                    if(error){
                            throw error;
                        } else {
                        // code to run game
                    }
            });
        }
        });
    }
    });


    var img1 = document.querySelector('.img-1');

    function loaded() {
    // woo yey image loaded
    }

    if (img1.complete) {
    loaded();
    }
    else {
    img1.addEventListener('load', loaded);
    }

    img1.addEventListener('error', function() {
    // argh everything's broken
    });



    async function loadGame(userName) {

        try {
        const user = await login(userName);
        const info = await getPlayerInfo (user.id);
        // load the game using the returned info
        }
    
        catch (error){
        throw error;
        }
    }


    function outer() {
        const outside = 'Outside!';
        function inner() {
            const inside = 'Inside!';
            console.log(outside);
            console.log(inside);
        }
        return inner;
    }

    function counter(start){
        let i = start;
        return function() {
            return i++;
        }
    }
     




const url = 'https:example.com/data';
const headers = new Headers({ 'Content-Type': 'text/plain', 'Accept-Charset' : 'utf-8', 'Accept-Encoding':'gzip,deflate' })

const request = (url,{
    headers: headers
})

fetch(request)
.then( function(response) {
if(response.ok) {
    return response;
}
    throw Error(response.statusText);
})
.then( response => console.log("do something with response"))
.catch( error => console.log('There was an error!') )      

