<template>
    <ConnectedPage>
        <article id="page_comments">
            <section id="top_page">
                <router-link to="/home" id="return_home"><img src="../assets/images/icon_return.svg" alt="retour à la page Home" /></router-link>
                <h1>Commentaires</h1>
            </section>
            <Post :author="post.account"
                  :title="post.title"
                  :description="post.description"
                  :fileUrl="post.fileUrl"
                  :fileType="post.fileType"
                  :date="post.updatedAt"
                  :id="post.id"
                  :key="post.id" class="post_with_comments">
                <Comment v-for="comment in comments"
                         :author="comment.account"
                         :description="comment.description"
                         :fileUrl="comment.fileUrl"
                         :fileType="comment.fileType"
                         :date="comment.createdAt"
                         :id="comment.id"
                         :postid="comment.postId"
                         :key="comment.id" class="comment">

                </Comment>

            </Post>
        </article>
    </ConnectedPage>
</template>

<script>

    import ConnectedPage from '@/components/ConnectedPage.vue'
    import Post from '@/components/Post.vue'
    import Comment from '@/components/Comment.vue'

    const axios = require('axios');

    export default {
        name: 'Comments',
        components: {
            ConnectedPage,
            Post,
            Comment
        },
        data() {
            return {
                post: {},
                comments: []
            }
        },
        mounted() {
            const postId = this.$route.params.postid;
            axios
                .get('http://localhost:3000/api/post/' + postId)
                .then(response => (this.post = response.data));
            axios
                .get('http://localhost:3000/api/post/' + postId + '/comment')
                .then(response => (this.comments = response.data))
        },
    }
</script>

<style scoped lang="scss">

    @import "../assets/colors.scss";

    h1 {
        font-family: 'Fjalla One', sans-serif;
        font-size: 1.5em;
        color: $medium-blue;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    }

    #page_comments {
        width: 32%;
    }

    .post_with_comments {
        background-color: $white;
        border-radius: 0.2em;
        box-shadow: 0em 0em 0.4em 0.1em rgba($medium-blue, 0.2);
    }

    #top_page {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 3.2em;
        margin-bottom: 2.5em;
        img

    {
        height: 1.8em;
        margin-right: 12.5em;
    }
    }
</style>