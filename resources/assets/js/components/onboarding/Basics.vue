<template>
<<<<<<< HEAD
  <div class="basics-component bg-white">
    <div class="elements-wrapper m-auto">

      <div class="page-header py-2">

        <h1 class="text-primary">LET'S START WITH THE BASICS</h1>
        <div>
          <p class="text-primary">
            This will help us recommend useful investment opportunities to you based
            on your profile.
          </p>
        </div>
      </div>
      <div class="input-paragraph m-auto py-4 m-2 bg-white">
        <div class="m-4">

          <div class="py-4 paragraph">

            <h2 class="text-primary">

              My preferred name is
              <input v-model="preferredName" type="text" class="text-primary" id="preferredName" placeholder="Preferred name" />. I
              currently live in
              <v-select  class="custom-select-box"  :reduce="country => country.countryName"  placeholder="Country of residence" v-model="countryOfResidence"  label="countryName" :options="countries"></v-select>
              and I'm originally from
              <v-select :reduce="country => country.countryName"   class="custom-select-box"  placeholder="Country of origin" v-model="countryOfOrigin" label="countryName" :options="countries"></v-select>
            </h2>
          </div>
          <div class="py-4 paragraph">
            <h2  class="text-primary">
              I am a successful
              <input v-model="age" type="number" class="" id="age" placeholder="Age" /> year old
              <span class="select-wrapper">
                      <v-select  class="custom-select-box" v-model="gender" placeholder="Gender" :options="genderOptions"></v-select>
          </span>

              with a
              <v-select  class="custom-select-box"  v-model="levelOfEducation" placeholder="Level of education" :options="educationLevelOptions"></v-select>
              level education.
            </h2>
          </div>
          <div class="py-2 paragraph">
            <h2  class="text-primary">
              I am
              <v-select  class="custom-select-box"  v-model="maritalStatus" placeholder="Marital Status" :options="maritalStatusOptions"></v-select>
              with
              <v-select  class="custom-select-box"  v-model="numberOfChildren" placeholder="Number of children" :options="numberOfChildrenOptions"></v-select>
              kids. I work in a
              <v-select  class="custom-select-box"  v-model="role" placeholder="Role" :options="roleOptions"></v-select>

              role.
            </h2>
          </div>
          <div class="py-2 paragraph">
            <h2  class="text-primary">
              I earn primarily in
              <v-select  placeholder="Preferred currency" :reduce="currency=>currency.namePlural"   class="custom-select-box"    v-model="preferredCurrency" label="namePlural" :options="currencies"></v-select>

              .
            </h2>
          </div>
        </div>
        <div class="py-4 cta-button-wrapper">

          <button
              type="button"
              class="btn btn-lg btn-warning onboarding-next-button"
              v-on:click="this.callAndProceed"
          >
            LET'S GET YOUR GOALS SET UP
          </button>
        </div>
      </div>

    </div>
  </div>
=======
  <center class="push">
    <h1>LET'S START WITH THE BASICS</h1>
    <br />
    <p>
      This will help us recommend useful investment opportunities to you based
      on your profile.
    </p>
    <br />
    <h2>
      My preferred name is
      <input type="text" class="" id="preferedName" placeholder="" v-model="preferredName" />. I
      currently live in
      <select class="" v-model="livingCountry">
        <option selected>Name of country</option>
        <option v-for="country, index in countries" :key="index">{{country.countryName}}</option>
      </select>
      and I'm originally from
      <select class="" v-model="originCountry">
        <option selected>Name of country</option>
        <option v-for="country, index in countries" :key="index">{{country.countryName}}</option>
      </select>
    </h2>
    <br /><br />
    <h2>
      I am a successful
      <input type="number" class="" id="age" placeholder="Age" v-model="age" /> year old
      <select class="" v-model="gender">
        <option selected>Gender dropdown</option>
        <option>Male</option>
        <option>Female</option>
        <option>Prefer not to say</option>
      </select>
      with a
      <select class="" v-model="educationLevel">
        <option selected>Education level</option>
        <option>High school</option>
        <option>Bachelors</option>
        <option>Masters</option>
        <option>Post-graduate</option>
      </select>
      level education.
    </h2>
    <br /><br />
    <h2>
      I am
      <select class="" v-model="status">
        <option selected>Status dropdown</option>
        <option>Single</option>
        <option>Married</option>
        <option>Divorced</option>
        <option>Widow/widower</option>
      </select>
      with
      <input type="number" class="" id="children" placeholder="#" v-model="children" /> beautiful
      kids. I work in a
      <select class="" v-model="role">
        <option selected>Roles dropdown</option>
        <option>Entry level</option>
        <option>Mid-management</option>
        <option>Senior management</option>
        <option>Self-employed</option>
        <option>Retired</option>
        <option>In-between jobs</option>
      </select>
      role.
    </h2>
    <br /><br />
    <h2>
      I earn primarily in
      <select class="" v-model="currency">
        <option selected>currency dropdown</option>
        <option v-for="country, index in countries" :key="index">{{country.currencyCode}}</option>
      </select>
    </h2>
    <br /><br />
    <button
      type="button"
      class="btn btn-lg btn-warning"
      v-on:click="$emit('progress', 1)"
    >
      LET'S GET YOUR GOALS SET UP
    </button>
  </center>
