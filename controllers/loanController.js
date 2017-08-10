var app = angular.module('app', []);

(function() {
  function loanFunct() {
    var vm = this;
    var loanTable = [];
    var count;
    var longestTerm = 0;
    
    // vm.loanTable = [];
    vm.loanTableArray = [];
    vm.poolTable = [];
    
    vm.getLoanCount = function() {
      count = parseInt(vm.loanCount);
      vm.loanCountArray = new Array(parseInt(count)); 
     };
  
    vm.calculate = function() {
      vm.loanTableArray.length = 0;
      for (var i=0; i<count; i++) {
        if (parseInt(vm.term[i]) > longestTerm) {
          longestTerm = vm.term[i];
        }
        vm.loanTableArray.push(calculateLoan(vm.amount[i], vm.term[i], vm.rate[i]).concat());
      }
      calculatePool();
    };

    var calculatePool = function() {
      vm.poolTable.length = 0;

      for (var i=1; i<=longestTerm; i++) {
        var periodicPayment = {
          "paymentNumber" : i,
          "principalPayment" : parseFloat(0),
          "interest" : parseFloat(0),
          "principal" : parseFloat(0)
        };
        vm.poolTable.push(periodicPayment);
      };

      for (var i=0; i<vm.loanTableArray.length; i++) {
        var table = vm.loanTableArray[i];
        for (var j=0; j<table.length; j++) {
          vm.poolTable[j].principalPayment += parseFloat(table[j].principalPayment);
          vm.poolTable[j].interest += parseFloat(table[j].interest);
          vm.poolTable[j].principal += parseFloat(table[j].principal);
        }
      }
    }
    
    var calculateLoan = function(p, m, r) {
      loanTable.length = 0;
      
      var principal = parseFloat(p);
      var month = parseInt(m);
      var rate = parseFloat(r)/1200;
      var payment = principal*(rate+(rate/(Math.pow(1+rate, month)-1)));

      for (var i=1; i<=month; i++) {
        var interestPayment = principal * rate;        
        var principalPayment = payment - interestPayment;        
        principal = principal - principalPayment;

        var periodicPayment = {
          "paymentNumber" : i,
          "principalPayment" : principalPayment.toFixed(2),
          "interest" : interestPayment.toFixed(2),
          "principal" : principal.toFixed(2)
        };

        loanTable.push(periodicPayment);
      };
      return loanTable;
    };
  };

  app.controller('LoanController', loanFunct);
})();