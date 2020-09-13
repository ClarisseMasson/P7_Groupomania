<template>
    <div id="lightbox">
        <div id="container_lightbox">
            <section id="top_title">
                <h1>
                    {{boxTitle}}
                </h1>
                <img src="../assets/images/icon_delete.svg" alt="sortir de créer" @click="$emit('close')" id="exit" />
            </section>
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Lightbox',
        components: {
        },
        props: {
            boxTitle: {
                type: String,
            default: "Créer mon POST" }
        }
    }
</script>

<style scoped lang="scss">

    /*J'importe ma palette de couleur définie dans sass*/
    @import "../assets/colors.scss";

    a, #exit {
        cursor: pointer;
        &:hover

    {
        filter: brightness(0.60);
    }
    }


    h1 {
        width: 90%;
        font-family: 'Fjalla One', sans-serif;
        font-size: 1.8rem;
        padding-left: 1.5rem;
        color: $medium-blue;
        letter-spacing: 0.1rem;
        text-align: center;
        flex-grow: 100;

    }

    #exit {
        width: 1.5rem;
        justify-self: self-end; 
    }

    #top_title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4% 6% 4% 6%;
        border-bottom: 0.1em solid $text-light-grey;
    }

    #lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba($dark-blue, 0.9);
        z-index: 10;
    }

    #container_lightbox {
        width: 23%;
        background-color: $white;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }

</style>