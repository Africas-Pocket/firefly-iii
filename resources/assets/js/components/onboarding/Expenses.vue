<!--<template>
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
</template>-->
<template>
  <div class="expense-component bg-white p-4">
    <div class="push">
      <div class="page-header">
        <h1 class="text-primary">WHAT ARE YOUR REGULAR EXPENSES?</h1>
        <p class="text-primary">We'll help create a budget for you</p>
        <h2>CREATE YOUR BILLS/EXPENSES</h2>
      </div>
      <div class="row justify-content-center align-items-center">
        <div :key="expense.id" class="col-sm-4 m-4"  v-for="expense in expenses">
          <div class="card p-4 d-flex flex-column justify-content-center align-items-center">

            <div class="m-auto p-2 text-center " >
              <div :class="expense.selected?'expense-type-item-selected':''" class="expense-type-item d-flex flex-column justify-content-center align-items-center">
                <a-icon :style="{ fontSize: '22px', color: '#7C0225' }"  :type="expense.icon"/>
                <p class="text-warning pt-1">{{ expense.name }}</p>
              </div>
            </div>

            <div class="d-flex text-left flex-row flex-wrap justify-content-between align-items-center">
              <div class="w-100 p-2">
                <v-select  placeholder="Preferred currency"   v-model="expense.currency" label="countryName" :options="countries"></v-select>
              </div>
              <div class="w-100 p-2">
                <a-input v-model="expense.amount" type="number" placeholder="Amount" />
              </div>
              <div class="w-100 p-2">
                <a-input v-model="expense.due" type="number" placeholder="Amount Due" />
              </div>
              <div class="w-100 p-2">
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
          frequency: 'Frequency',
          due: '',
          id:1
        },
        {
          name: 'Transport', 
          selected: false, 
          amount: '', 
          frequency: 'Frequency', 
          due: '',
          icon:"home",
          id:2
        },
        {
          name: 'Food', 
          selected: false, 
          amount: '', 
          frequency: 'Frequency', 
          due: '',
          icon:"home",
          id:3
        },
        {
          name: 'Utilities', 
          selected: false, 
          amount: '', 
          frequency: 'Frequency', 
          due: '',
          icon:"home",
          id:4
        },
        {
          name: 'Entertainment', 
          selected: false, 
          amount: '', 
          frequency: 'Frequency', 
          due: '',
          icon:"home",
          id:5
        }
      ],
      newExpense: {name: '', selected: true, amount: '', frequency: 'Frequency', due: ''},
