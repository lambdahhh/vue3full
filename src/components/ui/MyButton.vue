<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script>
export default {
  name: "MyButton"
}
</script>

<style scoped>
.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>