<template>
  <center class="push">
    <h1>Hi, {{ name }}</h1>
    <br><br>
    <h2>Let's make a few selections so we <br> can give you an experience that <br> works for you</h2>
    <br><br>
    <button type="button" class="btn btn-lg btn-warning" v-on:click="$emit('progress', 1)">CUSTOMIZE YOUR EXPERIENCE</button>
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
      name: "Isaac",
    };
  },
};
</script>
<style scoped>
.push{
  padding-top: 100px;
}
</style>