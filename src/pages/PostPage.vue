<template>
  <div class="container">
    <div class="app_btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      ></my-select>
      <br><br>
      <my-dialog
          v-model:show="dialogVisible"
      >
        <PostForm
            @create="createPost"
        />
      </my-dialog>
    </div>
    <my-input
        placeholder="Поиск...."
        v-model="searchQuery"
    ></my-input>
    <PostList
        :posts="sortedAndSearchPost"
        @deletePost="deletePost"
    />
    <div v-if="isPostLoading === true">Посты загружаются</div>
    <div ref="observer" class="observer"></div>
    <!--    <div class="page_wrapper">-->
    <!--      <div-->
    <!--        class="page"-->
    <!--        v-for="pageNumber in totalPages"-->
    <!--        :key="page"-->
    <!--        @click="changePage(pageNumber)"-->
    <!--        :class="{-->
    <!--        'current-page': page === pageNumber-->
    <!--        }">-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import MyDialog from "@/components/ui/MyDialog";
import MyButton from "@/components/ui/MyButton";
import axios from 'axios';
import MyInput from "@/components/ui/MyInput";

export default {
  name: "PostPage",
  components: {
    MyInput,
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
      isPostLoading: false,
      selectedSort: '',
      page: 1,
      limit: 10,
      totalPages: 10,
      sortOptions: [
        {name: 'По названию', value: 'title'},
        {name: 'По содержимому', value: 'body'},
      ],
      searchQuery: ''
    }
  },
  mounted() {
    // this.fetchPost();

    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePost();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);

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
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPost() {
      try {
        this.isPostLoading = true;
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            },
          });
          this.posts = response.data;
        }, 1000);
      } catch (e) {
        console.log('Error:', e)
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePost() {
      try {
        this.page++;
        // this.isPostLoading = true;
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            },
          });
          this.posts = [...this.posts, ...response.data];
        }, 1000);
      } catch (e) {
        console.log('Error:', e)
      } finally {
        // this.isPostLoading = false;
      }
    }
  },
  computed: {
    sortedPost() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
    sortedAndSearchPost() {
      return this.sortedPost.filter(post => post.title.includes(this.searchQuery));
    }
  },
  watch: {
    // page() {
    //   this.fetchPost();
    // }
  }
}
</script>

<style>


.container {
  width: 100%;
  max-width: 1200px;
  margin: 10px auto;
}

.app_btns {
  display: flex;
  justify-content: space-between;
}

.page_wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: green;
}
</style>