>>>>>>> develop
</template>
<script>
import {COUNTRIES, CURRENCIES} from "../helpers";
import {storeOnboardingData} from "../API";

export default {
  mounted() {
    console.log(this.callAndProceed())

  },
  computed: {},
  data() {
    return {
      countries: COUNTRIES,
      currencies: CURRENCIES,
      preferredName: "",
      countryOfOrigin: "",
      countryOfResidence: "",
      numberOfChildren:"",
      numberOfChildrenOptions:['0','1','2','3','4','5','6','7','8','9','10','11+'],
      maritalStatus:"",
      age: "",
      gender: "",
      genderOptions:['Male','Female','Prefer not to say'],
      educationLevelOptions:['High School','Bachelors','Masters','Post-graduate'],
      maritalStatusOptions:['Single','Married','Divorced','Widow/Widower'],
      roleOptions:['Entry Level','Mid-management','Senior-management','Self-employed','Retired','In-between jobs'],
      levelOfEducation: "",
      status: "",
      role: "",
<<<<<<< HEAD
      name:"",
      preferredCurrency: ""
=======
      currency: "",
      children: 0,
      roles: [],
      // currencies: []
>>>>>>> develop
    };
  },
  methods:{

      callAndProceed(){
        let  data = {
          country_of_residence: this.countryOfOrigin,
          country_of_origin: this.countryOfResidence,
          level_of_education: this.levelOfEducation,
          nickname: this.preferredName,
          gender: this.gender,
          marital_status: this.maritalStatus,
          no_of_children: this.numberOfChildren,
          preferred_currency: this.preferredCurrency
        };
        console.log(data)
        storeOnboardingData(data)
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
        /**
         * Emmit progress after the data has been submitted to AP server
         * */
        // this.$emit('progress', 1)
      }
  }
};
</script>
<style scoped>

.basics-component{
  width: 100%;
  margin: 24px;
  text-align: center;
}
.input-paragraph{
  max-width: 1029px;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

}
input:focus{
  border-width: 0 2px 2px 2px;
  border-color: #0a53be;
  border-style: solid;
}
input,select{
  border: none;
  border-bottom: 2px solid #0a53be;
  text-align: center;
}
</style>
<style>
.custom-select-box{
  display: inline-block;
  min-width: 297px;
}
.custom-select-box .vs__selected{
  color: #083e5b;

}
.custom-select-box .vs__search::placeholder, input::placeholder{
  text-align: center;
  font-style: italic;
  font-size: 20px;
  color: #083E5B;
}
.custom-select-box .vs__dropdown-toggle{
  text-align: center;

}
.custom-select-box .vs__search::placeholder,
.custom-select-box .vs__dropdown-toggle,
.custom-select-box .vs__dropdown-menu {
  border: none;
  border-bottom: 2px solid #0a53be;
}

.custom-select-box .vs__clear,
.custom-select-box .vs__open-indicator {
  fill: #7C0225;
}
</style>