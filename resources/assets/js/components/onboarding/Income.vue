<template>
<div class="income-component p-4">
  <div class="push">
    <div class="page-header">
      <h1 class="text-primary">WHAT'S YOUR INCOME?</h1>
      <p class="text-primary">This gives us somewhere to start</p>
      <h2 v-if="!blnAddIncome">LET US KNOW HOW MUCH YOU EARN</h2>
      <h2 v-if="blnAddIncome">CREATE A NEW INCOME</h2>
    </div>
    <div class="row justify-content-center align-items-center">
        <div :key="income.id" class="col-sm-4 m-4"  v-for="income in incomes">
          <div class="card p-4 d-flex flex-column justify-content-center align-items-center">

            <div class="m-auto p-2 text-center " >
              <div :class="income.selected?'income-type-item-selected':''" class="income-type-item d-flex flex-column justify-content-center align-items-center">
                <a-icon :style="{ fontSize: '22px', color: '#fff' }"  :type="income.icon"/>
                <p class="text-warning pt-1">{{ income.name }}</p>
              </div>
            </div>

            <div class="d-flex text-left flex-row flex-wrap justify-content-between align-items-center">
              <div class="w-100 p-2">
                <v-select  placeholder="Preferred currency" :reduce="currency=>currency.namePlural"   v-model="income.currency" label="namePlural" :options="currencies"></v-select>
              </div>
              <div class="w-100 p-2">
                <a-input v-model="income.amount" type="number" placeholder="Amount" />
              </div>
              <div class="w-100 p-2">
                <v-select  placeholder="Frequency"   v-model="income.frequency"  :options="frequencies"></v-select>
              </div>

            </div>
          </div>


      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <!--            <button type="button" class="btn btn-lg btn-primary next-button" v-on:click="callAndProceed"><i class="fa fa-arrow-left text-warning"></i> Prev</button>-->

        </div>
        <div>
          <button type="button" class="btn btn-lg btn-warning" v-on:click="showNewIncomeStreamModal"><i class="fa fa-plus-circle text-primary"></i> Add another account</button>

        </div>
        <div>
          <button type="button" class="btn btn-lg btn-primary next-button" v-on:click="()=>{callAndProceed();$emit('progress', 1)}">Save and Proceed <i class="fa fa-arrow-right text-warning"></i></button>
        </div>

      </div>


<!--      <div class="text-center">
        <button v-on:click="showNewIncomeStreamModal"  class="btn btn-light add-new-income-stream-btn d-flex flex-column justify-content-center align-items-center text-center">
          <a-icon :style="{ fontSize: '22px', color: '#7C0225' }"  type="plus-circle"/>
          <span :style="{color: '#7C0225'}" class="text-sm">Add a new income stream </span>
        </button>
      </div>-->
<!--      <div :key="income.id" class="card m-2 p-4" v-for="income in incomes">
        <h1 class="text-primary text-center">{{income.name}}</h1>
        <div class="d-flex flex-row flex-wrap justify-content-between align-items-center">
          <div class="w-100 p-2">
            <v-select  placeholder="Preferred currency"   v-model="income.currency" label="countryName" :options="countries"></v-select>
          </div>
          <div class="w-100 p-2">
            <a-input v-model="income.amount" type="number" placeholder="Amount" />
          </div>
          <div class="w-100 p-2">
            <v-select  placeholder="Frequency"   v-model="income.frequency"  :options="frequencies"></v-select>
          </div>

        </div>


      </div>-->

    </div>

    <a-modal ok-text="Create" v-model="newIncomeModalIsVisible" title="Add new Income Stream" @ok="addNewIncome">
      <a-input v-model="newIncomeStream" type="text" placeholder="Name" />

    </a-modal>
<!--
    <br><br>
    <div v-if="!blnAddIncome">
      <form v-for="(income, index) in incomes" :key="index" class="form-inline">
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
      <button type="button" class="btn btn-lg btn-warning" v-on:click="callAndProceed">-></button>-->
  </div>
    
    
</div>
</template>
<script>
import {CURRENCIES} from "../helpers";

export default {
  mounted() {
    // console.log('Component mounted.')
  },
  computed: {},
  data() {
    return {
      newIncomeStream:"",
      newIncomeModalIsVisible:false,
      frequencies:['Once','Weekly','Monthly','Yearly'],
      activeIncomeType:"",
      incomes: [
        {
          name: 'Salary',
          icon:"home",
          selected: true,
          amount: '',
          frequency: '',
          currency: '',
          id:0
        },
        {
          name: 'Commissions',
          icon:"shop",
          selected: false,
          amount: '',
          frequency: '',
          currency: '',
          id:1
        },
        {
          name: 'Rental',
          icon:"apartment",
          selected: false,
          amount: '',
          frequency: '',
          currency: '',
          id:2
        },
        {
          name: 'Investment',
          icon:'phone',
          selected: false,
          amount: '',
          frequency: '',
          currency: '',
          id:5
        },
        {
          name: 'Other',
          selected: false,
          icon:'pound',
          amount: '',
          frequency: '',
          currency: '',
          id:3
        }
      ],
      newIncome: {
        name:'',
        selected: true,
        amount: '',
        frequency: 'Frequency',
        currency: 'Currency'
      },
      blnAddIncome: false,
      currencies: CURRENCIES
    };
  },
  methods: {
    addNewIncome() {
      const data = {
        name: this.newIncomeStream,
        selected: false,
        icon: 'pound',
        amount: '',
        frequency: '',
        currency: '',
        id: Math.ceil(Math.random()*1000).toString()
      }
      this.incomes.push(data)
      this.newIncomeStream = ""
      this.newIncomeModalIsVisible = false
      // this.newIncome = {name:'', title:'Type of account', selected: true, amount: '', frequency: 'Frequency', currency: 'Currency'}
      // this.blnAddIncome = !this.blnAddIncome
    },
    showNewIncomeStreamModal(){
      this.newIncomeModalIsVisible=true
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
.income-component{
  background: white;
}
.income-type-item{
  width: 85px;
  height: 85px;
  background: #083E5B;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor:pointer
}
.income-type-item:hover{
  box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.25);
  /*width: 87px;*/
  /*height: 87px;*/
  transition: 1s;

}
.income-type-item-selected{
  background: #7C0225;
}
.income-type-item-selected p{
  color: white !important;
}
.income-type-item p{
  font-size: 9px;
  color: #FCD382;
}
.income-type-item i{
  font-size: 27px;
}

body {
  background-image: none;
}
</style>