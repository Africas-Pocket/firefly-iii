<template>
  <div class="text-center">

    <div class="greeting-message">
      <h1 class="text-white">Hi, {{ name }}</h1>
    </div>
    <div class="welcome-message">
      <h2 class="text-white">Congratulations! You’re all set.</h2>
    </div>
    <br><br>
    <a :href="url" class="btn btn-lg btn-warning onboarding-next-button" v-on:click="$emit('progress', 1)">
      VIEW DASHBOARD</a>

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
      url:"http://localhost:8000"
    };
  },
};
</script>
<style scoped>
img{
  width: 100%;
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
@media only screen and (min-device-width: 375px ) {
  h1,h2{
    color: #083E5B !important;
  }

}
</style>