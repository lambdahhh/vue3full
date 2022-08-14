<template>
  <div class="navbar">
    <div>VUE3</div>
    <ul>
      <li><my-button @click="$router.push('/')">Главная</my-button></li>
      <li><my-button @click="$router.push('/posts')">Посты</my-button></li>
      <li><my-button @click="$router.push('/about')">О нас</my-button></li>
      <li><my-button @click="$router.push('/store')">Store</my-button></li>
    </ul>
  </div>
</template>

<script>
import MyButton from "@/components/ui/MyButton";
export default {
  name: "Navbar",
  components: {MyButton}
}
</script>

<style scoped>
.navbar {
  height: 65px;
  background-color: wheat;
  display: flex;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  font-weight: bold;
  margin: 0;
  padding: 0;
}
/*li a {*/
/*  color: antiquewhite;*/
/*}*/
</style>