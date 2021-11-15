const taskList = document.querySelector('#task-list');
const form = document.querySelector('#add-task-form');
const modalForm = document.querySelector('#modal-form');
const modeldeel1 = document.getElementById("modaldeel1");

var xtasks =  []
var inst = {
  tekstlen: 40,
  mode: "active", // hidded
  extra: "Doe"
};

var liInModal = 0;
//hideAddressBar();  //for mobile browsers

function menuFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
