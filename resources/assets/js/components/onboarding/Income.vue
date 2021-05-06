<template>
<div>
  <center class="push">
    <h1>WHAT'S YOUR INCOME?</h1>
    <br>
    <p>This gives us somewhere to start</p>
    <br>
    <h2 v-if="!blnAddIncome">LET US KNOW HOW MUCH YOU EARN</h2>
    <h2 v-if="blnAddIncome">CREATE A NEW INCOME</h2>
  
    <br><br>
    <div v-if="!blnAddIncome">
      <form v-for="income, index in incomes" :key="index" class="form-inline">
        <div class="form-check mb-2 mr-sm-2" style="display: inline-flex;">
          <input class="form-check-input" type="checkbox" id="inlineFormCheck" v-model="income.selected">
          <label class="form-check-label" for="inlineFormCheck">
            {{income.name}}
          </label>
        </div>
        <label class="sr-only" for="inlineFormInputGroupUsername2">Frequency</label>
        <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="income.frequency">
          <option selected>Frequency</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <label class="sr-only" for="inlineFormInputGroupUsername2">Currency</label>
        <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="income.currency">
          <option selected>Currency</option>
          <option value="KES">KES</option>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
        </select>
        <label class="sr-only" for="inlineFormInputName2">Amount</label>
        <input type="number" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Amount" v-model="income.amount">
      </form>
    </div>
    <div v-if="blnAddIncome">
      <form>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Income</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="inputEmail3" placeholder="Income Name" v-model="newIncome.name">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Currency</label>
          <div class="col-sm-4">
            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="newIncome.currency">
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
            <input type="number" class="form-control" id="inputEmail3" placeholder="Amount" v-model="newIncome.amount">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Frequency</label>
          <div class="col-sm-4">
            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="newIncome.title">
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
    
      <button type="button" class="btn btn-lg btn-warning" v-if="!blnAddIncome" @click="blnAddIncome = !blnAddIncome">Add income</button>
      <button type="button" class="btn btn-lg btn-warning" v-if="blnAddIncome" @click="addNewIncome">Add income</button>
      <br><br><br><br>
      <button type="button" class="btn btn-lg btn-warning" v-on:click="callAndProceed">-></button>
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
      incomes: [
        {name: 'Salary', selected: false, amount: '', frequency: 'Frequency', currency: 'Currency'},
        {name: 'Commissions', selected: false, amount: '', frequency: 'Frequency', currency: 'Currency'},
        {name: 'Investment Income', selected: false, amount: '', frequency: 'Frequency', currency: 'Currency'},
        {name: 'Rental Income', selected: false, amount: '', frequency: 'Frequency', currency: 'Currency'}
      ],
      newIncome: {name:'', title:'Type of account', selected: true, amount: '', frequency: 'Frequency', currency: 'Currency'},
      blnAddIncome: false
    };
  },
  methods: {
    addNewIncome() {
      this.incomes.push(this.newIncome)
      this.newIncome = {name:'', title:'Type of account', selected: true, amount: '', frequency: 'Frequency', currency: 'Currency'}
      this.blnAddIncome = !this.blnAddIncome
    },
    async callAndProceed() {
      let csrfToken = document.querySelector('meta[name="csrf-token"]').content
      let tomorrow = new Date();
      tomorrow.setDate(new Date().getDate()+1);
      for(const income of this.incomes) {
        if (!income.selected) {
          return
        }
        const data = {
          "type": "deposit",
          "title": income.name,
          "first_date": tomorrow.toISOString().split('T')[0],
          // "repeat_until": null,
          "nr_of_repetitions": 20,
          "apply_rules": true,
          "active": true,
          "notes": "",
          "repetitions": [
            {
              "type": income.frequency,
              "moment": "3",
              "skip": 0,
              "weekend": 1
            }
          ],
          "transactions": [
            {
              "description": income.name,
              "amount": income.amount,
              "currency_code": income.currency,
              "source_id": "32",
              "destination_id": "1",
            }
          ]
        }

        fetch('/api/v1/recurrences', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        })
      }
      this.$emit('progress', 1);
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