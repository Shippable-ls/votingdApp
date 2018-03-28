

// Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  web3Provider = web3.currentProvider;
 } else {
  // If no injected web3 instance is detected, fall back to Ganache
   web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(web3Provider);
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
contractInstance = VotingContract.at('0xe1866c5dAdFdcb905195B7263f79094366C24125');
// voting pseudonyms used 
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}





function Update() {

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];
  candidateName = 'Rima';

contractInstance.totalVotesFor.call('Rima', {from: account}, function(error, result) {

    //document.getElementById("candidate-1").innerHTML = result;
     bar1 = result;
     document.getElementById("bar1votes").innerHTML = bar1;
  });

contractInstance.totalVotesFor.call('Nick', {from: account}, function(error, result) {

    //document.getElementById("candidate-2").innerHTML = result;
     bar2 = result;
     document.getElementById("bar2votes").innerHTML = bar2;
  });

contractInstance.totalVotesFor.call('Jose', {from: account}, function(error, result) {

   bar3 = result;
   document.getElementById("bar3votes").innerHTML = bar3;
  });


    });
}





// Calls Update() every 3 seconds. 

function AutoCall() {

    Update();

    setTimeout(AutoCall, 1000);
}

AutoCall();





//


function Burn() {

  web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  candidateName = 'Rima';
contractInstance.voteForCandidate('Rima', {from: account}, {gas: "30000"}, {gasPrice: web3.toWei(5,'gwei')}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
});
}





function Freeze() {

  
  web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  candidateName = 'Nick';
contractInstance.voteForCandidate('Nick', {from: account}, {gas: "30000"}, {gasPrice: web3.toWei(5,'gwei')}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
});
}






function Distribute() {

  web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  candidateName = 'Jose';
contractInstance.voteForCandidate('Jose', {from: account}, {gas: "30000"}, {gasPrice: web3.toWei(5,'gwei')}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
});
}





$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
    Autocall()
  }
});

////////////////////////////

$(window).load(function() {
  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
});
