<template>
  <div class="container">
    <PostForm
        @create="createPost"
    />
    <PostList
        :posts="posts"
        @deletePost="deletePost"
    />
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";

export default {
  name: "App",
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'Javascript', body: 'Описание поста 1'},
        {id: 2, title: 'React', body: 'Описание поста 2'},
        {id: 3, title: 'Vue', body: 'Описание поста 3'},
        {id: 4, title: 'Angular', body: 'Описание поста 4'},
      ],
      title: '',
      body: ''
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
    },
    deletePost(id) {
      this.posts = this.posts.filter(post => post.id !== id);
    }
  }
}
</script>

<style>
 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
 }
 .container {
   width: 100%;
   max-width: 1200px;
   margin: 10px auto;
 }
</style>