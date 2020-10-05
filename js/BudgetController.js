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