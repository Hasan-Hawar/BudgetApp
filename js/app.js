// import budgetController from './BudgetController.js'

// Budget Controller


let budgetController = (function () {
  let Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome){

    totalIncome > 0 ? this.percentage = Math.round(( this.value / totalIncome) * 100) : this.percentage = -1;

    // if(totalIncome > 0){
    //   this.percentage = Math.round((this.value / totalIncome) * 100);
    // }else {
    //   this.percentage = -1;
    // }

  };

  Expense.prototype.getPercentage = function(){
    return this.percentage;
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

    calculatePercentages: function(){
      /** 
       * a=20
       * b=30
       * c=40
       * income = 100
      */
      data.allItems.exp.forEach(current => {
        current.calcPercentage(data.total.inc);
      })

    },


    getPercentages: function(){
      let allPerc = data.allItems.exp.map(function (cur){
        return cur.getPercentage();
      });
      return allPerc;
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
    expensesPercentageLabel: '.item__percentage',
  };

  let formatNumber = (num, type) => {
    let numSplit, int, dec ,sign;

  /*
  + or - before the number
  exactly 2 decimal points 
  comma seperating the thousands
  */

  num = Math.abs(num);
  num = num.toFixed(2);

  numSplit = num.split('.');

  int = numSplit[0];


  int.length > 3 ? int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length) : int = int; 
  
  dec = numSplit[1];

  return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;

  };

  return {
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

      // Replace the placeholder text with an actual text

      newHtml = html.replace('%id%',obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type))


      // Insert the HTML Tag into the DOM

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function(selectorID){
      let el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    clearFields: function(){
      let fields, fieldsArray;
      fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
      
      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach((cur) =>{
        cur.value = '';
        }); 
        fieldsArray[0].focus();
        
    },
 
    displayBudget: function(obj){

      obj.budget > 0 ? type = 'inc' : type = 'exp';

      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
      document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');

      if(obj.percentage > 0){
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
      }else{
      document.querySelector(DOMStrings.percentageLabel).textContent = '---';
      }
    },

    displayPercentages: (percentages) =>{

      let fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel);
      
      let nodeListforEach = (list, callback) =>{
        for (let i = 0; i < list.length; i++) {
          callback(list[i], i);          
        }  
      };
      
      nodeListforEach(fields, (current, index) => {
        percentages[index] > 0 ? current.textContent = percentages[index] + '%' : current.textContent = '---' ;
      });

    },

    getDomStrings: function () {
      return DOMStrings;
    },

  };
})();

// GLOBAL APP CONTROLLER
let Controller = (function (budgetCtrl, UICtrl) {
  let setupEventListiner = function () {
    let Dom = UICtrl.getDomStrings();

    document.querySelector(Dom.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    document.querySelector(Dom.container).addEventListener('click', ctrlDeleteItem);
  };


  let updatePercentages = function(){
    // 1. calc percentages
    budgetCtrl.calculatePercentages();

    // 2. Read them from budget controller
    let percentages = budgetCtrl.getPercentages();

    // 3. Update the UI with the new percentages
    UICtrl.displayPercentages(percentages);

  }


  let updateBudget = function(){
   
    // 1. calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the Budget
    let budget = budgetCtrl.getBudget();

    // 3. display the budget on the UI
    UICtrl.displayBudget(budget);
  };
  
  let ctrlAddItem = function () {
    let input, newItem;
    
    // 1.   get the field input data
    input = UICtrl.getInput();
    
    if(input.description !== "" && !isNaN(input.value) && input.value > 0){
      // 2.   add the item to the budget contoller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
     
      // 3.   add the item to UI
      UICtrl.addListItem(newItem, input.type);
      
      // 4. clear the fields ...
      UICtrl.clearFields();
      
      // 5. calculate and update the budget
      updateBudget();

      // 6. Calc and Update the percentages
      updatePercentages();
    }
    
  };
  let ctrlDeleteItem = function(event){
    let itemId, splitId, type, ID;

    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemId){

      // inc-1
      splitId = itemId.split('-');
      type = splitId[0];
      ID = parseInt(splitId[1]);

      // 1. delete the item from data structure
      budgetCtrl.deleteItem(type, ID);

      // 2. delete the item from the UI
      UICtrl.deleteListItem(itemId);
      
      // 3. Update and show the new budget
      updateBudget();

      // 4. Calc and Update the percentages
      updatePercentages();
    }
  }
  return {
    init: function () {
      console.log("Application has started.");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListiner();
    },
  };
})(budgetController, UIController);

Controller.init();
