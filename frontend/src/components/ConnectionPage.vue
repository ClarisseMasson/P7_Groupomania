<template>
    <div id="page">
        <div id="fond_bleu">
            <img src="../assets/images/icon_groupomania_white.svg" alt="icone groupomania" id="icon_groupomania" />
            <!--ici le contenu dynamique de l'inscription ou de la connection avec slot-->
            <slot></slot>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'ConnectionPage',
        components: {

        }
    }
</script>

<style lang="scss">

    /*J'importe ma palette de couleur définie dans sass*/
    @import "../assets/colors.scss";


    #page {
        /*ici on met vh pour lui dire que le pourcentage se fait par rapport au viewport et non par rapport à l'element parent*/
        min-height: 100vh;
        background-image: url(../assets/images/photo_fond.jpg);
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    #fond_bleu {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width : 50%;
        background-color: $dark-blue;
    }

    #icon_groupomania{
        width: 3em;
        align-self: flex-end;
        margin: 2em 4em 2em 0em;
    }
</style>