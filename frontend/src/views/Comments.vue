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

                <div id="create_comment">
                    <img src="../assets/images/photo_profile.jpg" alt="photo profil" id="photo_profile" />
                    <form>
                        
                            <TextareaAutosize id="description_newcomment" name="description_newcomment" placeholder="Votre commentaire..." v-model="newComment.description"/>

                            <div class="add_files">
                                <label for="image_post">
                                    <img v-bind:src="iconPhoto" alt="ajouter une photo" class="icon_form" />
                                </label>
                                <input type="file" id="image_post" name="image_post" accept="image/png, image/jpeg, image/jpg" @change="imageIsUploaded()">
                                <label for="gif_post">
                                    <img v-bind:src="iconGif" alt="ajouter un gif" class="icon_form" />
                                </label>
                                <input type="file" id="gif_post" name="gif_post" accept="image/gif" @change="gifIsUploaded()">
                            </div>
                    </form>
                    <div id="publish">
                        <button v-on:click="createComment()">Publier</button>
                    </div>
                </div>
                <hr v-if="hasComment" />
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
    const axios = require('axios');

    import ConnectedPage from '@/components/ConnectedPage.vue'
    import Post from '@/components/Post.vue'
    import Comment from '@/components/Comment.vue'
    import photo from "../assets/images/icon_photo.svg"
    import photoClicked from "../assets/images/icon_photo_clicked.svg"
    import gif from "../assets/images/icon_gif.svg"
    import gifClicked from "../assets/images/icon_gif_clicked.svg"

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
                comments: [],
                newComment: {},
                iconPhoto: photo,
                iconGif: gif,
                fileToUpload: null
            }
        },
        mounted() {
            const postId = this.$route.params.postid;
            axios
                .get('http://localhost:3000/api/post/' + postId, this.getHeader())
                .then(response => (this.post = response.data));
            axios
                .get('http://localhost:3000/api/post/' + postId + '/comment', this.getHeader())
                .then(response => (this.comments = response.data))
        },
        computed: {
            hasComment() {
                return this.comments.length > 0;
            }
        },
        methods: {
            createComment() {
                const postId = this.$route.params.postid;
                console.log(JSON.stringify(this.newComment));
                var formData = new FormData();
                formData.append("comment", JSON.stringify(this.newComment));
                formData.append("accountId", sessionStorage.getItem("accountId"));
                formData.append("file", this.fileToUpload);


                axios.post('http://localhost:3000/api/post/' + postId + '/comment', formData, {
                    headers: {
                        ...this.getHeader().headers,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(() => {
                        this.$router.go();
                    })
            },
            imageIsUploaded() {
                const imageInputFile = document.getElementById('image_post');

                if (imageInputFile.files.length == 1) {
                    this.iconPhoto = photoClicked;
                    this.iconGif = gif;
                    this.fileToUpload = imageInputFile.files[0];

                } else {
                    this.iconPhoto = photo;
                    this.fileToUpload = null;

                }
            },
            gifIsUploaded() {
                const gifInputFile = document.getElementById('gif_post');

                if (gifInputFile.files.length == 1) {
                    this.iconGif = gifClicked;
                    this.iconPhoto = photo;
                    this.fileToUpload = gifInputFile.files[0];
                } else {
                    this.iconGif = gif; 
                    this.fileToUpload = null;
                    
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    @import "../assets/colors.scss";

    h1 {
        width: 100%;
        font-family: 'Fjalla One', sans-serif;
        font-size: 1.5em;
        color: $medium-blue;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        text-align: center;
        flex-grow: 100;
        margin-right: 1.5em;
    }

    hr {
        border-style: none;
        height: .1em;
        background-color: $text-light-grey;
    }

    #page_comments {
        width: 32%;
    }

    .post_with_comments {
        background-color: $white;
        border-radius: 0.2em;
        box-shadow: 0em 0em 0.4em 0.1em rgba($medium-blue, 0.2);
        margin-bottom: 2em;
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
    }

    }

    #create_comment {
        width: 100%;
        padding: 4% 2% 4% 2%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        #photo_profile {
                width: 7%;
                height: 7%;
            }
    }

    form {
        width: 90%;
        display:flex;
        border: 0.1em solid $text-light-grey;
        background-color: white;
        padding: 0.3em;
        
        
        &:focus-within
    {
        outline: 0.1em solid $dark-blue;
    }

        textarea

    {
        width: 100%;
        flex-grow: 100;
        resize: vertical;
        outline: none;
        border: none;
        /*border: 0.1em solid $pink;*/
        font-size: 1em;

    }
    }


    .add_files > input {
        display: none;
    }

    .add_files {
        display: flex;
        flex-grow: 1;
        align-items: flex-end;
    }
    .icon_form 
    {
        width: 1.8em;
        height: auto;
        cursor: pointer;
        margin-left: 0.8em;
    }

    #publish {
        display: flex;
        width: 100%;
        justify-content: flex-end;

    }
    button {
        cursor: pointer;
        border: none;
        width: 20%;
        margin-top: 0.7em;
        border-radius: 0.5em;
        padding: 0.15em 1em 0.15em 1em;
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        color: $white;
        text-align: center;
        background-color: $pink;

         &:hover

    {
        background-color: darken($pink, 4%);
        box-shadow: 1px 1px 3px 2px darken($pink,10%) inset;
        transform: scale(0.995);
    }
    }

</style>