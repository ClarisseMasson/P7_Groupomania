<template>
    <ConnectedPage>
        <article id="page_profile">
            <section id="top_part">
                <router-link to="/home" id="return_home"><img src="../assets/images/icon_return.svg" alt="retour à la page Home" /></router-link>
                <h1><span v-if="isMyAccount()">Mon </span>profil</h1>
            </section>
            <div id="container_profile">
                <img src="../assets/images/profile_fond.jpg" alt="image de fond" />
                <div id="nom_prenom_poste">
                    <h2 v-if="!isModifying">
                        {{account.firstname}}
                        <span>{{account.name}}</span>
                    </h2>
                    <h2 v-if="isModifying">
                        <input v-model="accountUpdate.firstname" />
                        <input v-model="accountUpdate.name" />
                    </h2>

                    <h3 v-if="!isModifying">{{account.job}}</h3>
                    <h3 v-if="isModifying">
                        Job : <input v-model="accountUpdate.job" />
                    </h3>
                </div>
                <address>
                    <div class="address-composent">
                        <h4>Email :</h4>
                        <p v-if="!isModifying">{{account.email}}</p>
                        <input v-if="isModifying" v-model="accountUpdate.email" />
                    </div>
                    <div class="address-composent">
                        <h4>Telephone :</h4>
                        <p v-if="!isModifying">{{account.phone}}</p>
                        <input v-if="isModifying" v-model="accountUpdate.phone" />
                    </div>
                </address>
                <button v-if="showDelete" v-on:click="deleteProfile">Supprimer mon compte</button>
            </div>
            <div id="profile">
                <div id="edit_profile">
                    <div>
                        <button v-if="isModifying" v-on:click="updateProfile">Sauvegarder</button>
                    </div>
                    <div v-if="isMyAccount()">
                        <a id="modify_profile" v-on:click="toggleFormProfile">
                            <img src="../assets/images/icon_modify_white.svg" alt="modifier son profil" />
                        </a>
                        <a id="logout_profile" v-on:click="logoutProfile">
                            <img src="../assets/images/icon_logout_white.svg" alt="supprimer son profil" />
                        </a>
                    </div>
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
                account: {},
                accountUpdate: {},
                isModifying: false
            };
        },

        mounted() {
            const accountId = this.$route.params.accountid;
            axios
                .get('http://localhost:3000/api/account/profile/' + accountId)
                .then(response => (this.account = response.data))
        },
        computed: {
            showDelete() {
                return (this.isMyAccount() || sessionStorage.getItem("isAdmin") == "true") && !this.isModifying;
            }
        },
        methods: {
            deleteProfile() {
                axios.delete('http://localhost:3000/api/account/profile/' + this.account.id)
                    .then(() => {
                        this.returnToLogin();
                    })
            },
            toggleFormProfile() {

                this.isModifying = !this.isModifying;
                this.accountUpdate.id = this.account.id;
                this.accountUpdate.firstname = this.account.firstname;
                this.accountUpdate.name = this.account.name;
                this.accountUpdate.job = this.account.job;
                this.accountUpdate.email = this.account.email;
                this.accountUpdate.phone = this.account.phone;

            },
            updateProfile() {
                if (this.updateFormIsValid()) {
                    axios.put('http://localhost:3000/api/account/profile/' + this.account.id, this.accountUpdate)
                        .then(() => {
                            this.isModifying = false;
                            this.$router.go();
                        })
                }
                else {
                    window.alert("Le formulaire n'est pas valide");
                }
            },
            logoutProfile() {
                this.returnToLogin();
            },
            returnToLogin() {
                sessionStorage.clear();
                this.$router.push('/login');
            },
            updateFormIsValid() {
                const regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
                return regex.test(this.accountUpdate.email)
                    && this.accountUpdate.name.length > 1
                    && this.accountUpdate.firstname.length > 1;
            },
            isMyAccount() {
                return this.account.id == sessionStorage.getItem("accountId");
            }
        }
    }
</script>

<style scoped lang="scss">

    @import "../assets/colors.scss";

    input {
        max-width: 30%;
        border: none;
        border: 0.1rem solid $text-light-grey;
        border-radius: 0.4rem;
        padding: 1%;
        background-color: $white;

    }

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
        line-height: 1.2em;

        span {
            text-transform: uppercase;         
        }

        input {
            font-family: 'Fjalla One', sans-serif;
            font-size: 1em;
            color: $dark-blue;
            letter-spacing: 0.1em;
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
        min-height: 3em;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        img {
            width: 1.5em;
            margin-left: 0.7em;
        }

        div {
            display: 50%;
        }

        a {
            cursor: pointer;
        }

        button {
        cursor: pointer;
        width: auto;
        font-size: 1em;
        align-self: flex-start;
        background-color: transparent;
        border: 0.15em solid $white;
        color: $white;
        margin-bottom: 0;
        transition: 0.1s ease-in;
        opacity: 0.8;
        &:hover

    {
        opacity: 1;
    }
        }
    }

    #photo_profile {
        width: 35%;
        border-radius: 50%;
        border: 0.5em solid $white;
        margin-top: 3em;
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