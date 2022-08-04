<template>
  <div v-if="posts.length > 0">
    <h3>Список постов:</h3>
    <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @deletePost="$emit('delete-post', post.id)"
    />
  </div>
  <p v-else>Постов нет...</p>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  name: "PostList",
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>