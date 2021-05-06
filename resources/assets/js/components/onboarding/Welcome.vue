<template>
  <div class="welcome-component row d-flex flex-column justify-content-center align-items-center text-center">
    <div class="m-auto">

      <img src="v1/images/budgeting_tool/Budgeting tool.png" alt="Logo"/>
      <div class="greeting-message">
        <h1 class="text-white">Hi, {{ name }}</h1>
      </div>
      <div class="welcome-message">
        <h2 class="text-white">Let's make a few selections so we  can give you an experience that works for you</h2>
      </div>
      <br><br>
      <button type="button" class="btn btn-lg btn-warning onboarding-next-button" v-on:click="$emit('progress', 1)">
        CUSTOMIZE YOUR EXPERIENCE</button>

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
      name: "Isaac",
    };
  },
};
</script>
<style scoped>
.push{
  padding-top: 100px;
}
.welcome-component{
  height: 100vh;
  max-width: 768px;
  margin: auto;

}
.welcome-message{
  padding: 27px;
}
.greeting-message{
  padding: 27px;
}
h1{
  font-size: 32px;
}
h2{
  font-size: 22px;
}
</style>