<template>
    <div id="sticky">
        <Lightbox v-if="showModal" @close="showModal = false"><CreatePost></CreatePost></Lightbox>
        <div id="parent" :class="{ 'hidden-navbar': !showNavbar }">
            <menu id="navbar" ref="container">
                <img src="../assets/images/icon_logo.svg" alt="logo Groupomania" id="logo" />
                <img src="../assets/images/icon_groupomania_white.svg" alt="icone groupomania" id="logo_responsive" />
                <div id="menu">
                    <router-link to="/home"><img src="../assets/images/icon_home.svg" alt="icone pour aller à la page d'accueil" id="home" /></router-link>
                    <button v-popover:profile><img src="../assets/images/icon_profile.svg" alt="lien pour ses favoris" id="profile" /></button>
                    <button id="creation" @click="showModal = true" tabindex="0" @keyup.enter="showModal = true"><img src="../assets/images/icon_plus.svg" alt="lien pour créer un post" id="plus" />Créer!</button>
                </div>
            </menu>
            <popover name="profile">
                <AccountMenu />
            </popover>
        </div>
    </div>
</template>

<script>
    import Lightbox from './Lightbox.vue'
    import AccountMenu from './AccountMenu.vue'
    import CreatePost from './CreatePost.vue'

    // Scrollbar qui apparait au scroll-up tiré du code-pen https://medium.com/@Taha_Shashtari/hide-navbar-on-scroll-down-in-vue-fb85acbdddfe
    //ci-dessous quantité de pixels que je dois scroll up pour faire apparaitre la navbar
    const OFFSET = 60


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
                showNavbar: true,
                lastScrollPosition: 0,
                scrollValue: 0
            }
        },
        //au chargement...
        mounted() {
            //je définie la dernière position de scroll à la valeur de scroll actuelle
            this.lastScrollPosition = window.pageYOffset
            //on écoute l'évenement scroll
            window.addEventListener('scroll', this.onScroll)
        },
        //si je supprime le composant on arrête d'écouter l'événement scroll
        beforeDestroy() {
            window.removeEventListener('scroll', this.onScroll)
        },
        methods: {
            onScroll() {
                //pageYoffset doit être supérieur ou égale à 0, en cas de bug on arrête le calcul
                if (window.pageYOffset < 0) {
                    return
                }
                //on regarde si on a scrollé plus que le offset défini quelque soit le sens du scroll
                //si on a pas assez scrollé vers le haut la navbar ne s'affiche pas
                if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
                    return
                }
                //on montre la navbar si notre position sur la page est plus haute que la valeur référence enregistré
                //puis on met à jour la valeur référente
                this.showNavbar = window.pageYOffset < this.lastScrollPosition
                this.lastScrollPosition = window.pageYOffset
            }
        }
    }
</script>

<style scoped lang="scss">

    /*J'importe ma palette de couleur définie dans sass*/
    @import "../assets/colors.scss";

    #sticky {
        position: sticky;
        top: 0;
    }

    #parent {
        position: sticky;
        top: 0;
        width: 100%;
        transform: translate3d(0, 0, 0);
        transition: 0.1s all ease-out;
    }

    [data-popover='profile'] {
        position: sticky;
        height: 0;
        top: 0;
        padding: 0;
    }

    .vue-popover.dropdown-position-bottom:before {
        border-bottom-color: $pink;

    }

    #profile {
        cursor: pointer;
    }

    #navbar {
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
            
    #parent.hidden-navbar {
      box-shadow: none;
      transform: translate3d(0, -100%, 0);
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

    button {
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