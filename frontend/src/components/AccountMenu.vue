<template>
    <div id="account_menu">
        <router-link :to="pathToMyProfile" id="account_profile">Mon compte</router-link>
        <a id="account_logout" v-on:click="logoutAccount"><img src="../assets/images/icon_logout.svg" alt="icone pour se déconnecter" id="home" />Déconnexion</a>

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
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


        .tooltip {
            &.popover {
                margin-left: 4px;

            .popover-inner {
                background: white;
                color: black;
                padding: 0;
                border-radius: 0.2em;
                box-shadow: 0em 0em 0.4em 0.1em rgba($medium-blue, 0.2);
            }

        }
        }

        .popover-arrow, .tooltip-arrow {
            width: 0;
            height: 0;
            border-style: solid;
            position: absolute;
            margin: 12px;
            z-index: 1;
            border-color: $pink;
            border-width: 0 8px 8px 8px;
            border-left-color: transparent !important;
            border-right-color: transparent !important;
            border-top-color: transparent !important;
            top: -7px;
            left: calc(50% - 7px);
            margin-top: 0;
            margin-bottom: 0;
        }
</style>
