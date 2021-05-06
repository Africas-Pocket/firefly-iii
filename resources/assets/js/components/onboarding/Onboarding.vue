<template>
  <div>

      <div class="m-auto">
        <div class="logo-wrapper py-5">
          <img src="v1/images/budgeting_tool/Budgeting tool.png" alt="Logo"/>
        </div>
        <Welcome v-if="intCurrentStep == 0" v-on:progress="intCurrentStep += $event"></Welcome>
        <Basics v-if="intCurrentStep == 1" v-on:progress="intCurrentStep += $event"></Basics>
        <MoneyGoals v-if="intCurrentStep == 2" v-on:progress="intCurrentStep += $event"></MoneyGoals>
        <Accounts v-if="intCurrentStep == 3" v-on:progress="intCurrentStep += $event"></Accounts>
        <Income v-if="intCurrentStep == 4" v-on:progress="intCurrentStep += $event"></Income>
        <Expenses v-if="intCurrentStep == 5" v-on:progress="intCurrentStep += $event"></Expenses>
      </div>
  </div>
</template>
<script>
import Welcome from './Welcome.vue'
import Basics from './Basics.vue'
import MoneyGoals from './MoneyGoals.vue'
import Accounts from './Accounts.vue'
import Income from './Income.vue'
import Expenses from './Expenses.vue'

export default {
  name: 'Onboarding',
  components: {Welcome, Basics, MoneyGoals, Accounts, Income, Expenses},
  mounted() {
    // console.log('Component mounted.')
  },
  computed: {},
  data() {
    return {
      name: "Isaac",
      intCurrentStep: 2
    };
  },
};
</script>
<style scoped>

</style>