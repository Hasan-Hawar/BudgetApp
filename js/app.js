// Budget Controller
let budgetController = (function () {
  // some code
})();
// UI Controller
let UIController = (function () {
  let DOMStrings = {
      inputType : '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn'

  };
  return {
      getInput: function(){
          return {
            type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp ..
            description : document.querySelector(DOMStrings.inputDescription).value,
            value : document.querySelector(DOMStrings.inputValue).value
          };
      },

      getDomStrings : function(){
          return DOMStrings;
      }
  }
})();
// Global Conroller
let Controller = (function (budgetCtrl, UICtrl) {

    let setupEventListiner = function(){

        let Dom = UICtrl.getDomStrings();

        document.querySelector(Dom.inputBtn).addEventListener("click", ctrlAddItem);
        document.addEventListener("keypress", function (event) {
            if(event.keyCode === 13 || event.which === 13){
              ctrlAddItem()
            }
        });
    }
})(budgetController, UIController);
