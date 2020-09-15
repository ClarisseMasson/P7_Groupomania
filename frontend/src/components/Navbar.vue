<template>
    <menu id="navbar" ref="container">
        <img src="../assets/images/icon_logo.svg" alt="logo Groupomania" id="logo" />
        <img src="../assets/images/icon_groupomania_white.svg" alt="icone groupomania" id="logo_responsive" />
        <div id="menu">
            <router-link to="/home"><img src="../assets/images/icon_home.svg" alt="icone pour aller à la page d'accueil" id="home" /></router-link>

            <a v-popover:profile tabindex="0"><img src="../assets/images/icon_profile.svg" alt="lien pour ses favoris" id="profile" /></a>
            <popover name="profile">
                <AccountMenu />
            </popover>

            <a id="creation" @click="showModal = true" tabindex="0" @keyup.enter="showModal = true"><img src="../assets/images/icon_plus.svg" alt="lien pour créer un post" id="plus"  />Créer!</a>
            <Lightbox v-if="showModal" @close="showModal = false"><CreatePost></CreatePost></Lightbox>
            <tooltip />
        </div>
 
    </menu>
</template>

<script>
    import Vue from 'vue'
    import Lightbox from './Lightbox.vue'
    import AccountMenu from './AccountMenu.vue'
    import CreatePost from './CreatePost.vue'



    export default {
        name: 'Navbar',
        components: {
            Lightbox,
            AccountMenu,
            CreatePost
          
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

    [data-popover='profile'] {
        padding: 0;
        margin-top: 0.4em;
    }

    .vue-popover.dropdown-position-bottom:before {
        border-bottom-color: $pink;

    }

    #profile {
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

    #logo_responsive {
        display: none;
    }

    #menu {
        display:flex;
        flex-direction: row;
        align-items: center;
    }

    #menu img{
        display: block;
        height : 1.7rem;
        margin-left: 0.2em;
        margin-right: 0.2em;
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
        cursor: pointer;
        text-decoration: none;
        font-size: 1.5em;
        font-family: 'Fjalla One', sans-serif;
        letter-spacing:0.02em;
        color: $white;
    }

    /*
    +---------------------+
    | RESPONSIVE_Tablette |
    +---------------------+
*/

@media screen and (min-width: 767px) and (max-width : 1367px) {

   #navbar {
        padding-right:1em;
        padding-left:1em;
    }

 }

/*
    +-----------------------+
    | RESPONSIVE_smartphone |
    +-----------------------+
*/

    @media screen and (max-width: 767px) {

        #navbar {
            padding-right: 1em;
            padding-left: 1em;
        }

        #logo {
            display: none;
        }

        #logo_responsive {
            display: block;
            height: 2em;
        }
    }
</style>