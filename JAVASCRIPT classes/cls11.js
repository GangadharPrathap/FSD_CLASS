
//\\\\\\\\\\\\\\\\ setTimeout function\\\\\\\\\\\\\\\\\\\\\\\\\\
/*here the setTimeout function is a callback function which is used to control the response time of a paritcular block of code in the module, and the 3000 is the delay time in milliseconds
console.log(1)
console.log(1)
console.log(1)
console.log(1)
setTimeout(function(){
    console.log("responding")
    },3000)
console.log(1)
console.log(1)*/
//\\\\\\\\\\\\\\\\\ setInterval function\\\\\\\\\\\\\\\\\\\\\\\\\\
/*It is used in order continuosly execute the function for a infinite we use this function so that executes the code in it continuously as per the timing function given
setInterval(function()
{
    console.log("hi")
},1000)
*/
//\\\\\\\\\\\\\\\\\\\ clearInterval Function\\\\\\\\\\\\\\\\\\\\\\\\
/*var x=0;
const intname = setInterval(function(){
    console.log(x)
    x=x+1;
    if(x==10){
        clearInterval(intname);
        console.log("function was cleared");
    }
},1000)*/
// Today Task (create a Timer using above functions)
var time = 600;
setInterval(function(){
    time=time-1;
    console.log(parseInt(time/60),':',time%60);
},1000)
