<template>
<div>
  <center class="push">
    <h1>WHAT ARE YOUR REGULAR EXPENSES?</h1>
    <br>
    <p>We'll help create a budget for you</p>
    <br>
    <h2>CREATE YOUR BILLS/EXPENSES</h2>
    <h3 v-if="blnError" style="color:red;">{{ errorText }}</h3>
  
    <br><br>
    <div v-if="!blnAddExpense">
      <form v-for="expense, index in expenses" :key=index class="form-inline">
        <div class="form-check mb-2 mr-sm-2" style="display: inline-flex;">
          <input class="form-check-input" type="checkbox" id="inlineFormCheck" v-model="expense.selected">
          <label class="form-check-label" for="inlineFormCheck">
            {{expense.name}}
          </label>
        </div>
        <label class="sr-only" for="inlineFormInputName2">Amount</label>
        <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" v-model="expense.amount" placeholder="Amount">

        <label class="sr-only" for="inlineFormInputGroupUsername2">Frequency</label>
        <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="expense.frequency">
          <option selected>Frequency</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <label class="sr-only" for="inlineFormInputName2">Due Date</label>
        <input type="date" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" v-model="expense.due" placeholder="Due Date">
      </form>
    </div>
    <div v-if="blnAddExpense">
      <form>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Expense</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="inputEmail3" placeholder="Expense Name" v-model="newExpense.name">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Currency</label>
          <div class="col-sm-4">
            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="newExpense.currency">
              <option selected>Currency</option>
              <option value="KES">KES</option>
              <option value="USD">USD</option>
              <option value="CAD">CAD</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Amount</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" id="inputEmail3" placeholder="Amount" v-model="newExpense.amount">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Frequency</label>
          <div class="col-sm-4">
            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="newExpense.frequency">
              <option selected>Frequency</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </form>
    </div>
    <br><br>
    
      <button type="button" class="btn btn-lg btn-warning" v-if="!blnAddExpense" @click="blnAddExpense = !blnAddExpense">Add new expenses</button>
      <button type="button" class="btn btn-lg btn-warning" v-if="blnAddExpense" @click="addNewExpense">Add expenses</button>
      <br><br><br><br>
      <button type="button" class="btn btn-lg btn-warning" @click="callAndProceed">-></button>
  </center>
    
    
</div>
</template>
<script>
export default {
  mounted() {
    // console.log('Component mounted.')
  },
  computed: {},
  data() {
    return {
      expenses: [
        {name: 'Rent', selected: false, amount: '', frequency: 'Frequency', due: ''},
        {name: 'Transport', selected: false, amount: '', frequency: 'Frequency', due: ''},
        {name: 'Food', selected: false, amount: '', frequency: 'Frequency', due: ''},
        {name: 'Utilities', selected: false, amount: '', frequency: 'Frequency', due: ''},
        {name: 'Entertainment', selected: false, amount: '', frequency: 'Frequency', due: ''}
      ],
      newExpense: {name: '', selected: true, amount: '', frequency: 'Frequency', due: ''},
      blnAddExpense: false,
      blnError: false,
      errorText: ""
    };
  },
  methods: {
    addNewExpense() {
      this.expenses.push(this.newExpense)
      this.newExpense = {name:'', title:'Type of account', selected: true, amount: '', frequency: 'Frequency', currency: 'Currency'}
      this.blnAddExpense = !this.blnAddExpense
    },

    async callAndProceed() {
      this.blnError = false;
      this.errorText = ""
      let success = true
      let csrfToken = document.querySelector('meta[name="csrf-token"]').content
      for(const expense of this.expenses) {
        if (!expense.selected) {
          continue
        }
        const data = {
          "type": "withdrawal",
          "title": expense.name,
          "first_date": expense.due,
          // "repeat_until": null,
          "nr_of_repetitions": 20,
          "apply_rules": true,
          "active": true,
          "notes": "",
          "repetitions": [
            {
              "type": expense.frequency,
              "moment": "3",
              "skip": 0,
              "weekend": 1
            }
          ],
          "transactions": [
            {
              "description": expense.name,
              "amount": expense.amount,
              "currency_code": expense.currency,
              "source_id": "24",
              "destination_id": "1",
            }
          ]
        }

        let resp = await fetch('/api/v1/recurrences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken
          },
          body: JSON.stringify(data),
        })
        if (resp.status !== 200) {
          this.success = false;
        }
        resp = await resp.json();
        console.log(resp);
        if (!this.success) {
          // console.log("no bueno");
          success = false;
          this.blnError = true;
          for (const errorsKey in resp.errors) {
            resp.errors[errorsKey].map((message) => {
              this.errorText = expense.name + ": " + message;
            });
          }
          // TODO: Handle partial success case, array to hold succeeded, check before run
        }
      }
      
      if (success) {
        this.goHome()
      }
    },

    goHome() {
      window.location.href = '';
    }
  }
};
</script>
<style scoped>
.push{
  padding-top: 100px;
}

body {
  background-image: none;
}
</style>