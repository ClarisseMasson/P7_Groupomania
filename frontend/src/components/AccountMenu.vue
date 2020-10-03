<template>
    <div id="account_menu">
        <router-link :to="pathToMyProfile" id="account_profile">Mon compte</router-link>
        <button id="account_logout" v-on:click="logoutAccount" @keyup.enter="logoutAccount"><img src="../assets/images/icon_logout.svg" alt="icone pour se déconnecter" id="home" />Déconnexion</button>
    </div>
</template>

<script>
    export default {
        name: 'AccountMenu',
        methods: {
            //je me déconnecte en supprimant les données dans sessionStorage et je suis renvoyé vers la page login
            logoutAccount() {
                sessionStorage.clear();
                this.$router.push('/login');
            },
        },
        computed: {
            //chemin vers profile avec mon id correspondant
            pathToMyProfile() {
                return "/profile/" + sessionStorage.getItem("accountId");
            }
        }
}
</script>

<style  lang="scss">

        @import "../assets/colors.scss";

        #account_menu {
        top: 0;
        background-color: $white;
        display: flex;
        flex-direction: column;
        border-radius: 0.2em;
        }

        #account_menu a, #account_menu button {
        font-size: 1em;
        font-family: 'Poppins', sans-serif;
        text-decoration: none;
        }

        #account_profile {
        background-color: $pink;
        padding: 0.2em 1.1em 0.2em 1.3em;
        color: $white;
        text-align: center;
        }

        #account_logout {
            display: flex;
            padding: 0.2em 1em 0.2em 1em;
            justify-content: center;
            align-items: center;
            color: $text-grey;
            img {
                height: 1.2em;
                margin-right: 0.3em;
            }
        }

/*
    +--------------------------------+
    | RESPONSIVE_Tablette_Smartphone |
    +--------------------------------+
*/

@media screen and (max-width : 1367px) {

    #account_menu a, #account_menu button {
        padding: 0.4em 1.1em 0.4em 1.3em;
    }
}
</style>
