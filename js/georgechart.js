/* Inspired by : https://codepen.io/obc/pen/ypDmg */
/* Te iubesc pisoi */
/* @_tomesch */

// Add values to the values array and see what happens :)


var values = [1,5,10];

var number1 = window.bar1
var number2 = window.bar2
var number3 = window.bar3


function wait() {

setTimeout(function() {
	  var number1 = window.bar1;
      var number2 = window.bar2;
      var number3 = window.bar3;
      var values = [number1,number2,number3];
      drawChart(values,"#chart",10);
}, 2000);



}

wait();

// drawChart(values,"#chart",10) // You can adjust the margin between each bar by changing 10 to whatever you like

function drawChart(data,selector,padding){
  var max = Math.max.apply(Math, data);
	var chart = document.querySelector(selector);
	var barwidth = ((chart.offsetWidth-(values.length-1)*padding-(data.length)*10)/data.length);
	var sum = data.reduce(function(pv, cv) { return pv + cv; }, 0);
	var left = 0;
	for (var i in data){
	  var newbar = document.createElement('div');
	  newbar.setAttribute("class", "bar");
	  newbar.style.width=barwidth+"px";
	  newbar.style.height=((data[i]/max)*100)+"%";
	  newbar.style.left=left+"px";
	  chart.appendChild(newbar);
	  left += (barwidth+padding+10);
	}
}

//function AutoCall2() {

    //console.log(window.bar1);
  //  var number1 = window.bar1
    //var number2 = window.bar2
   // var number3 = window.bar3
   // var values = [number1,number2,number3];
    //drawChart(values,"#chart",10)
    //console.log(number1);
    //console.log(toString(number1));
   
    //setTimeout(AutoCall2, 3000);
//}

//AutoCall2();
