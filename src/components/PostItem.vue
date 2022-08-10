<template>
    <div class="post">
      <div>
        <div><strong>Название:</strong> {{ post.title }}</div>
        <div><strong>Описание:</strong> {{ post.body }}</div>
      </div>
      <div class="btns">
        <my-button @click="$emit('delete-post', post.id)">Delete</my-button>
        <my-button @click="$router.push(`/posts/${post.id}`)">Open</my-button>
      </div>
    </div>
</template>

<script>

export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin: 15px;
  display: flex;
  justify-content: space-between;
}
.btns {
  display: flex;
}
</style>