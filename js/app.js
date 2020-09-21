// Budget Controller
let budgetController = (function () {
  
    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

   let data = {
       allItems: {
            exp: [],
            inc: [],
       },
       total: {
            exp: 0,
            inc: 0,
       }
   }

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


    let ctrlAddItem = function(){
    // 1.   get the field input data
    let input = UICtrl.getInput();
    // 2.   add the item to the budget contoller
    // 3.   add the item to UI
    // 4.   calculate the budget
    // 5.   display the budget on the UI
    }
    return {
        init: function(){
            console.log('Application has started.');
            setupEventListiner();
        }
    };
})(budgetController, UIController);


Controller.init();

