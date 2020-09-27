<template>
    <div class="post" v-if="!isDeleted">
        <section id="top_part">
            <router-link :to="pathToProfile" id="author" tabindex="0" >
                <img src="../assets/images/photo_profile.jpg" alt="photo profil" id="photo_profile" />
                <div id="author_description">
                    <p>{{name}} {{firstname}}</p>
                    <sub>{{moment}}</sub>
                </div>
            </router-link>
            <div id="edit_post">
                <button id="modify_post" v-if="showModify" @click="showModal = true" @keyup.enter="showModal = true">
                    <img src="../assets/images/icon_modify.svg" alt="icon pour modifier son post" id="modify_post" />
                </button>
                <Lightbox boxTitle="Modifier mon POST" v-if="showModal" @close="showModal = false">
                   <CreatePost :post="postForUpdate"></CreatePost>            
                </Lightbox>
                <button id="delete_post" v-if="showDelete" v-on:click="deletePost" @keyup.enter="showModal = true">
                    <img src="../assets/images/icon_delete.svg" alt="icon pour supprimer son post" id="delete_post" />
                </button>
            </div>
        </section>
        <h1>{{title}}</h1>
        <p>{{description}}</p>
        <img :src="fileUrl" v-if="showImage" />
        <video controls v-if="showVideo"><source :src="fileUrl" :type="fileType" /></video>
        <slot>
            <section id="bottom_part">      
                <button href="#" id="like_post" v-on:click="toggleLike()">
                    <img src="../assets/images/icon_like.svg" alt="liker le post" v-if="!isLiked" />
                    <img src="../assets/images/icon_liked.svg" alt="le post est liké" v-if="isLiked" />
                    <p>{{likes.length}}</p><span>{{likeMessage}}</span>
                </button>
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
            //chemin vers le profil de l'auteur du post
            //si pas d'auteur renvoie rien
            pathToProfile() {
                if (this.author) {
                    return "/profile/" + this.author.id;
                }
                else {
                    return "";
                }
            },
            //chemin vers une page commentaire selon l'id du post
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
            //on vérifie si il y a un auteur et qu'il y a nom d'auteur on met le nom de l'auteur du post
            //sinon on envoie le message Ancien employé
            name() {
                if (this.author && this.author.name) {
                    return this.author.name;
                }
                else {
                    return 'Ancien employé';
                }
            },
            //On vérifie si il y a un auteur et qu'il y a prénom d'auteur on met le prénom de l'auteur du post
            //sinon on envoie rien
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
            //si c'est liké par l'utilisateur on montre un coeur rouge
            // si il n'y a pas de like de l'utilisateur ou qu'il re-like on montre un coeur gris
            isLiked() {
                let mylikes = this.likes.filter(like => like.accountId == sessionStorage.getItem("accountId"))
                if (mylikes.length >= 1) {
                    return true;
                }
                else {
                    return false;
                }
            },
            //message selon le nombre de likes
            likeMessage() {
                if (this.likes.length <= 0) {
                    return ""
                } else if (this.likes.length == 1) {
                    return "groupomaniac a aimé"
                } else {
                    return "groupomaniacs ont aimés"
                }
            }
        },
        //on récupère les likes au chargement du post
        created() {
            axios.get('http://192.168.0.29:3000/api/post/' + this.id + '/like', this.getHeader()
)
                .then(resp => {
                    this.likes = resp.data;
                })
        },
        methods: {
            deletePost() {
                axios.delete('http://192.168.0.29:3000/api/post/' + this.id, this.getHeader())
                    .then(() => {
                        this.isDeleted = true;
                    })
            },
            //déclenche au click le isLiked
            //renvoie un like dans la liste des likes récupéré par le serveur avec mon accountId selon le post liké si on a pas déjà liké ce post
            //enlève un like avec mon accoundId selon le post si il a déjà été liké par moi
            toggleLike() {
                let myAccountId = sessionStorage.getItem('accountId');
                if (this.isLiked == false) {

                    axios.post('http://192.168.0.29:3000/api/post/' + this.id + '/like',  {
                        accountId: myAccountId
                    }, this.getHeader())
                        .then(() => {
                            this.likes.push({ accountId: myAccountId, postId: this.id });
                        })

                } else {
                    axios.put('http://192.168.0.29:3000/api/post/' + this.id + '/like', {
                        accountId: myAccountId
                    }, this.getHeader())
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

    button, a {
        &:hover

    {
        filter: brightness(0.60);
    }

    }

    h1 {
        font-size: 1.8em;
        color: $dark-blue;
    }

    p, span {
        font-size: 1rem;
        color: $text-grey;
        line-height: 1.5em;
    }

    sub {
        font-size: 0.9em;
        color: $text-grey;
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

    #bottom_part {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 0.8rem;
        padding-bottom: 0.8em;
        img {
            width: 1.5rem;
        }
    }

    #like_post {
        display: flex;
        flex-wrap: nowrap;
        flex-grow: 4;
        align-items: center;

        p
        {
        text-align: left;
        padding-bottom: 0;
        }
        button {
            display: block;
            width: 100%;
        }
    }

    #comment {
        display: flex;
        justify-content: flex-end;

        p{
        margin-left: 0.1em;
        align-self: center;
        padding-bottom: 0 !important;
        line-height: normal;
        }
    }

@media screen and (max-width: 767px) {

    #like_post span {
        display: none;
    }
}
</style>