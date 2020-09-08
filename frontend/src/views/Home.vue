<template>
    <ConnectedPage>
        <Post v-for="post in posts"
              :authorId="post.account.id"
              :authorFirstname="post.account.firstname"
              :authorName="post.account.name"
              :title="post.title"
              :description="post.description"
              :fileUrl="post.fileUrl"
              :fileType="post.fileType"
              :date="post.updatedAt"
              :id="post.id"
              :key="post.id"/>
    </ConnectedPage>
</template>

<script>
    // @ is an alias to /src
    import ConnectedPage from '@/components/ConnectedPage.vue'
    import Post from '@/components/Post.vue'

    const axios = require('axios');

    export default {
        name: 'Home',
        components: {
            ConnectedPage,
            Post
        },
        data() {
            return {
                posts: [],
            }
        },
        mounted() {
            axios
                .get('http://localhost:3000/api/post/')
                .then(response => (this.posts = response.data))
        }
    }
</script>
