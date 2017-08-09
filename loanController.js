var app = angular.module('app', []);

(function() {
  function loanFunct() {
    var vm = this;
    vm.loanTable = [];

    vm.calculate = function() {
      vm.loanTable.length = 0;
      
      var principal = parseFloat(vm.amount);
      var month = parseInt(vm.term);
      var rate = parseFloat(vm.rate)/1200;
      var payment = principal*(rate+(rate/(Math.pow(1+rate, month)-1)));
      vm.monthlyPayment = payment.toFixed(2);

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

        vm.loanTable.push(periodicPayment);
      };
    };
  };

  app.controller('LoanController', loanFunct);
})();