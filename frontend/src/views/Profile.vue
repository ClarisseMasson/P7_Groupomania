<template>
    <ConnectedPage>
        <article id="page_profile">
            <section id="top_part">
                <router-link to="/home" id="return_home"><img src="../assets/images/icon_return.svg" alt="retour à la page Home" /></router-link>
                <h1>Mon profil</h1>
            </section>
            <div id="container_profile">
                <img src="../assets/images/profile_fond.jpg" alt="image de fond" />
                <div id="nom_prenom_poste">
                    <h2>{{account.firstname}} <span>{{account.name}}</span></h2>
                    <h3>{{account.job}}</h3>
                </div>
                <address>
                    <div class="address-composent">
                        <h4>Email :</h4>
                        <p>{{account.email}}</p>
                    </div>
                    <div class="address-composent">
                        <h4>Telephone :</h4>
                        <p>{{account.phone}}</p>
                    </div>
                </address>
                <button>Supprimer mon compte</button>
            </div>
            <div id="profile">
                <div id="edit_profile">
                    <!--<ça ne marche pas>-->
                    <a id="modify_profile" v-on:click="modifyProfile">
                        <img src="../assets/images/icon_modify_white.svg" alt="modifier son profil" />
                    </a>
                    <a id="modify_profile" v-on:click="deleteProfile">
                        <img src="../assets/images/icon_logout_white.svg" alt="supprimer son profil" />
                    </a>
                </div>
                <img src="../assets/images/photo_profile.jpg" alt="photo de profil" id="photo_profile"/>
            </div>
        </article>
    </ConnectedPage>
</template>

<script>
    // @ is an alias to /src
    import ConnectedPage from '@/components/ConnectedPage.vue'
    const axios = require('axios');

    export default {
        name: 'Profile',
        components: {
            ConnectedPage
        },
        data() {
            return {
                account: null,
                isDeleted: false,
                isModified: false
            };
        },
        props: {
            id: {type: Number}
        },
        mounted() {
            const accountId = sessionStorage.getItem('accountId');
            axios
                .get('http://localhost:3000/api/account/profile/' + accountId)
                .then(response => (this.account = response.data))
        },
        computed: {

            showDelete() {
                return this.account.id == sessionStorage.getItem("accountId") || sessionStorage.getItem("isAdmin") == "true";
            },
            showModify() {
                return this.account.id == sessionStorage.getItem("accountId");
            },
            showLogout() {
                return this.account.id == sessionStorage.getItem("accountId");
            }
        },
        methods: {
            deleteProfile() {
                axios.delete('http://localhost:3000/api/account/' + this.id)
                    .then(() => {
                        this.isDeleted = true;
                    })
            },
            modifyProfile() {
                axios.put('http://localhost:3000/api/account/' + this.id)
                    .then(() => {
                        this.isModified = true;
                    })
            }
        }
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

    h2 {
        font-family: 'Fjalla One', sans-serif;
        font-size: 2.4em;
        color: $dark-blue;
        letter-spacing: 0.1em;
        line-height: 1em;

        span {
            text-transform: uppercase;         
        }
    }

    h3 {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1em;
        color: $text-grey;
        font-weight: normal;
    }

    h4 {
        font-family: 'Fjalla One', sans-serif;
        font-size: 1em;
        color: $dark-blue;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        line-height: 1.4em;
    }

    p {
        font-family: 'Poppins', sans-serif;
        font-size: 1em;
        color: $text-grey;
    }


    #page_profile {
        position: relative;
        width: 32%;
    }

    #top_part {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 3.2em;
        margin-bottom: 2.5em;

        img{
            height: 1.8em;
            margin-right: 12.5em;
        }
    }

    #container_profile {
        position: absolute;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        background-color: $white;
        border-radius: 0.2em;
        box-shadow: 0em 0em 0.4em 0.1em rgba($medium-blue, 0.2);

        img {
            width: 100%;
            border-top-left-radius: 0.2em;
            border-top-right-radius: 0.2em;
        }

    }

    #profile {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2%;
    }

    #edit_profile {
        width: 100%;
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
        width: 35%;
        border-radius: 50%;
        border: 0.5em solid $white;
        margin-top: 4em;
    }

    #nom_prenom_poste {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 4em;
        padding-bottom: 2em;
        border-bottom: .1em solid $text-light-grey;
    }

    address {
        width: 100%;
        font-style: normal;
        padding-top: 1em;
        padding-bottom: 1em;

        .address-composent{
            width: 100%;
            padding: 0.5em 1.5em 0.5em 1.5em;
        }
    }

    button {
        outline-style: none;
        border: 0;
        width: 47%;
        border-radius: 0.5em;
        padding: 0.5em 2em 0.5em 2em;
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        color: $white;
        text-align: center;
        background-color: $pink;
        transition: 0.1s ease-in;
        margin-bottom: 1.5em;
        &:hover

    {
        background-color: darken($pink, 4%);
        box-shadow: 1px 1px 3px 2px darken($pink,10%) inset;
        transform: scale(0.995);
    }
    }


</style>