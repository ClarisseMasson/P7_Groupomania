<template>
    <div id="account_menu">
        <router-link to="/profile" id="account_profile">Mon compte</router-link>
        <router-link to="/home" id="account_logout"><img src="../assets/images/icon_logout.svg" alt="icone pour se déconnecter" id="home" />Déconnexion</router-link>

    </div>
</template>

<script>
export default {
  name: 'HelloWorld'

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">

    @import "../assets/colors.scss";
#account_menu {
    background-color: $white;
    display: flex;
    flex-direction: column;
    border-radius: 0.2em;

}

#account_menu a {
    font-size: 1em;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
}

#account_profile {
    background-color: $pink;
    padding: 0.2em 1.1em 0.2em 1.3em;
    color: $white;
    text-align: center;
}

    #account_logout {
        display: flex;
        padding: 0.2em 1em 0.2em 1em;
        justify-content: center;
        align-items: center;
        color: $text-grey;
    }

        #account_logout img {
            height: 1.2em;
            margin-right: 0.3em;
        }


.tooltip {
  &.popover {
     margin-left: 4px;
    $color: #f9f9f9;

    .popover-inner {
      background: white;
      color: black;
      padding: 0;
      border-radius: 0.2em;
    box-shadow: 0em 0em 0.4em 0.1em rgba($medium-blue, 0.2);
    }

  }
}

    .popover-arrow, .tooltip-arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 12px;
        z-index: 1;
        border-color: $pink;
        border-width: 0 8px 8px 8px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -7px;
        left: calc(50% - 7px);
        margin-top: 0;
        margin-bottom: 0;
    }
</style>
