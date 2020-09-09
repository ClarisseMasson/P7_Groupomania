<template>
    <div class="post" v-if="!isDeleted">
        <section id="top_part">
            <a id="author">
                <img src="../assets/images/photo_profile.jpg" alt="photo profil" id="photo_profile" />
                <div id="author_description">
                    <p>{{authorName}} {{authorFirstname}}</p>
                    <sub>{{date}}</sub>
                </div>
            </a>
            <div id="edit_post">
                <a id="modify_post" v-if="showModify" v-on:click="modifyPost">
                    <img src="../assets/images/icon_modify.svg" alt="icon pour modifier son post" id="modify_post" />
                </a>
                <a id="delete_post" v-if="showDelete" v-on:click="deletePost">
                    <img src="../assets/images/icon_delete.svg" alt="icon pour supprimer son post" id="delete_post" />
                </a>
            </div>
        </section>
        <h1>{{title}}</h1>
        <p>{{description}}</p>
        <img :src="fileUrl" v-if="showImage" />
        <video controls v-if="showVideo"><source :src="fileUrl" :type="fileType" /></video>
        <section id="bottom_part">
            <div id="like">
                <a id="like_post">
                    <img src="../assets/images/icon_like.svg" alt="liker le post" id="modify_post" />
                </a>
                <a id="unlike_post">
                    <img src="../assets/images/icon_dislike.svg" alt="ne pas aimer le post" id="delete_post" />
                </a>
            </div>
            <a id="comment">
                <img src="../assets/images/icon_comment.svg" alt="icon pour supprimer son post" id="delete_post" />
                <p>Commentez</p>
            </a>
        </section>
        <!--<button v-if="showModify">modify</button>
    <button v-if="showDelete" v-on:click="deletePost">supprimer</button>-->
    </div>
</template>

<script>
    const axios = require('axios');

    export default {
        name: 'Post.vue',
        components: {

        },
        props: {
            authorName: { type: String },
            authorFirstname: { type: String},
            title: { type: String },
            description: { type: String },
            fileUrl: { type: String },
            date: { type: String },
            authorId: { type: Number },
            fileType: { type: String },
            id: {type: Number}
        },
        data() {
            return { isDeleted: false, isModified: false };
        },
        computed: {
            showImage() {
                return this.fileType && this.fileType.split("/")[0] == "image";
            },
            showVideo() {
                return this.fileType && this.fileType.split("/")[0] == "video";
            },
            showDelete() {
                return this.authorId == sessionStorage.getItem("accountId") || sessionStorage.getItem("isAdmin") == "true";
            },
            showModify() {
                return this.authorId == sessionStorage.getItem("accountId");
            }
        },
        methods: {
            deletePost() {
                axios.delete('http://localhost:3000/api/post/' + this.id)
                    .then(() => {
                        this.isDeleted = true;
                    })
            },
            modifyPost() {
                axios.put('http://localhost:3000/api/post/' + this.id)
                    .then(() => {
                        this.isModified = true;
                    })
            }
        }
    }
</script>

<style scoped lang="scss">

    @import "../assets/colors.scss";

    * {
        font-family: 'Poppins', sans-serif;
    }
    
    a {
        cursor: pointer;
    }

    h1{
        font-size: 1.8em;
        color: $dark-blue;
    }
    
    p {
        font-size: 1em;
        color: $text-grey;
        text-align: justify;
        line-height: 1.5em;
    }

    sub{
        font-size: 0.9em;
        color: $text-sub-grey;
    }

    #top_part, h1, p, #bottom_part{
        padding-left: 2%;
        padding-right: 2%;
        padding-bottom: 0.5rem;
    }

    #top_part p{
        font-weight: bold;
        padding-bottom: 0rem;
    }

    #top_part {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-top: 1em;
    }

    #author {
        display: flex;
        width: 70%;
    }

    
    #author_description {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }


    #edit_post {
        display: flex;
        justify-content: flex-end;

        img {
            width: 1.5em;
            margin-left: 0.7em;
        }

        a {
            cursor: pointer;
        }
    }


    #photo_profile {
        width : 3em;
        height: 3em;
        border-radius: 50%;
        margin-right: 0.5em;
    }

    video, img {
        width: 100%;
    }

    #bottom_part {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 0.5rem;
    }

    #bottom_part img{
        width: 1.5em;
    }

    #like a{
        margin-right: 0.7em;
    }

    #comment {
        display: flex;
        justify-content: flex-end;
        p {
              margin-left:0.1em;
              align-self: center;
              padding-bottom: 0 !important;
              line-height: normal;
          }
    }

    

</style>