<<<<<<< HEAD
      countries: [
        {
          countryCode: "AD",
          countryName: "Andorra",
          currencyCode: "EUR",
        },
        {
          countryCode: "AE",
          countryName: "United Arab Emirates",
          currencyCode: "AED",
        },
        {
          countryCode: "AF",
          countryName: "Afghanistan",
          currencyCode: "AFN",
        },
        {
          countryCode: "AG",
          countryName: "Antigua and Barbuda",
          currencyCode: "XCD",
        },
        {
          countryCode: "AI",
          countryName: "Anguilla",
          currencyCode: "XCD",
        },
        {
          countryCode: "AL",
          countryName: "Albania",
          currencyCode: "ALL",
        },
        {
          countryCode: "AM",
          countryName: "Armenia",
          currencyCode: "AMD",
        },
        {
          countryCode: "AO",
          countryName: "Angola",
          currencyCode: "AOA",
        },
        {
          countryCode: "AQ",
          countryName: "Antarctica",
          currencyCode: "",
        },
        {
          countryCode: "AR",
          countryName: "Argentina",
          currencyCode: "ARS",
        },
        {
          countryCode: "AS",
          countryName: "American Samoa",
          currencyCode: "USD",
        },
        {
          countryCode: "AT",
          countryName: "Austria",
          currencyCode: "EUR",
        },
        {
          countryCode: "AU",
          countryName: "Australia",
          currencyCode: "AUD",
        },
        {
          countryCode: "AW",
          countryName: "Aruba",
          currencyCode: "AWG",
        },
        {
          countryCode: "AX",
          countryName: "Åland",
          currencyCode: "EUR",
        },
        {
          countryCode: "AZ",
          countryName: "Azerbaijan",
          currencyCode: "AZN",
        },
        {
          countryCode: "BA",
          countryName: "Bosnia and Herzegovina",
          currencyCode: "BAM",
        },
        {
          countryCode: "BB",
          countryName: "Barbados",
          currencyCode: "BBD",
        },
        {
          countryCode: "BD",
          countryName: "Bangladesh",
          currencyCode: "BDT",
        },
        {
          countryCode: "BE",
          countryName: "Belgium",
          currencyCode: "EUR",
        },
        {
          countryCode: "BF",
          countryName: "Burkina Faso",
          currencyCode: "XOF",
        },
        {
          countryCode: "BG",
          countryName: "Bulgaria",
          currencyCode: "BGN",
        },
        {
          countryCode: "BH",
          countryName: "Bahrain",
          currencyCode: "BHD",
        },
        {
          countryCode: "BI",
          countryName: "Burundi",
          currencyCode: "BIF",
        },
        {
          countryCode: "BJ",
          countryName: "Benin",
          currencyCode: "XOF",
        },
        {
          countryCode: "BL",
          countryName: "Saint Barthélemy",
          currencyCode: "EUR",
        },
        {
          countryCode: "BM",
          countryName: "Bermuda",
          currencyCode: "BMD",
        },
        {
          countryCode: "BN",
          countryName: "Brunei",
          currencyCode: "BND",
        },
        {
          countryCode: "BO",
          countryName: "Bolivia",
          currencyCode: "BOB",
        },
        {
          countryCode: "BQ",
          countryName: "Bonaire",
          currencyCode: "USD",
        },
        {
          countryCode: "BR",
          countryName: "Brazil",
          currencyCode: "BRL",
        },
        {
          countryCode: "BS",
          countryName: "Bahamas",
          currencyCode: "BSD",
        },
        {
          countryCode: "BT",
          countryName: "Bhutan",
          currencyCode: "BTN",
        },
        {
          countryCode: "BV",
          countryName: "Bouvet Island",
          currencyCode: "NOK",
        },
        {
          countryCode: "BW",
          countryName: "Botswana",
          currencyCode: "BWP",
        },
        {
          countryCode: "BY",
          countryName: "Belarus",
          currencyCode: "BYR",
        },
        {
          countryCode: "BZ",
          countryName: "Belize",
          currencyCode: "BZD",
        },
        {
          countryCode: "CA",
          countryName: "Canada",
          currencyCode: "CAD",
        },
        {
          countryCode: "CC",
          countryName: "Cocos [Keeling] Islands",
          currencyCode: "AUD",
        },
        {
          countryCode: "CD",
          countryName: "Democratic Republic of the Congo",
          currencyCode: "CDF",
        },
        {
          countryCode: "CF",
          countryName: "Central African Republic",
          currencyCode: "XAF",
        },
        {
          countryCode: "CG",
          countryName: "Republic of the Congo",
          currencyCode: "XAF",
        },
        {
          countryCode: "CH",
          countryName: "Switzerland",
          currencyCode: "CHF",
        },
        {
          countryCode: "CI",
          countryName: "Ivory Coast",
          currencyCode: "XOF",
        },
        {
          countryCode: "CK",
          countryName: "Cook Islands",
          currencyCode: "NZD",
        },
        {
          countryCode: "CL",
          countryName: "Chile",
          currencyCode: "CLP",
        },
        {
          countryCode: "CM",
          countryName: "Cameroon",
          currencyCode: "XAF",
        },
        {
          countryCode: "CN",
          countryName: "China",
          currencyCode: "CNY",
        },
        {
          countryCode: "CO",
          countryName: "Colombia",
          currencyCode: "COP",
        },
        {
          countryCode: "CR",
          countryName: "Costa Rica",
          currencyCode: "CRC",
        },
        {
          countryCode: "CU",
          countryName: "Cuba",
          currencyCode: "CUP",
        },
        {
          countryCode: "CV",
          countryName: "Cape Verde",
          currencyCode: "CVE",
        },
        {
          countryCode: "CW",
          countryName: "Curacao",
          currencyCode: "ANG",
        },
        {
          countryCode: "CX",
          countryName: "Christmas Island",
          currencyCode: "AUD",
        },
        {
          countryCode: "CY",
          countryName: "Cyprus",
          currencyCode: "EUR",
        },
        {
          countryCode: "CZ",
          countryName: "Czechia",
          currencyCode: "CZK",
        },
        {
          countryCode: "DE",
          countryName: "Germany",
          currencyCode: "EUR",
        },
        {
          countryCode: "DJ",
          countryName: "Djibouti",
          currencyCode: "DJF",
        },
        {
          countryCode: "DK",
          countryName: "Denmark",
          currencyCode: "DKK",
        },
        {
          countryCode: "DM",
          countryName: "Dominica",
          currencyCode: "XCD",
        },
        {
          countryCode: "DO",
          countryName: "Dominican Republic",
          currencyCode: "DOP",
        },
        {
          countryCode: "DZ",
          countryName: "Algeria",
          currencyCode: "DZD",
        },
        {
          countryCode: "EC",
          countryName: "Ecuador",
          currencyCode: "USD",
        },
        {
          countryCode: "EE",
          countryName: "Estonia",
          currencyCode: "EUR",
        },
        {
          countryCode: "EG",
          countryName: "Egypt",
          currencyCode: "EGP",
        },
        {
          countryCode: "EH",
          countryName: "Western Sahara",
          currencyCode: "MAD",
        },
        {
          countryCode: "ER",
          countryName: "Eritrea",
          currencyCode: "ERN",
        },
        {
          countryCode: "ES",
          countryName: "Spain",
          currencyCode: "EUR",
        },
        {
          countryCode: "ET",
          countryName: "Ethiopia",
          currencyCode: "ETB",
        },
        {
          countryCode: "FI",
          countryName: "Finland",
          currencyCode: "EUR",
        },
        {
          countryCode: "FJ",
          countryName: "Fiji",
          currencyCode: "FJD",
        },
        {
          countryCode: "FK",
          countryName: "Falkland Islands",
          currencyCode: "FKP",
        },
        {
          countryCode: "FM",
          countryName: "Micronesia",
          currencyCode: "USD",
        },
        {
          countryCode: "FO",
          countryName: "Faroe Islands",
          currencyCode: "DKK",
        },
        {
          countryCode: "FR",
          countryName: "France",
          currencyCode: "EUR",
        },
        {
          countryCode: "GA",
          countryName: "Gabon",
          currencyCode: "XAF",
        },
        {
          countryCode: "GB",
          countryName: "United Kingdom",
          currencyCode: "GBP",
        },
        {
          countryCode: "GD",
          countryName: "Grenada",
          currencyCode: "XCD",
        },
        {
          countryCode: "GE",
          countryName: "Georgia",
          currencyCode: "GEL",
        },
        {
          countryCode: "GF",
          countryName: "French Guiana",
          currencyCode: "EUR",
        },
        {
          countryCode: "GG",
          countryName: "Guernsey",
          currencyCode: "GBP",
        },
        {
          countryCode: "GH",
          countryName: "Ghana",
          currencyCode: "GHS",
        },
        {
          countryCode: "GI",
          countryName: "Gibraltar",
          currencyCode: "GIP",
        },
        {
          countryCode: "GL",
          countryName: "Greenland",
          currencyCode: "DKK",
        },
        {
          countryCode: "GM",
          countryName: "Gambia",
          currencyCode: "GMD",
        },
        {
          countryCode: "GN",
          countryName: "Guinea",
          currencyCode: "GNF",
        },
        {
          countryCode: "GP",
          countryName: "Guadeloupe",
          currencyCode: "EUR",
        },
        {
          countryCode: "GQ",
          countryName: "Equatorial Guinea",
          currencyCode: "XAF",
        },
        {
          countryCode: "GR",
          countryName: "Greece",
          currencyCode: "EUR",
        },
        {
          countryCode: "GS",
          countryName: "South Georgia and the South Sandwich Islands",
          currencyCode: "GBP",
        },
        {
          countryCode: "GT",
          countryName: "Guatemala",
          currencyCode: "GTQ",
        },
        {
          countryCode: "GU",
          countryName: "Guam",
          currencyCode: "USD",
        },
        {
          countryCode: "GW",
          countryName: "Guinea-Bissau",
          currencyCode: "XOF",
        },
        {
          countryCode: "GY",
          countryName: "Guyana",
          currencyCode: "GYD",
        },
        {
          countryCode: "HK",
          countryName: "Hong Kong",
          currencyCode: "HKD",
        },
        {
          countryCode: "HM",
          countryName: "Heard Island and McDonald Islands",
          currencyCode: "AUD",
        },
        {
          countryCode: "HN",
          countryName: "Honduras",
          currencyCode: "HNL",
        },
        {
          countryCode: "HR",
          countryName: "Croatia",
          currencyCode: "HRK",
        },
        {
          countryCode: "HT",
          countryName: "Haiti",
          currencyCode: "HTG",
        },
        {
          countryCode: "HU",
          countryName: "Hungary",
          currencyCode: "HUF",
        },
        {
          countryCode: "ID",
          countryName: "Indonesia",
          currencyCode: "IDR",
        },
        {
          countryCode: "IE",
          countryName: "Ireland",
          currencyCode: "EUR",
        },
        {
          countryCode: "IL",
          countryName: "Israel",
          currencyCode: "ILS",
        },
        {
          countryCode: "IM",
          countryName: "Isle of Man",
          currencyCode: "GBP",
        },
        {
          countryCode: "IN",
          countryName: "India",
          currencyCode: "INR",
        },
        {
          countryCode: "IO",
          countryName: "British Indian Ocean Territory",
          currencyCode: "USD",
        },
        {
          countryCode: "IQ",
          countryName: "Iraq",
          currencyCode: "IQD",
        },
        {
          countryCode: "IR",
          countryName: "Iran",
          currencyCode: "IRR",
        },
        {
          countryCode: "IS",
          countryName: "Iceland",
          currencyCode: "ISK",
        },
        {
          countryCode: "IT",
          countryName: "Italy",
          currencyCode: "EUR",
        },
        {
          countryCode: "JE",
          countryName: "Jersey",
          currencyCode: "GBP",
        },
        {
          countryCode: "JM",
          countryName: "Jamaica",
          currencyCode: "JMD",
        },
        {
          countryCode: "JO",
          countryName: "Jordan",
          currencyCode: "JOD",
        },
        {
          countryCode: "JP",
          countryName: "Japan",
          currencyCode: "JPY",
        },
        {
          countryCode: "KE",
          countryName: "Kenya",
          currencyCode: "KES",
        },
        {
          countryCode: "KG",
          countryName: "Kyrgyzstan",
          currencyCode: "KGS",
        },
        {
          countryCode: "KH",
          countryName: "Cambodia",
          currencyCode: "KHR",
        },
        {
          countryCode: "KI",
          countryName: "Kiribati",
          currencyCode: "AUD",
        },
        {
          countryCode: "KM",
          countryName: "Comoros",
          currencyCode: "KMF",
        },
        {
          countryCode: "KN",
          countryName: "Saint Kitts and Nevis",
          currencyCode: "XCD",
        },
        {
          countryCode: "KP",
          countryName: "North Korea",
          currencyCode: "KPW",
        },
        {
          countryCode: "KR",
          countryName: "South Korea",
          currencyCode: "KRW",
        },
        {
          countryCode: "KW",
          countryName: "Kuwait",
          currencyCode: "KWD",
        },
        {
          countryCode: "KY",
          countryName: "Cayman Islands",
          currencyCode: "KYD",
        },
        {
          countryCode: "KZ",
          countryName: "Kazakhstan",
          currencyCode: "KZT",
        },
        {
          countryCode: "LA",
          countryName: "Laos",
          currencyCode: "LAK",
        },
        {
          countryCode: "LB",
          countryName: "Lebanon",
          currencyCode: "LBP",
        },
        {
          countryCode: "LC",
          countryName: "Saint Lucia",
          currencyCode: "XCD",
        },
        {
          countryCode: "LI",
          countryName: "Liechtenstein",
          currencyCode: "CHF",
        },
        {
          countryCode: "LK",
          countryName: "Sri Lanka",
          currencyCode: "LKR",
        },
        {
          countryCode: "LR",
          countryName: "Liberia",
          currencyCode: "LRD",
        },
        {
          countryCode: "LS",
          countryName: "Lesotho",
          currencyCode: "LSL",
        },
        {
          countryCode: "LT",
          countryName: "Lithuania",
          currencyCode: "EUR",
        },
        {
          countryCode: "LU",
          countryName: "Luxembourg",
          currencyCode: "EUR",
        },
        {
          countryCode: "LV",
          countryName: "Latvia",
          currencyCode: "EUR",
        },
        {
          countryCode: "LY",
          countryName: "Libya",
          currencyCode: "LYD",
        },
        {
          countryCode: "MA",
          countryName: "Morocco",
          currencyCode: "MAD",
        },
        {
          countryCode: "MC",
          countryName: "Monaco",
          currencyCode: "EUR",
        },
        {
          countryCode: "MD",
          countryName: "Moldova",
          currencyCode: "MDL",
        },
        {
          countryCode: "ME",
          countryName: "Montenegro",
          currencyCode: "EUR",
        },
        {
          countryCode: "MF",
          countryName: "Saint Martin",
          currencyCode: "EUR",
        },
        {
          countryCode: "MG",
          countryName: "Madagascar",
          currencyCode: "MGA",
        },
        {
          countryCode: "MH",
          countryName: "Marshall Islands",
          currencyCode: "USD",
        },
        {
          countryCode: "MK",
          countryName: "Macedonia",
          currencyCode: "MKD",
        },
        {
          countryCode: "ML",
          countryName: "Mali",
          currencyCode: "XOF",
        },
        {
          countryCode: "MM",
          countryName: "Myanmar [Burma]",
          currencyCode: "MMK",
        },
        {
          countryCode: "MN",
          countryName: "Mongolia",
          currencyCode: "MNT",
        },
        {
          countryCode: "MO",
          countryName: "Macao",
          currencyCode: "MOP",
        },
        {
          countryCode: "MP",
          countryName: "Northern Mariana Islands",
          currencyCode: "USD",
        },
        {
          countryCode: "MQ",
          countryName: "Martinique",
          currencyCode: "EUR",
        },
        {
          countryCode: "MR",
          countryName: "Mauritania",
          currencyCode: "MRO",
        },
        {
          countryCode: "MS",
          countryName: "Montserrat",
          currencyCode: "XCD",
        },
        {
          countryCode: "MT",
          countryName: "Malta",
          currencyCode: "EUR",
        },
        {
          countryCode: "MU",
          countryName: "Mauritius",
          currencyCode: "MUR",
        },
        {
          countryCode: "MV",
          countryName: "Maldives",
          currencyCode: "MVR",
        },
        {
          countryCode: "MW",
          countryName: "Malawi",
          currencyCode: "MWK",
        },
        {
          countryCode: "MX",
          countryName: "Mexico",
          currencyCode: "MXN",
        },
        {
          countryCode: "MY",
          countryName: "Malaysia",
          currencyCode: "MYR",
        },
        {
          countryCode: "MZ",
          countryName: "Mozambique",
          currencyCode: "MZN",
        },
        {
          countryCode: "NA",
          countryName: "Namibia",
          currencyCode: "NAD",
        },
        {
          countryCode: "NC",
          countryName: "New Caledonia",
          currencyCode: "XPF",
        },
        {
          countryCode: "NE",
          countryName: "Niger",
          currencyCode: "XOF",
        },
        {
          countryCode: "NF",
          countryName: "Norfolk Island",
          currencyCode: "AUD",
        },
        {
          countryCode: "NG",
          countryName: "Nigeria",
          currencyCode: "NGN",
        },
        {
          countryCode: "NI",
          countryName: "Nicaragua",
          currencyCode: "NIO",
        },
        {
          countryCode: "NL",
          countryName: "Netherlands",
          currencyCode: "EUR",
        },
        {
          countryCode: "NO",
          countryName: "Norway",
          currencyCode: "NOK",
        },
        {
          countryCode: "NP",
          countryName: "Nepal",
          currencyCode: "NPR",
        },
        {
          countryCode: "NR",
          countryName: "Nauru",
          currencyCode: "AUD",
        },
        {
          countryCode: "NU",
          countryName: "Niue",
          currencyCode: "NZD",
        },
        {
          countryCode: "NZ",
          countryName: "New Zealand",
          currencyCode: "NZD",
        },
        {
          countryCode: "OM",
          countryName: "Oman",
          currencyCode: "OMR",
        },
        {
          countryCode: "PA",
          countryName: "Panama",
          currencyCode: "PAB",
        },
        {
          countryCode: "PE",
          countryName: "Peru",
          currencyCode: "PEN",
        },
        {
          countryCode: "PF",
          countryName: "French Polynesia",
          currencyCode: "XPF",
        },
        {
          countryCode: "PG",
          countryName: "Papua New Guinea",
          currencyCode: "PGK",
        },
        {
          countryCode: "PH",
          countryName: "Philippines",
          currencyCode: "PHP",
        },
        {
          countryCode: "PK",
          countryName: "Pakistan",
          currencyCode: "PKR",
        },
        {
          countryCode: "PL",
          countryName: "Poland",
          currencyCode: "PLN",
        },
        {
          countryCode: "PM",
          countryName: "Saint Pierre and Miquelon",
          currencyCode: "EUR",
        },
        {
          countryCode: "PN",
          countryName: "Pitcairn Islands",
          currencyCode: "NZD",
        },
        {
          countryCode: "PR",
          countryName: "Puerto Rico",
          currencyCode: "USD",
        },
        {
          countryCode: "PS",
          countryName: "Palestine",
          currencyCode: "ILS",
        },
        {
          countryCode: "PT",
          countryName: "Portugal",
          currencyCode: "EUR",
        },
        {
          countryCode: "PW",
          countryName: "Palau",
          currencyCode: "USD",
        },
        {
          countryCode: "PY",
          countryName: "Paraguay",
          currencyCode: "PYG",
        },
        {
          countryCode: "QA",
          countryName: "Qatar",
          currencyCode: "QAR",
        },
        {
          countryCode: "RE",
          countryName: "Réunion",
          currencyCode: "EUR",
        },
        {
          countryCode: "RO",
          countryName: "Romania",
          currencyCode: "RON",
        },
        {
          countryCode: "RS",
          countryName: "Serbia",
          currencyCode: "RSD",
        },
        {
          countryCode: "RU",
          countryName: "Russia",
          currencyCode: "RUB",
        },
        {
          countryCode: "RW",
          countryName: "Rwanda",
          currencyCode: "RWF",
        },
        {
          countryCode: "SA",
          countryName: "Saudi Arabia",
          currencyCode: "SAR",
        },
        {
          countryCode: "SB",
          countryName: "Solomon Islands",
          currencyCode: "SBD",
        },
        {
          countryCode: "SC",
          countryName: "Seychelles",
          currencyCode: "SCR",
        },
        {
          countryCode: "SD",
          countryName: "Sudan",
          currencyCode: "SDG",
        },
        {
          countryCode: "SE",
          countryName: "Sweden",
          currencyCode: "SEK",
        },
        {
          countryCode: "SG",
          countryName: "Singapore",
          currencyCode: "SGD",
        },
        {
          countryCode: "SH",
          countryName: "Saint Helena",
          currencyCode: "SHP",
        },
        {
          countryCode: "SI",
          countryName: "Slovenia",
          currencyCode: "EUR",
        },
        {
          countryCode: "SJ",
          countryName: "Svalbard and Jan Mayen",
          currencyCode: "NOK",
        },
        {
          countryCode: "SK",
          countryName: "Slovakia",
          currencyCode: "EUR",
        },
        {
          countryCode: "SL",
          countryName: "Sierra Leone",
          currencyCode: "SLL",
        },
        {
          countryCode: "SM",
          countryName: "San Marino",
          currencyCode: "EUR",
        },
        {
          countryCode: "SN",
          countryName: "Senegal",
          currencyCode: "XOF",
        },
        {
          countryCode: "SO",
          countryName: "Somalia",
          currencyCode: "SOS",
        },
        {
          countryCode: "SR",
          countryName: "Suriname",
          currencyCode: "SRD",
        },
        {
          countryCode: "SS",
          countryName: "South Sudan",
          currencyCode: "SSP",
        },
        {
          countryCode: "ST",
          countryName: "São Tomé and Príncipe",
          currencyCode: "STD",
        },
        {
          countryCode: "SV",
          countryName: "El Salvador",
          currencyCode: "USD",
        },
        {
          countryCode: "SX",
          countryName: "Sint Maarten",
          currencyCode: "ANG",
        },
        {
          countryCode: "SY",
          countryName: "Syria",
          currencyCode: "SYP",
        },
        {
          countryCode: "SZ",
          countryName: "Swaziland",
          currencyCode: "SZL",
        },
        {
          countryCode: "TC",
          countryName: "Turks and Caicos Islands",
          currencyCode: "USD",
        },
        {
          countryCode: "TD",
          countryName: "Chad",
          currencyCode: "XAF",
        },
        {
          countryCode: "TF",
          countryName: "French Southern Territories",
          currencyCode: "EUR",
        },
        {
          countryCode: "TG",
          countryName: "Togo",
          currencyCode: "XOF",
        },
        {
          countryCode: "TH",
          countryName: "Thailand",
          currencyCode: "THB",
        },
        {
          countryCode: "TJ",
          countryName: "Tajikistan",
          currencyCode: "TJS",
        },
        {
          countryCode: "TK",
          countryName: "Tokelau",
          currencyCode: "NZD",
        },
        {
          countryCode: "TL",
          countryName: "East Timor",
          currencyCode: "USD",
        },
        {
          countryCode: "TM",
          countryName: "Turkmenistan",
          currencyCode: "TMT",
        },
        {
          countryCode: "TN",
          countryName: "Tunisia",
          currencyCode: "TND",
        },
        {
          countryCode: "TO",
          countryName: "Tonga",
          currencyCode: "TOP",
        },
        {
          countryCode: "TR",
          countryName: "Turkey",
          currencyCode: "TRY",
        },
        {
          countryCode: "TT",
          countryName: "Trinidad and Tobago",
          currencyCode: "TTD",
        },
        {
          countryCode: "TV",
          countryName: "Tuvalu",
          currencyCode: "AUD",
        },
        {
          countryCode: "TW",
          countryName: "Taiwan",
          currencyCode: "TWD",
        },
        {
          countryCode: "TZ",
          countryName: "Tanzania",
          currencyCode: "TZS",
        },
        {
          countryCode: "UA",
          countryName: "Ukraine",
          currencyCode: "UAH",
        },
        {
          countryCode: "UG",
          countryName: "Uganda",
          currencyCode: "UGX",
        },
        {
          countryCode: "UM",
          countryName: "U.S. Minor Outlying Islands",
          currencyCode: "USD",
        },
        {
          countryCode: "US",
          countryName: "United States",
          currencyCode: "USD",
        },
        {
          countryCode: "UY",
          countryName: "Uruguay",
          currencyCode: "UYU",
        },
        {
          countryCode: "UZ",
          countryName: "Uzbekistan",
          currencyCode: "UZS",
        },
        {
          countryCode: "VA",
          countryName: "Vatican City",
          currencyCode: "EUR",
        },
        {
          countryCode: "VC",
          countryName: "Saint Vincent and the Grenadines",
          currencyCode: "XCD",
        },
        {
          countryCode: "VE",
          countryName: "Venezuela",
          currencyCode: "VEF",
        },
        {
          countryCode: "VG",
          countryName: "British Virgin Islands",
          currencyCode: "USD",
        },
        {
          countryCode: "VI",
          countryName: "U.S. Virgin Islands",
          currencyCode: "USD",
        },
        {
          countryCode: "VN",
          countryName: "Vietnam",
          currencyCode: "VND",
        },
        {
          countryCode: "VU",
          countryName: "Vanuatu",
          currencyCode: "VUV",
        },
        {
          countryCode: "WF",
          countryName: "Wallis and Futuna",
          currencyCode: "XPF",
        },
        {
          countryCode: "WS",
          countryName: "Samoa",
          currencyCode: "WST",
        },
        {
          countryCode: "XK",
          countryName: "Kosovo",
          currencyCode: "EUR",
        },
        {
          countryCode: "YE",
          countryName: "Yemen",
          currencyCode: "YER",
        },
        {
          countryCode: "YT",
          countryName: "Mayotte",
          currencyCode: "EUR",
        },
        {
          countryCode: "ZA",
          countryName: "South Africa",
          currencyCode: "ZAR",
        },
        {
          countryCode: "ZM",
          countryName: "Zambia",
          currencyCode: "ZMW",
        },
        {
          countryCode: "ZW",
          countryName: "Zimbabwe",
          currencyCode: "ZWL",
        },
      ],
      blnAddExpense: false
=======
      blnAddExpense: false,
      blnError: false,
      errorText: ""
>>>>>>> develop
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