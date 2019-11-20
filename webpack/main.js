// var request = new XMLHttpRequest();
// request.open('GET', 'https://freegeoip.live/json/', true);
// request.onload = function() {
//   if (this.status >= 200 && this.status < 400) {
//     var resp = this.response; // Success! this is your data.
//     if (JSON.parse(resp).country_code != "RU") {
//       document.getElementById("selecta").classList.remove("hidden");
//     }
//   } else {
//     // We reached our target server, but it returned an error
//   }
// };
// request.onerror = function() {
//   // There was a connection error of some sort
// };
// request.send();

// alert("Yee!");
import Maze from './components/maze/Maze';
import Dots from './components/dots/Dots';


let t = new Date();
console.log(`webpacked at ${t.getHours()}:${t.getMinutes()}`);
