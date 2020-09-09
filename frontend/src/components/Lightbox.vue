<template>
    <div id="lightbox">
        <div id="form">
            <button class="close" @click="$emit('close')">close</button>
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Lightbox',
        components: {
            
        }
    }
</script>

<style scoped lang="scss">

    /*J'importe ma palette de couleur définie dans sass*/
    @import "../assets/colors.scss";

    a {
        cursor: pointer;
    }

    #lightbox {
        /*ici on met vh pour lui dire que le pourcentage se fait par rapport au viewport et non par rapport à l'element parent*/
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba($dark-blue, 0.9);
    }

    #form {
        width: 50%;
        height: 20vh;
        background: $white;
    }
</style>