<template>
    <div id="page">
        <div id="fond_bleu">
            <img src="../assets/images/icon_groupomania_white.svg" alt="icone groupomania" id="icon_groupomania" />
            <div id="connection_content">
                <h1>Nous sommes tous<br /><strong>Groupomania</strong></h1>
                <p>
                    {{introductionMessage}}
                </p>
                <!--ici le contenu dynamique de l'inscription ou de la connection avec slot-->
                <slot></slot>
                <span>
                    {{problemMessage}}
                    <a :href="adresseContact">{{contactMessage}}</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ConnectionPage',
        components: {

        },
        props: {
            introductionMessage: { type: String },
            problemMessage: { type: String },
            contactMessage: { type: String },
            adresseContact: { type: String }
        }
    }
</script>

<style scoped lang="scss">

    /*J'importe ma palette de couleur d�finie dans sass*/
    @import "../assets/colors.scss";

    a:link 
    { 
     text-decoration:none; 
    } 
    
    #page {
        /*ici on met vh pour lui dire que le pourcentage se fait par rapport au viewport et non par rapport � l'element parent*/
        min-height: 100vh;
        background-image: url(../assets/images/photo_fond.jpg);
        background-attachment: fixed;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    #fond_bleu {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        width: 50%;
        background-color: $dark-blue;
    }

    #icon_groupomania{
        width: 3em;
        align-self: flex-end;
        margin: 1.5em 4em 1.5em 0em;
    }

    h1 {
        font-size: 3.8em;
        font-family: 'Fjalla One', sans-serif;
        font-weight: 500;
        letter-spacing: 0.03em;
        line-height:1.1em;
        color: $text-light-grey;
        margin-bottom: 0.4em;
        strong {
            font-weight: 500;
            color: $white;
       }
    }


    p, span, span a, #message_error, #error_mail {
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        font-style: italic;
        color: $text-light-grey;
    }

    p{
        width:75%;
        margin-bottom: 1em;
    }

    span a:hover{
        color: $white;
    }

    #connection_content {
    width: 70%;
    }

    
/*
    +---------------------+
    | RESPONSIVE_Tablette |
    +---------------------+
*/

@media screen and (min-width: 767px) and (max-width : 1367px) {

    #fond_bleu {
        width: 80%;
    }
    
    span {
        display: block;
        margin-bottom :1.5em;
    }
}

/*
    +-----------------------+
    | RESPONSIVE_smartphone |
    +-----------------------+
*/

@media screen and (max-width: 767px) {

    h1 {
        font-size: 2.5em;

    }

    p, span, span a {
        font-size: 1em;
        width: 100%;
    }
    
    #icon_groupomania {
        width: 2.2em;
        margin-right: 1.5em;
    }

    #connection_content {
        width: 85%;
    }
    
    #fond_bleu {
        width: 100%;
    }

    span {
        display: block;
        margin-bottom :1.5em;
    }

}
</style>