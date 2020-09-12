<template>
    <ConnectedPage>
        <div id="container_post">
            <div id="shortcut_buttons">
                <router-link :to="pathToMyProfile" id="my_profile"><img src="../assets/images/icon_profile.svg" alt="lien direct à son profil" id="plus" />Mon Profil</router-link>
                <a id="my_creation" @click="showModal = true"><img src="../assets/images/icon_plus.svg" alt="lien direct créer un post" id="plus" />Je veux créer un POST !</a>
                <Lightbox v-if="showModal" @close="showModal = false"><CreatePost></CreatePost></Lightbox>
            </div>
            <Post v-for="post in posts"
                  :author="post.account"
                  :title="post.title"
                  :description="post.description"
                  :fileUrl="post.fileUrl"
                  :fileType="post.fileType"
                  :date="post.updatedAt"
                  :id="post.id"
                  :key="post.id" class="post" />
        </div>
    </ConnectedPage>
</template>

<script>
    // @ is an alias to /src
    import Vue from 'vue'
    import ConnectedPage from '@/components/ConnectedPage.vue'
    import Post from '@/components/Post.vue'
    import Lightbox from '@/components/Lightbox.vue'
    import CreatePost from '@/components/CreatePost.vue'


    const axios = require('axios');

    export default {
        name: 'Home',
        components: {
            ConnectedPage,
            Post,
            Lightbox,
            CreatePost
        },
        data() {
            return {
                posts: [],
                showModal: false

            }
        },
        mounted() {
            axios
                .get('http://localhost:3000/api/post/')
                .then(response => (this.posts = response.data))
        },
        computed: {
            pathToMyProfile() {
                return "/profile/" + sessionStorage.getItem("accountId");
            }
        },
        methods: {
            showCreateForm() {
                var ComponentClass = Vue.extend(Lightbox)
                var instance = new ComponentClass()
                instance.$mount() // pass nothing
                this.$refs.container.appendChild(instance.$el)
            }
        }
    }
</script>
<style scoped lang="scss">

    @import "../assets/colors.scss";

    #container_post {
        width: 32%;
    }

    #shortcut_buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        font-family: 'Fjalla One', sans-serif;
        font-size: 1.3em;
        letter-spacing: 0.05em;
        margin: 1em 0em 1em 0em;
    }

        #shortcut_buttons img {
            height: 1.3em;
            margin-right: 0.4em;
        }

    #my_profile, #my_creation {
        text-decoration: none;
        border-radius: 0.2em;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $white;
        padding: 0.5em;
        width: 38%;
        background-color: darken($text-grey, 10%);
        box-shadow: 0em 0em 0.4em 0.1em rgba($medium-blue, 0.2);
    }

    #my_profile {
        width: 37%;
        background-color: $medium-blue;
    }

    #my_creation {
        width: 61%;
        background-color: $dark-blue;
    }

    .post {
        background-color: $white;
        border-radius: 0.2em;
        margin-bottom: 1em;
        box-shadow: 0em 0em 0.4em 0.1em rgba($medium-blue, 0.2);
    }
</style>
