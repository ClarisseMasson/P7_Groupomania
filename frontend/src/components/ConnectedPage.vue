<template>
    <div id="page">
        <!--ici notre barre de navigation pour toutes les pages lorsque nous sommes connectés-->
        <Navbar></Navbar>
        <!--ici le contenu dynamique des pages lorsque nous sommes connectés-->
        <slot></slot>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue'
    //on importe Axios pour l'utiliser
    //const axios = require('axios');

    export default {
        name: 'ConnectedPage',
        components: {
            Navbar
        }
    }
</script>

<style lang="scss">

    /*J'importe ma palette de couleur définie dans sass*/
    @import "../assets/colors.scss";


    #page {
        /*ici on met vh pour lui dire que le pourcentage se fait par rapport au viewport et non par rapport à l'element parent*/
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

</style>