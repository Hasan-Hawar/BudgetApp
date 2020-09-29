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
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp ..
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
      };
    },
    addListItem: function (obj, type) {
      let html, newHtml, element;
      //   create HTML string with placeholder text

      if (type === "inc") {
          element = DOMStrings.incomeContainer;
          html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
          element = DOMStrings.expenseContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
  }

      // Replace the placeholder text with an actual text

      newHtml = html.replace('%id%',obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value)


      // Insert the HTML Tag into the DOM

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
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

