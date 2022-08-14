import axios from "axios";

export const postModule = {
    state: () => ({
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
    }),
    getters: {
        sortedPost(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]));
        },
        sortedAndSearchPost(state, getters) {
            return getters.sortedPost.filter(post => post.title.includes(state.searchQuery));
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        }
    },
    actions: {
        async fetchPost({state, commit}) {
            try {
                commit('isPostLoading', true);
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        },
                    });
                    commit('posts', response.data);
                }, 1000);
            } catch (e) {
                console.log('Error:', e)
            } finally {
                commit('isPostLoading', false);
            }
        },
        async loadMorePost(state, commit) {
            try {
                commit('page', state.page + 1);
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        },
                    });
                    commit('posts', [...state.posts, ...response.data]);
                }, 1000);
            } catch (e) {
                console.log('e', e);
            } finally {
                // this.isPostLoading = false;
            }
        }
    },
    namespaced: true
}