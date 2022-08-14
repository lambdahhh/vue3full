<template>
  <div class="container">
    <div class="app_btns">
      <my-button @click="showDialog">Создать пост</my-button>
<!--      <my-select-->
<!--          v-model="selectedSort"-->
<!--          :options="sortOptions"-->
<!--      ></my-select>-->
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
        v-focus
        placeholder="Поиск...."
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
    ></my-input>
    <PostList
        :posts="sortedAndSearchPost"
        @deletePost="deletePost"
    />
    <div v-if="isPostLoading === true">Посты загружаются</div>
    <div v-intersection="loadMorePost" class="observer"></div>
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
import MyInput from "@/components/ui/MyInput";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: "PostPageWithStore",
  components: {
    MyInput,
    MyButton,
    MyDialog,
    PostForm,
    PostList
  },
  mounted() {
    // this.fetchPost();
    //
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePost();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);

  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery'
    }),
    ...mapActions({
      loadMorePost: 'post/loadMorePost',
      fetchPost: 'post/fetchPost',
    }),
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

  },
  computed: {
    ...mapState({
        posts: state => state.post.posts,
        dialogVisible: false,
        isPostLoading: state => state.post.isPostLoading,
        selectedSort: state => state.post.selectedSort,
        page: state => state.post.page,
        limit: state => state.post.limit,
        totalPages: state => state.post.totalPages,
        searchQuery: state => state.post.searchQuery
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPost',
      sortedAndSearchPost: 'post/sortedAndSearchPost',
    })
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