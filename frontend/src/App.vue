<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

    /*J'importe ma palette de couleur définie dans sass*/
    @import "./assets/colors.scss";

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

#app {
    width: 100%;
    min-height: 100vh;
}

/*Je redifinie ici mes boutons et mes inputs pour tous mes documents*/
button {
    display: block;
    cursor: pointer;
    border: 0;
    background : none;
    text-decoration: none;
    &:focus {
        /*outline: none;*/                    
            }
}

a {
    text-decoration: none;
    cursor: pointer;
    border: none;
}

    input {
        border: 0;
        outline-style: none;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    }

    /* je redéfinie la couleur de mes placeholder pour chrome, opéra et safari */
    ::-webkit-input-placeholder {
        color: $text-light-grey;
    }
/* je redéfinie la couleur de mes placeholder pour modzilla */
    ::-moz-placeholder {
        color: $text-light-grey;
    }

</style>
