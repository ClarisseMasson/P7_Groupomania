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
                <button id="delete_post" v-if="showDelete" v-on:click="showModalDelete = true">
                    <img src="../assets/images/icon_delete.svg" alt="icon pour supprimer son post" id="delete_post" />
                </button>
                <Lightbox v-if="showModalDelete"
                          @close="showModalDelete = false"
                          boxTitle="Supprimer ce commentaire">
                    <ConfirmationForm action="supprimer ce commentaire"
                                      @no="showModalDelete = false"
                                      @yes="deleteComment">
                    </ConfirmationForm>
                </Lightbox>
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
    import ConfirmationForm from '@/components/ConfirmationForm.vue'
    import Lightbox from '@/components/Lightbox.vue'



    export default {
        name: 'Comment',
        components: {
            ConfirmationForm,
            Lightbox
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
                isDeleted: false,
                showModalDelete: false
            };
        },
        computed: {
            //chemin vers la page profil de l'auteur du commentaire
            //si pas d'auteur ne retourne vers rien
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
                //si l'auteur n'a plus de compte alors on renvoie ce message à la place de son nom
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
            // on met en forme la date de mise à jour du post avec la dépendance Moment
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

    button:hover, a:hover {
        filter: brightness(0.60);
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
        color: $text-grey;
    }

    .comment {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        padding-bottom: 1em;

    }


    #top_part {
        display: flex;
        width: 100%;
        padding-left: 2%;
        padding-right: 2%;
        padding-bottom: 0.5rem;
        justify-content: space-between;
        align-items: flex-start;
        padding-top: 1.5em;
            p {
            font-weight: bold;
        }
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
        
    button {
        width: 1.5rem;
        margin-left: 0.7em;
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