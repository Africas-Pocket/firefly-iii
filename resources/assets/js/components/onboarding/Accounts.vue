<template>
<div>
  <center class="push">
    <h1>HOW MUCH DO YOU HAVE IN YOUR ACCOUNTS?</h1>
    <br>
    <p>This gives us somewhere to start</p>
    <br>
    <h2 v-if="!blnAddAccount">LET US KNOW WHERE YOU STAND</h2>
    <h2 v-if="blnAddAccount">CREATE A NEW ASSET ACCOUNT</h2>
    <h3 v-if="blnError">{{errorText}}</h3>
    <br><br>
    <div v-if="!blnAddAccount">
      <form v-for="account, index in accounts" :key="index" class="form-inline">
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
      accounts: [
        {name:'Name', title:'Current Account', selected: false, balance: '', currency: 'Currency'},
        {name:'Name', title:'Savings Account', selected: false, balance: '', currency: 'Currency'},
        {name:'Name', title:'Emergency Fund', selected: false, balance: '', currency: 'Currency'},
        {name:'Name', title:'Investment Account', selected: false, balance: '', currency: 'Currency'}
      ],
      newAccount: {name:'Name', title:'Type of account', selected: true, balance: '', currency: 'Currency'},
      blnAddAccount: false,
      blnError: false,
      errorText: ""
    };
  },
  methods: {
    addNewAccount() {
      this.accounts.push(this.newAccount)
      this.newAccount = {name:'', title:'Type of account', selected: true, balance: '', currency: 'Currency'}
      this.blnAddAccount = !this.blnAddAccount
    },
    async callAndProceed() {
      let csrfToken = document.querySelector('meta[name="csrf-token"]').content
      let success = true
      this.errorText = ""
      for(const account of this.accounts) {
        if (!account.selected) {
          return
        }
        const data = {
        "name": account.name,
        "type": "asset",
        "opening_balance": account.balance,
        "currency_code": account.currency,
        "opening_balance_date": new Date().toISOString().split('T')[0],
        "account_role": "defaultAsset"
        }

        await fetch('/api/v1/accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken
          },
          body: JSON.stringify(data),
        })
        .then(response => {
          let resp = response.json()
          console.log(resp)
          if (response.status !== 200) {
            console.log("no bueno")
            success = false
            this.errorText = resp.errors
          }
          // response.json()
        })
        // .then(data => {
        //   console.log('Success:', data);
        // })
        .catch((error) => {
          // TODO error display    
          console.error('Error:', error);
        })
      }
      console.log("success", success)
      if (success) {
        this.$emit('progress', 1);
      }
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