<template>
    <div id="page">
        <!--ici notre barre de navigation pour toutes les pages lorsque nous sommes connect�s-->
        <Navbar></Navbar>
        <!--ici le contenu dynamique des pages lorsque nous sommes connect�s-->
        <div id="container_page">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue'

    export default {
        name: 'ConnectedPage',
        components: {
            Navbar
        },
        // Avant d'afficher la page v�rifier si on est connect� et si on ne l'est pas on est renvoy� vers login
        beforeCreate() {
            if (sessionStorage.getItem("accountId") === null || sessionStorage.getItem("token") === null ) {
                this.$router.push("/login");
            }
        },
    }
</script>

<style scoped lang="scss">

    /*J'importe ma palette de couleur d�finie dans sass*/
    @import "../assets/colors.scss";

    a {
        cursor: pointer;
    }

    #page {
        /*ici on met vh pour lui dire que le pourcentage se fait par rapport au viewport et non par rapport � l'element parent*/
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: $background-grey;

    }

    #container_page {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

</style>