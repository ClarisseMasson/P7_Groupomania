<template>
    <div id="account_menu">
        <router-link :to="pathToMyProfile" id="account_profile">Mon compte</router-link>
        <a id="account_logout" v-on:click="logoutAccount"><img src="../assets/images/icon_logout.svg" alt="icone pour se déconnecter" id="home" />Déconnexion</a>

    </div>
</template>

<script>
    export default {
        name: 'AccountMenu',
        methods: {
            logoutAccount() {
                sessionStorage.clear();
                this.$router.push('/login');
            },
        },
        computed: {
            pathToMyProfile() {
                return "/profile/" + sessionStorage.getItem("accountId");
            }
        }
}
</script>

<style  lang="scss">

        @import "../assets/colors.scss";

        a {
            cursor: pointer;
        }

        #account_menu {
        background-color: $white;
        display: flex;
        flex-direction: column;
        border-radius: 0.2em;

        }

        #account_menu a {
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
        }

            #account_logout img {
                height: 1.2em;
                margin-right: 0.3em;
            }


/*
    +---------------------+
    | RESPONSIVE_Tablette |
    +---------------------+
*/

@media screen and (min-width: 767px) and (max-width : 1367px) {

    #account_menu a {
        padding: 0.55em 1.1em 0.55em 1.3em;
    }
}
/*
    +-----------------------+
    | RESPONSIVE_smartphone |
    +-----------------------+
*/

@media screen and (max-width: 767px) {

    #account_menu a {
        padding: 0.55em 1.1em 0.55em 1.3em;
    }

}
</style>
