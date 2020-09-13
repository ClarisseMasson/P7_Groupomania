<template>
    <div class="post" v-if="!isDeleted">
        <section id="top_part">
            <router-link :to="pathToProfile" id="author">
                <img src="../assets/images/photo_profile.jpg" alt="photo profil" id="photo_profile" />
                <div id="author_description">
                    <p>{{name}} {{firstname}}</p>
                    <sub>{{moment}}</sub>
                </div>
            </router-link>
            <div id="edit_post">
                <a id="modify_post" v-if="showModify" @click="showModal = true">
                    <img src="../assets/images/icon_modify.svg" alt="icon pour modifier son post" id="modify_post" />
                </a>
                <Lightbox boxTitle="Modifier mon POST" v-if="showModal" @close="showModal = false">
                   <CreatePost :post="postForUpdate"></CreatePost>            
                </Lightbox>
                <a id="delete_post" v-if="showDelete" v-on:click="deletePost">
                    <img src="../assets/images/icon_delete.svg" alt="icon pour supprimer son post" id="delete_post" />
                </a>
            </div>
        </section>
        <h1>{{title}}</h1>
        <p>{{description}}</p>
        <img :src="fileUrl" v-if="showImage" />
        <video controls v-if="showVideo"><source :src="fileUrl" :type="fileType" /></video>
        <slot>
            <section id="bottom_part">
                <a id="like_post" v-on:click="toggleLike()">
                    <img src="../assets/images/icon_like.svg" alt="liker le post" v-if="!isLiked" />
                    <img src="../assets/images/icon_liked.svg" alt="le post est liké" v-if="isLiked" />
                    <p>{{likes.length}} {{likeMessage}}</p>
                </a>
                <router-link :to="pathToComments" id="comment">
                    <img src="../assets/images/icon_comment.svg" alt="icon pour supprimer son post" id="delete_post" />
                    <p>Commentez</p>
                </router-link>
            </section>
        </slot>

    </div>

</template>

<script>
    const axios = require('axios');

    import moment from 'moment'
    import Lightbox from '@/components/Lightbox.vue'
    import CreatePost from '@/components/CreatePost.vue'

    export default {
        name: 'Post.vue',
        components: {
            Lightbox,
            CreatePost
        },
        props: {
            author: {
                type: Object
            },
            title: { type: String },
            description: { type: String },
            fileUrl: { type: String },
            date: { type: String },
            fileType: { type: String },
            id: { type: Number },
        },
        data() {
            return {
                isDeleted: false,
                isModified: false,
                likes: [],
                showModal: false
            };
        },
        computed: {
            postForUpdate() {
                return {
                    id: this.id,
                    title: this.title,
                    description: this.description,
                    fileUrl: this.fileUrl,
                    fileType: this.fileType
                };
            },
            pathToProfile() {
                if (this.author) {
                    return "/profile/" + this.author.id;
                }
                else {
                    return "";
                }
            },
            pathToComments() {
                return "/post/" + this.id + "/comments/" ;
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
            showModify() {
                return (this.author && this.author.id == sessionStorage.getItem("accountId"));
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
            isLiked() {
                let mylikes = this.likes.filter(like => like.accountId == sessionStorage.getItem("accountId"))
                if (mylikes.length >= 1) {
                    return true;
                }
                else {
                    return false;
                }
            },
            likeMessage() {
                if (this.likes.length <= 0) {
                    return ""
                } else if (this.likes.length == 1) {
                    return "groupomaniac a aimé"
                } else {
                    return "groupomaniac ont aimés"
                }
            }
        },
        created() {
            axios.get('http://localhost:3000/api/post/' + this.id + '/like')
                .then(resp => {
                    this.likes = resp.data;
                })
        },
        methods: {
            deletePost() {
                axios.delete('http://localhost:3000/api/post/' + this.id)
                    .then(() => {
                        this.isDeleted = true;
                    })
            },
            toggleLike() {
                let myAccountId = sessionStorage.getItem('accountId');
                if (this.isLiked == false) {

                    axios.post('http://localhost:3000/api/post/' + this.id + '/like', {
                        accountId: myAccountId
                    })
                        .then(() => {
                            this.likes.push({ accountId: myAccountId, postId: this.id });
                        })

                } else {
                    axios.put('http://localhost:3000/api/post/' + this.id + '/like', {
                        accountId: myAccountId
                    })
                        .then(() => {
                            //je garde tout les likes qui ne sont pas les miens
                            this.likes = this.likes.filter(like => like.accountId != myAccountId);
                        })
                }
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
        /*text-align: justify;*/
        line-height: 1.5em;
    }

    sub {
        font-size: 0.9em;
        color: $text-sub-grey;
    }

    #top_part, h1, p, #bottom_part {
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
        width: 100%;
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

    #bottom_part {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 0.8rem;
        padding-bottom: 0.8em;
    }

        #bottom_part img {
            width: 1.5em;
        }

    #like_post a {
    }

    #like_post {
        width: 100%;
        display: flex;
        align-items: center;
        p

    {
        padding-bottom: 0;
        margin-left: 0.4em;
    }

    }

    #comment {
        display: flex;
        justify-content: flex-end;
        p

    {
        margin-left: 0.1em;
        align-self: center;
        padding-bottom: 0 !important;
        line-height: normal;
    }
    }
</style>