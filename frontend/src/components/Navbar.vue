<template>
    <menu id="navbar" ref="container">
        <img src="../assets/images/icon_logo.svg" alt="logo Groupomania" id="logo" />
        <div id="menu">
            <router-link to="/home"><img src="../assets/images/icon_home.svg" alt="icone pour aller à la page d'accueil" id="home" /></router-link>
            <router-link to="/favorite"><img src="../assets/images/icon_favorite.svg" alt="icone pour accéder à ses favoris" id="favorite" /></router-link>
            <v-popover   offset="15">
                <img src="../assets/images/icon_profile.svg" alt="lien pour ses favoris" id="profile" />
                <AccountMenu slot="popover"/>
            </v-popover>
            <a id="creation" @click="showModal = true"><img src="../assets/images/icon_plus.svg" alt="lien pour créer un post" id="plus" />Créer!</a>
            <Lightbox v-if="showModal" @close="showModal = false"></Lightbox>
        </div>
 
    </menu>
</template>

<script>
    import Vue from 'vue'
    import Lightbox from './Lightbox.vue'
    import AccountMenu from './AccountMenu.vue'



    export default {
        name: 'Navbar',
        components: {
            Lightbox,
            AccountMenu
          
        },
        data() {
            return {
                showModal: false,
            }        
        },
        methods: {
            showCreateForm() {
            var ComponentClass = Vue.extend(Lightbox)
            var instance = new ComponentClass()
            instance.$mount() // pass nothing
            this.$refs.container.appendChild(instance.$el)
            }
        }
    }
</script>

<style scoped lang="scss">

    /*J'importe ma palette de couleur définie dans sass*/
    @import "../assets/colors.scss";

    a {
        cursor: pointer;
    }

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
        height : 1.7rem;
        margin-left: 0.5em;
        align-self:center;
    }

    #plus {
        margin-right: 0.2em;
    }
        
    #creation {
        margin-left: 0.22em;
        display:flex;
        flex-direction: row;
    }

    a {
        text-decoration: none;
        font-size: 1.5em;
        font-family: 'Fjalla One', sans-serif;
        letter-spacing:0.02em;
        color: $white;
    }
</style>