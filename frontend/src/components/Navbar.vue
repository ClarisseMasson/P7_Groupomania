<template>
    <div id="navbar">
        <img src="../assets/images/icon_logo.svg" alt="logo Groupomania" id="logo" />
        <div id="menu">
            <router-link to="/home"><img src="../assets/images/icon_home.svg" alt="icone pour aller à la page d'accueil" id="home" /></router-link>
            <router-link to="/favorite"><img src="../assets/images/icon_favorite.svg" alt="icone pour accéder à ses favoris" id="favorite" /></router-link>
            <router-link to="/profile"><img src="../assets/images/icon_profile.svg" alt="lien pour ses favoris" id="profile" /></router-link>
            <router-link to="/home/create" id="creation"><img src="../assets/images/icon_plus.svg" alt="lien pour créer un post" id="plus" />Créer!</router-link>
        </div>
</div>
</template>

<script>

    export default {
        name: 'Navbar',
        components: {

        }
    }
</script>

<style lang="scss">

    /*J'importe ma palette de couleur définie dans sass*/
    @import "../assets/colors.scss";

    #navbar {
        /*ici on met vh pour lui dire que le pourcentage se fait par rapport au viewport et non par rapport à l'element parent*/
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items:center;
        background-color: $dark-blue;
        padding-right:3em;
        padding-left:3em;
        padding-top: 0.7em;
        padding-bottom: 0.7em;

    }

    #logo {
        height:2em;
    }

    #menu {
        display:flex;
        flex-direction: row;
        align-items: center;
    }

    #menu img{
        display: block;
        height : 1.5em;
        margin-left: 0.7em;
        align-self:center;
    }

    #plus {
        margin-right: 0.2em;
    }
        
    #creation {
        display:flex;
        flex-direction: row;
    }

    a {
        text-decoration: none;
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        font-weight: lighter;
        color: $white;
    }


</style>