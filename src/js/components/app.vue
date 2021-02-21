<template>
  <p class="center">{{ msg }}</p>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello Vue.js!',
    }
  }
}
</script>

<style scoped>
.center {
  color: red;
}
</style>
