<template>
  <center class="push">
    <h1>WHAT ARE YOUR MONEY GOALS?</h1>
    <br>
    <p>Pick all that apply</p>
    <br>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        TRACK YOUR SPENDING
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        SAVE AN EMERGENCY FUND
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        INVEST FOR A FUTURE GOAL
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        PLAN FOR RETIREMENT
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        BUILD WEALTH
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        PAY OFF DEBT
      </label>
    </div>
    <br><br>
    <button type="button" class="btn btn-lg btn-warning" v-on:click="$emit('progress', 1)">-></button>
  </center>
</template>
<script>
export default {
  mounted() {
    // console.log('Component mounted.')
  },
  computed: {},
  data() {
    return {
      
    };
  },
};
</script>
<style scoped>
.push{
  padding-top: 100px;
}
</style>