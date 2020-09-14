<template>
    <div class="comment" v-if="!isDeleted">
        <section id="top_part">
            <router-link :to="pathToProfile" id="author">
                <img src="../assets/images/photo_profile.jpg" alt="photo profil" id="photo_profile" />
                <div id="author_description">
                    <p>{{name}} {{firstname}}</p>
                    <sub>{{moment}}</sub>
                </div>
            </router-link>
            <div id="edit_post">
                <a id="delete_post" v-if="showDelete" v-on:click="deleteComment">
                    <img src="../assets/images/icon_delete.svg" alt="icon pour supprimer son post" id="delete_post" />
                </a>
            </div>
        </section>
        <section id="body_comment">
            <p>{{description}}</p>
            <img :src="fileUrl" v-if="showImage" />
            <video controls v-if="showVideo"><source :src="fileUrl" :type="fileType" /></video>
        </section>

    </div>

</template>

<script>
    const axios = require('axios');

    import moment from 'moment'

    export default {
        name: 'Comment',
        components: {

        },
        props: {
            author: {
                type: Object
            },
            description: { type: String },
            fileUrl: { type: String },
            date: { type: String },
            fileType: { type: String },
            id: { type: Number },
            postid: {type: Number}
        },
        data() {
            return {
                isDeleted: false
            };
        },
        computed: {
            pathToProfile() {
                if (this.author) {
                    return "/profile/" + this.author.id;
                }
                else {
                    return "";
                }
            },
            showImage() {
                return this.fileType && this.fileType.split("/")[0] == "image";
            },
            showVideo() {
                return this.fileType && this.fileType.split("/")[0] == "video";
            },
            showDelete() {
                return (this.author && this.author.id == sessionStorage.getItem("accountId")) || sessionStorage.getItem("isAdmin") == "true";
            },
            name() {
                if (this.author && this.author.name) {
                    return this.author.name;
                }
                else {
                    return 'Ancien employé';
                }
            },
            firstname() {
                if (this.author && this.author.firstname) {
                    return this.author.firstname;
                }
                else {
                    return '';
                }
            },
            moment() {
                return moment(this.date, "YYYY-MM-DD hh:mm:ssZ").calendar();
            },
        },
        methods: {
            deleteComment() {
                axios.delete('http://localhost:3000/api/post/' + this.postid + '/comment/' + this.id, this.getHeader())
                    .then(() => {
                        this.isDeleted = true;
                    })
            }
        },
    }
</script>

<style scoped lang="scss">

    @import "../assets/colors.scss";


    * {
        font-family: 'Poppins', sans-serif;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        &:hover

    {
        filter: brightness(0.60);
    }

    }

    h1 {
        font-size: 1.8em;
        color: $dark-blue;
    }

    p {
        font-size: 1em;
        color: $text-grey;
        line-height: 1.5em;
    }

    sub {
        font-size: 0.9em;
        color: $text-sub-grey;
    }

    .comment {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        padding-bottom: 1em;

    }


    #top_part {
        width: 100%;
        padding-left: 2%;
        padding-right: 2%;
        padding-bottom: 0.5rem;
    }

        #top_part p {
            font-weight: bold;
            padding-left: 0;
            padding-bottom: 0rem;
        }

    #top_part {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-top: 1.5em;
    }

    #author {
        display: flex;
        width: 70%;
    }


    #author_description {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }


    #edit_post {
        display: flex;
        justify-content: flex-end;
        img

    {
        width: 1.5em;
        margin-left: 0.7em;
    }

    a {
        cursor: pointer;
    }

    }


    #photo_profile {
        width: 2.5em;
        height: 2.5em;
        border-radius: 50%;
        margin-right: 0.5em;
    }

    video, img {
        width: 100%;
    }

    #body_comment {
        width: 88%;
        margin-right: 2%;
    }
</style>