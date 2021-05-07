<template>
  <div>

    <div class="m-auto">
      <div class="logo-wrapper text-center py-5">
        <img src="v1/images/budgeting_tool/Budgeting tool.png" alt="Logo"/>
      </div>
      <div class="col-sm-8 m-auto">
        <a-steps type="navigation" :current="intCurrentStep" @change="onChange">
          <a-step :key="currentStep.title" v-for="currentStep in steps" :title="currentStep.title"/>
        </a-steps>
      </div>

      <Welcome v-if="intCurrentStep == 0" v-on:progress="intCurrentStep += $event"></Welcome>
      <Basics v-if="intCurrentStep == 1" v-on:progress="intCurrentStep += $event"></Basics>
      <MoneyGoals v-if="intCurrentStep == 2" v-on:progress="intCurrentStep += $event"></MoneyGoals>
      <Accounts v-if="intCurrentStep == 3" v-on:progress="intCurrentStep += $event"></Accounts>
      <Income v-if="intCurrentStep == 4" v-on:progress="intCurrentStep += $event"></Income>
      <Expenses v-if="intCurrentStep == 5" v-on:progress="intCurrentStep += $event"></Expenses>
      <div class="col-sm-8 m-auto">
        <div class="steps-action">
          <a-button v-if="intCurrentStep < steps.length - 1 && intCurrentStep !==0" type="primary" @click="next">
            Next
          </a-button>
          <a-button
              v-if="intCurrentStep === steps.length - 1"
              type="primary"
              @click="$message.success('Processing complete!')"
          >
            Done
          </a-button>
          <a-button v-if="intCurrentStep > 0" style="margin-left: 8px" @click="prev">
            Previous
          </a-button>
        </div>
      </div>
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
      intCurrentStep: 3,
      current: 0,
      steps: [
        {
          title: 'Basics',
        },
        {
          title: 'Money Goals',
        },
        {
          title: 'Accounts',
        },
        {
          title: 'Income',
        },
        {
          title: 'Expenses',
        },
      ],
    }
  },
  methods: {
    next() {
      this.intCurrentStep++;
    },
    prev() {
      this.intCurrentStep--;
    },
    onChange(current) {
      this.intCurrentStep = current;
    },
  },

};
</script>
<style scoped>

</style>