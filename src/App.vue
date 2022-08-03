<template>
  <div>
    <div>
      <button v-on:click="addLike">Like</button>
      <button @click="addDislike">Dislike</button>
    </div>
    <div><strong>Кол-во лайков: {{ likes }}</strong></div>
    <div><strong>Кол-во дизов: {{ dislikes }}</strong></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      likes: 0,
      dislikes: 0
    }
  },
  methods: {
    addLike() {
      this.likes += 1;
    },
    addDislike() {
      this.dislikes += 1;
    }
  }
}
</script>

<style scoped>

</style>