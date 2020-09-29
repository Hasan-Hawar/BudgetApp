// Budget Controller
let budgetController = (function () {
  let Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let calculateTotal = function(type){
    let sum = 0;
    data.allItems[type].forEach(el => {
      sum += el.value;
    });
    data.total[type] = sum;
  };
  let data = {
    allItems: {
      exp: [],
      inc: [],
    },
    total: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: function (type, des, val) {
      let newItem, ID;

      //    CREATE NEW ID ...
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //    CREATE NEW ITEM BASED ON 'inc' OR 'exp' TYPE ...
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new income(ID, des, val);
      }

      //    PUSH THE NEW ITEM INTO THE ARRAY ...
      data.allItems[type].push(newItem);
      //    RETURN THE NEW ADDED ITEM
      return newItem;
    },
    deleteItem: function(type, id){
      let ids, index;
      //  id = 6
      // ids = [1, 2, 4, 6, 8]
      //        0  1  2  3  4
      // index = 3

      ids = data.allItems[type].map(current =>{
        return current.id;
      });
      index = ids.indexOf(id);

      if(index !== -1){
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget : function(){

      // calculate total income and expenses 
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate the budget: income - expemses
      data.budget = data.total.inc - data.total.exp

      // calculate the percentage of the income that was spent
      if(data.total.inc > 0){
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
      }else {
        data.percentage = -1;
      }
    },
    getBudget: function(){
      return{
        budget: data.budget,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        percentage: data.percentage
      }
    },
    testing: () =>{
      console.log(data);
    }
  };
})();

// UI Controller
let UIController = (function () {
  let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel:'.budget__income--value',
    expenseLabel:'.budget__expenses--value',
    percentageLabel:'.budget__expenses--percentage',
    container: '.container',
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

