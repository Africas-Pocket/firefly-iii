<template>
  <div class="accounts-component bg-white">
    <div class="page-header text-primary">
      <h1>HOW MUCH DO YOU HAVE IN YOUR ACCOUNTS?</h1>
      <br>
      <p>This gives us somewhere to start</p>
      <br>
      <h2 v-if="!blnAddAccount">LET US KNOW WHERE YOU STAND</h2>
      <h2 v-if="blnAddAccount">CREATE A NEW ASSET ACCOUNT</h2>
      <h3 v-if="blnError">{{errorText}}</h3>
    </div>
    <div class="m-auto">
      <div class="account-categories-wrapper p-4 m-4 col-sm-8 m-auto ">
        <div :key="accountCategory.id" class="account-category-item" v-for="(accountCategory) in accountCategories">
          <h1 class="text-primary text-left">{{accountCategory.categoryName}}</h1>
          <div class="category-accounts-wrapper">
            <div :key="account.id" v-for="(account) in accountCategory.accounts" class="category-account-item w-100  d-flex justify-content-around align-items-center">
              <div>
                <input placeholder="Name" type="text" v-model="account.accountName" class="form-control text-center">
              </div>
              <div>
                <v-select class="currency-field" placeholder="Currency" v-model="account.namePlural" :reduce="currency=>currency.namePlural" label="namePlural" :options="currencies"></v-select>
              </div>
              <div>
                <input placeholder="balance" type="number" v-model="account.balance" class="form-control text-center">
              </div>
            </div>


<!--            <div>
              <button v-on:click="()=>addAccountToCategory(accountCategory.id)" class="btn bg-transparent">
                <i class="fa fa-plus-circle text-warning"></i>  Add another Account
              </button>
            </div>-->
          </div>

        </div>

        <div class="d-flex justify-content-between align-items-center">
          <div>
<!--            <button type="button" class="btn btn-lg btn-primary next-button" v-on:click="callAndProceed"><i class="fa fa-arrow-left text-warning"></i> Prev</button>-->

          </div>
          <div>
<!--            <button type="button" class="btn btn-lg btn-warning" v-on:click="showModal"><i class="fa fa-plus-circle text-primary"></i> Add another account</button>-->

          </div>
          <div>
            <button type="button" class="btn btn-lg btn-primary next-button" v-on:click="()=>{callAndProceed();$emit('progress', 1)}">Save and Proceed <i class="fa fa-arrow-right text-warning"></i></button>
          </div>

        </div>

      </div>
      <!--    <div v-if="!blnAddAccount">
            <form v-for="(account, index) in accounts" :key="index" class="form-inline">
              <div class="form-check mb-2 mr-sm-2" style="display: inline-flex;">
                <input class="form-check-input" type="checkbox" id="inlineFormCheck" v-model="account.selected">
                <label class="form-check-label" for="inlineFormCheck">
                  {{account.title}}
                </label>
              </div>
              <label class="sr-only" for="inlineFormInputName2">Name</label>
              <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Name" v-model="account.name">

              <label class="sr-only" for="inlineFormInputGroupUsername2">Currency</label>
              <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="account.currency">
                <option selected>Currency</option>
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
              </select>
              <label class="sr-only" for="inlineFormInputName2">Current Balance</label>
              <input type="number" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Current Balance" v-model="account.balance">
            </form>
          </div>
          <div v-if="blnAddAccount">
            <form>
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-4">
                  <input type="text" class="form-control" id="inputEmail3" placeholder="Name" v-model="newAccount.name">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Currency</label>
                <div class="col-sm-4">
                  <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="newAccount.currency">
                    <option selected>Currency</option>
                    <option value="KES">KES</option>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Current Balance</label>
                <div class="col-sm-4">
                  <input type="number" class="form-control" id="inputEmail3" placeholder="Current Balance" v-model="newAccount.balance">
                </div>
              </div>
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Type of Account</label>
                <div class="col-sm-4">
                  <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="newAccount.title">
                    <option selected>Type of account</option>
                    <option value="Savings Account">Savings Account</option>
                    <option value="Current Account">Current Account</option>
                    <option value="Investment Account">Investment Account</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <br><br>

            <button type="button" class="btn btn-lg btn-warning" v-if="!blnAddAccount" @click="blnAddAccount = !blnAddAccount">Add account</button>
            <button type="button" class="btn btn-lg btn-warning" v-if="blnAddAccount" @click="addNewAccount">Add account</button>
            <br><br><br><br>
            <button type="button" class="btn btn-lg btn-warning" v-on:click="callAndProceed">-></button>-->
    </div>

    <a-modal
        title="Create New Account"
        :visible="modalVisible"
        okText="Create"
        @ok="handleModalOk"
        @cancel="handleModalCancel"
    >
      <a-input v-model="newCategoryName" required placeholder="New Account" />
    </a-modal>

  </div>
