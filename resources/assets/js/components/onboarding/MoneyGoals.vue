<template>
  <div class="money-goal-component">
    <div class="m-auto">
      <div class="page-header py-4">
        <h1 class="text-primary">WHAT ARE YOUR MONEY GOALS?</h1>
        <div>
          <p class="text-primary">Pick all that apply</p>
        </div>
      </div>
      <div class="money-goal-wrapper p-4">
        <div v-for="moneyGoal in moneyGoals" class="btn btn-warning money-goal-item">
          <h1 class="goal-title text-uppercase">{{ moneyGoal.title }}</h1>
          <p class="goal-subtitle" v-if="moneyGoal.subtitle">{{ moneyGoal.subtitle }}</p>
        </div>
      </div>
    </div>

    <div class="next-button">
      <button type="button" class="btn float-right btn-lg btn-primary" v-on:click="$emit('progress', 1)">Next <i class="fa text-warning fa-arrow-right"></i></button>
      <button type="button" class="btn float-left btn-lg btn-primary" v-on:click="$emit('progress', 1)">Next <i class="fa text-warning fa-arrow-right"></i></button>
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
      moneyGoals:[
        {
          id:0,
          title:"track your spending",
        },
        {
          id:1,
          title:"save an emergency fund",
          subtitle:"3-6 months of your living expenses"
        },
        {
          id:1,
          title:"save an emergency fund",
          subtitle:"3-6 months of your living expenses"
        },
        {
          id:1,
          title:"save an emergency fund",
          subtitle:"3-6 months of your living expenses"
        },
        {
          id:1,
          title:"save an emergency fund",
          subtitle:"3-6 months of your living expenses"
        },
      ]
    };
  },
};
</script>
<style scoped>
.money-goal-component{
  width: 100%;
  text-align: center;
  margin: 24px;
}
.money-goal-wrapper{

  max-width: 1029px;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.money-goal-item{
  display: block;
  padding: 15px;
  text-align: center;
  max-width: 646px;
  margin-bottom: 48px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  min-width: 105px;
}
.money-goal-item .goal-title{
  color: #7C0225;
  text-transform: uppercase;
}
.money-goal-item .goal-subtitle{
  color: #083E5B;
  font-style: italic;
}

</style>