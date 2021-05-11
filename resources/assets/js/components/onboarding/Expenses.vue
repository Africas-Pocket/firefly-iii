<!--<template>
<div>
  <center class="push">
    <h1>WHAT ARE YOUR REGULAR EXPENSES?</h1>
    <br>
    <p>We'll help create a budget for you</p>
    <br>
    <h2>CREATE YOUR BILLS/EXPENSES</h2>
  
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
</template>-->
<template>
  <div class="expense-component bg-white p-4">
    <div class="push">
      <div class="page-header">
        <h1 class="text-primary">WHAT ARE YOUR REGULAR EXPENSES?</h1>
        <p class="text-primary">We'll help create a budget for you</p>
        <h2>CREATE YOUR BILLS/EXPENSES</h2>
      </div>
      <div class="d-flex w-100 flex-column justify-content-center align-items-center">
        <div :key="expense.id" class=" w-100  m-4"  v-for="expense in expenses">
          <div class="card p-4 d-flex flex-row justify-content-center align-items-center">

            <div class="m-auto col-sm-2 p-2 text-center " >
              <div :class="expense.selected?'expense-type-item-selected':''" class="expense-type-item d-flex flex-column justify-content-center align-items-center">
                <a-icon :style="{ fontSize: '22px', color: '#7C0225' }"  :type="expense.icon"/>
                <p class="text-warning pt-1">{{ expense.name }}</p>
              </div>
            </div>

            <div class="d-flex text-left flex-row flex-wrap justify-content-between align-items-center">
              <div class="col-sm-3 p-2">
                <v-select  placeholder="Preferred currency" :reduce="currency=>currency.namePlural"  v-model="expense.currency" label="namePlural" :options="currencies"></v-select>
              </div>
              <div class="col-sm-3 p-2">
                <a-input v-model="expense.amount" type="number" placeholder="Amount" />
              </div>
              <div class="col-sm-3  p-2">
                <a-input v-model="expense.due" type="number" placeholder="Amount Due" />
              </div>
              <div class="col-sm-3  p-2">
                <v-select  placeholder="Frequency"   v-model="expense.frequency"  :options="frequencies"></v-select>
              </div>

            </div>
          </div>


        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <!--            <button type="button" class="btn btn-lg btn-primary next-button" v-on:click="callAndProceed"><i class="fa fa-arrow-left text-warning"></i> Prev</button>-->

          </div>
          <div>
            <button type="button" class="btn btn-lg btn-warning" v-on:click="showNewExpenseStreamModal"><i class="fa fa-plus-circle text-primary"></i>Add a new budget</button>

          </div>
          <div>
            <button type="button" class="btn btn-lg btn-primary next-button" v-on:click="()=>{callAndProceed();$emit('progress', 1)}">Save and Proceed <i class="fa fa-arrow-right text-warning"></i></button>
          </div>

        </div>

      </div>

      <a-modal ok-text="Create" v-model="newExpenseModalIsVisible" title="Add a new budget" @ok="addNewExpense">
        <a-input v-model="newExpenseStream" type="text" placeholder="Name" />

      </a-modal>
    </div>


  </div>
</template>
<script>
import {csrfToken} from "../../app_vue";
import {storeRecurrences} from "../API";
import {CURRENCIES} from "../helpers";

export default {
  mounted() {
    // console.log('Component mounted.')
  },
  computed: {},
  data() {
    return {
      frequencies:['Once','Weekly','Monthly','Yearly'],
      newExpenseStream:"",
      newExpenseModalIsVisible:false,
      expenses: [
        {
          name: 'Rent',
          icon:"home",
          selected: false,
          amount: '',
          frequency: '',
          due: '',
          id:1
        },
        {
          name: 'Transport', 
          selected: false, 
          amount: '', 
          frequency: '',
          due: '',
          icon:"home",
          id:2
        },
        {
          name: 'Food', 
          selected: false, 
          amount: '', 
          frequency: '',
          due: '',
          icon:"home",
          id:3
        },
        {
          name: 'Utilities', 
          selected: false, 
          amount: '', 
          frequency: '',
          due: '',
          icon:"home",
          id:4
        },
        {
          name: 'Entertainment', 
          selected: false, 
          amount: '', 
          frequency: '',
          due: '',
          icon:"home",
          id:5
        }
      ],
      newExpense: {name: '', selected: true, amount: '', frequency: 'Frequency', due: ''},
      currencies:CURRENCIES,
      blnAddExpense: false
    };
  },
  methods: {
    addNewExpense() {


      const data = {
        name: this.newExpenseStream,
        selected: false,
        icon: 'pound',
        amount: '',
        frequency: '',
        currency: '',
        due:'',
        id: Math.ceil(Math.random()*1000).toString()
      }
      this.expenses.push(data)
      this.newExpenseStream = ""
      this.newExpenseModalIsVisible = false
      // this.expenses.push(this.newExpense)
      // this.newExpense = {name:'', title:'Type of account', selected: true, amount: '', frequency: 'Frequency', currency: 'Currency'}
      // this.blnAddExpense = !this.blnAddExpense
    },

    showNewExpenseStreamModal(){
      this.newExpenseModalIsVisible=true
    },

    async callAndProceed() {
      for(const expense of this.expenses) {
        if (!expense.selected) {
          return
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
              // "destination_id": "1",
            }
          ]
        }

        // fetch('/api/v1/recurrences', {
        //   method: 'POST', // or 'PUT'
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //     'X-CSRF-TOKEN': csrfToken
        //   },
        //   body: JSON.stringify(data),
        // })
        storeRecurrences(data)
        .then(res => {
          console.log('Success:', res);
        })
        .catch((error) => {
          console.error('Error:', error);
        })
      }
      // this.goHome()
    },

    goHome() {
      window.location.href = '';
    }
  }
};
</script>
<style >
.vs__search::placeholder, input::placeholder{
  text-align: center;
  /*font-style: italic;*/
  font-size: 14px;
  /*color: #083E5B;*/
}
</style>