</template>
<script>
import {COUNTRIES, CURRENCIES} from "../helpers";

export default {
  mounted() {
    // console.log('Component mounted.')
  },
  computed: {},
  data() {
    return {
      modalVisible:false,
      accountCategories:[
        {
          id:1,
          categoryName:"Current Accounts",
          accounts:[
            {
              id:0,
              accountName:"",
              currencyCode:"",
              balance:0
            }
          ]
        },
        {
          id:2,
          categoryName:"Savings Account",
          accounts:[
            {
              id:0,
              accountName:"",
              currencyCode:"",
              balance:0
            }
          ]
        },
        {
          id:3,
          categoryName:"Emergency Fund",
          accounts:[
            {
              id:0,
              accountName:"",
              currencyCode:"",
              balance:0
            }
          ]
        },
        {
          id:4,
          categoryName:"Investment Account",
          accounts:[
            {
              id:0,
              accountName:"",
              currencyCode:"",
              balance:0
            }
          ]
        },
      ],
      accounts: [
        {name:'Name', title:'Current Account', selected: false, balance: '', currency: 'Currency'},
        {name:'Name', title:'', selected: false, balance: '', currency: 'Currency'},
        {name:'Name', title:'', selected: false, balance: '', currency: 'Currency'},
      ],
      newCategoryName:"",
      countries:COUNTRIES,
      currencies:CURRENCIES,
      newAccount: {name:'Name', title:'Type of account', selected: true, balance: '', currency: 'Currency'},
      blnAddAccount: false,
      blnError: false,
      errorText: "",
      errorCount: 0
    };
  },
  methods: {
    addNewAccount() {
      this.accounts.push(this.newAccount);
      this.newAccount = {
        name: "",
        title: "Type of account",
        selected: true,
        balance: "",
        currency: "Currency",
      };
      this.blnAddAccount = !this.blnAddAccount;
    },
    showModal(){
      this.modalVisible = true
    },
    handleModalOk(event){
      const data = {
            id:Math.ceil(Math.random()*1000).toString(),
            categoryName:this.newCategoryName,
            accounts:[
              {
                id:0,
                accountName:"",
                currencyCode:"",
                balance:0
              }
            ]
          };
      this.accountCategories.push(data)
      this.newCategoryName = ""
      this.modalVisible=false
      console.log(event)
    },
    handleModalCancel(event){
      this.modalVisible=false
      console.log(event)
    },
    addAccountToCategory(categoryID){
      const input ={
        id:Math.ceil(Math.random()*1000).toString(),
        accountName:"",
        currencyCode:"",
        balance:0
      }
      let accountCategory = this.accountCategories.filter(element=>(element.id === categoryID))[0]
      accountCategory.accounts.push(input)


    },
    async callAndProceed() {
      this.blnError = false;
      this.errorText = ""
      let success = true
      let csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      this.errorText = "";
      for (const account of this.accounts) {
        if (!account.selected) {
          continue
        }
        const data = {
          "name": account.name,
          "type": "asset",
          "opening_balance": account.balance,
          "currency_code": account.currency,
          "opening_balance_date": new Date().toISOString().split('T')[0],
          "account_role": "defaultAsset"
        }

        let resp = await fetch("/api/v1/accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
          body: JSON.stringify(data),
        });
        // .then(response => {
        if (resp.status !== 200) {
          success = false;
        }
        resp = await resp.json();
        console.log(resp);
        if (!success) {
          // console.log("no bueno");
          this.blnError = true;
          for (const errorsKey in resp.errors) {
            resp.errors[errorsKey].map((message) => {
              this.errorText = account.name + ": " + message;
            });
          }
          // TODO: Handle partial success case, array to hold succeeded, check before run
        }
        if (success) {
          this.$emit('progress', 1);
        }
      }
      // .then(data => {
      //   console.log('Success:', data);
      // })
      // .catch((error) => {
      //   // TODO error display
      //   console.error('Error:', error);
      // })

      //   console.log("success", success)
        
    },
  },
};
</script>
<style scoped>
.accounts-component{
  width: 100%;
  background-color: #fff;
}
.account-categories-wrapper{
  /*width: 80%;*/

}
.category-account-item{

  background: rgba(247, 127, 0, 0.25);
  border: 5px solid #FCC455;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 20px 45px;
  margin:20px 0;
  width: 100%;
}
.category-account-item>div{

  width: 194px;
}
.currency-field{
  background-color: white;
}
</style>