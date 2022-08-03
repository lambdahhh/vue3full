<template>
  <div>
    <form @submit.prevent>
      <h4>Создать пост</h4>
      <input
          v-model="post.title"
          class="input"
          type="text"
          placeholder="Название">
      <input
          v-model="post.body"
          class="input" type="text"
          placeholder="Описание">
      <button class="btn" @click="createPost">Отправить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostForm",
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 10px 15px;
  margin: 15px;
  border: 2px solid teal;
}
form {
  display: flex;
  flex-direction: column;
}
.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
}
</style>