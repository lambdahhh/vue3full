<template>
  <div class="container">
    <my-button @click="showDialog">Создать пост</my-button>
    <br><br>
    <my-dialog
        v-model:show="dialogVisible"
    >
      <PostForm
          @create="createPost"
      />
    </my-dialog>
    <PostList
        :posts="posts"
        @deletePost="deletePost"
    />
    <div v-if="isPostLoading === true">Посты загружаются</div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import MyDialog from "@/components/ui/MyDialog";
import MyButton from "@/components/ui/MyButton";
import axios from 'axios';

export default {
  name: "App",
  components: {
    MyButton,
    MyDialog,
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [],
      title: '',
      body: '',
      dialogVisible: false,
      isPostLoading: false
    }
  },
  mounted() {
    this.fetchPost();
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    deletePost(id) {
      this.posts = this.posts.filter(post => post.id !== id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPost() {
      try {
        this.isPostLoading = true;
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
          this.posts = response.data;
        }, 1000);
      } catch (e) {
        console.log('Error:', e)
      } finally {
        this.isPostLoading = false;
      }
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