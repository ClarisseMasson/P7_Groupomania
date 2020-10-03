<template>
    <div id="confirmation_container">
        <p>Etes-vous sûr de vouloir {{action}}?</p>
        <div id="buttons">
            <button id="yes" @click="$emit('yes')">Oui</button>
            <button id="no" @click="$emit('no')">Non</button>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ConfirmationPost',
        components: {

        },
        props: {
            action: {
                type: String,
                default: ""
            }
        }
    }
</script>

<style scoped lang="scss">

    @import "../assets/colors.scss";

    p {
        font-size: 1.1rem;
        font-family: 'Poppins', sans-serif;
        font-weight: normal;
        color: $dark-blue;
        margin-bottom: 0.7rem;
    }

    #confirmation_container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1em;
    }

    #buttons {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    button {
        border-radius: 0.5em;
        width: 48%;
        max-width: 15rem;
        padding: 0.5em 2em 0.5em 2em;
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        color: $white;
        text-align: center;
        border: 0;
        transition: 0.1s ease-in;
        &:hover {
            background-color: darken($pink, 4%);
            box-shadow: 1px 1px 3px 2px darken($pink,10%) inset;
            transform: scale(0.995);
        }
    }

    #yes {
        background-color: $pink;
    }

    #no {
        background-color: $medium-blue;
    }

</style>