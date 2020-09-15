<template>
    <ConnectionPage 
        introductionMessage= "Bonjour groupomaniac, veuillez-vous connecter avec votre compte..."
        problemMessage= "En cas d’oubli de votre mot de passe ou de votre identifiant, envoyer un mail au service IT: "
        contactMessage= "service-it@groupomania.com"
        adresseContact= "mailto:service-it@mail.com">
            <form>
                <div>
                    <label for="email">Identifiant :</label>
                    <input v-model="email" type="email" id="email" name="user_mail" placeholder="Votre email" required>
                </div>
                <div>
                    <label for="mot de passe">Mot de passe :</label>
                    <input v-model="password" type="password" id="password" name="user_password" placeholder="Votre mot de passe" required>
                </div>
            </form>
            <div id="buttons">
                <button id="login_button" v-on:click="login(email,password)">Connexion</button>
                <router-link to="/signup" id="signup_button">S'inscrire</router-link>
                <div id="message_error" v-if="errorMessage">{{errorMessage}}</div>
            </div>
    </ConnectionPage>
</template>

<!--On importe le composant connectionpage-->
<script>
    import ConnectionPage from '@/components/ConnectionPage.vue'
    //on importe Axios pour l'utiliser
    const axios = require('axios');

    export default {
        name: 'Login',
        components: {
            ConnectionPage
        },
        data() {
            return {
                errorMessage: "",
                email: "",
                password: "",
                errorMail: "",
            }
        },
        methods: {
            login(email, password) {
                console.log(email, password)
                //on utilise Axios pour envoyer les informations de connexion en lui indiquant sa route
                axios.post('http://192.168.0.29:3000/api/account/login', {
                    email: email,
                    password: password
                  })
                    .then(response => {
                        //on lui renvoie bien l'accountId, le token et si il est administrateur
                        sessionStorage.setItem("accountId", response.data.accountId);
                        sessionStorage.setItem("token", response.data.token);
                        sessionStorage.setItem("isAdmin", response.data.isAdmin);
                        this.$router.push('/home')

                  })
                    .catch(error => {
                         //si mauvaise authentification ou compte bloqué
                        if (error.response && error.response.status == 401) {
                            this.errorMessage = "*Utilisateur ou mot de passe incorrect";
                        }
                         //sinon en cas d'autres erreurs comme erreur réseau...
                        else {
                            this.errorMessage = "Une erreur s'est produite";
                        }
                  });
            }
        }
    }
</script>

<style scoped lang="scss">

    /*J'importe ma palette de couleur définie dans sass*/
    @import "../assets/colors.scss";

    a, button {
        cursor: pointer;
    }


    form {
        margin-top: 2.5em;
        margin-bottom:2em;
    }

    label {
        font-size: 1.1em;
        font-family: 'Fjalla One', sans-serif;
        font-weight: 500;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: $text-light-grey;
    }

    input {
        width: 100%;
        padding: 0.8em;
        margin-top:0.4em;
        margin-bottom: 2em;
        font-size: 1.1em;
        color: $dark-blue;
        box-shadow: -2px -7px 0px -2px $pink inset;
    }

    #buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom:2em;
    }

    button, #signup_button {
        border-radius: 0.5em;
        width: 10em;
        padding: 0.5em 2em 0.5em 2em;
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        color: $white;
        text-align: center;
    }

    button {
        border: 0;
        background-color: $pink;
        margin-right:1em;
        transition: 0.1s ease-in;

        &:hover {
            background-color: darken($pink, 4%);
            box-shadow: 1px 1px 3px 2px darken($pink,10%) inset;
            transform: scale(0.995);
        }
    }


    #signup_button {
        border: 0.15em solid $white;
        color: $white;
        transition: 0.1s ease-in;
        opacity: 0.8;

        &:hover {
            opacity: 1;
        }
    }

    
     #message_error {
        width: 100%;
        margin-top: 1em;

    }

    ::-webkit-input-placeholder{
        color: $text-light-grey;
    }

    ::-moz-placeholder {
        color: $text-light-grey;
    }

/*
    +-----------------------+
    | RESPONSIVE_smartphone |
    +-----------------------+
*/

@media screen and (max-width: 767px) {

    form {
        margin-top: 1.8em;
        margin-bottom: 0.4em;
    }

    #buttons {
        font-size: 1em;
        margin-bottom: 0.4em;
     
    }

    button, #signup_button {
        width: 11em;
        margin-bottom: 1em;;
    }
}
</style>