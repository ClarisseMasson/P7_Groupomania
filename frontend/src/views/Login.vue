<template>
    <div>
        <ConnectionPage>
            <div id="login_content">
                <h1>Nous sommes tous<br /><span>Groupomania</span></h1>
                <p>
                    Bonjour groupomaniac, veuillez-vous connecter avec votre compte...
                </p>
                <form>
                    <div>
                        <label for="email">Identifiant :</label>
                        <input v-model="email" type="email" id="email" name="user_mail">
                    </div>
                    <div>
                        <label for="mot de passe">Mot de passe :</label>
                        <input v-model="password" type="password" id="password" name="user_password">
                    </div>
                </form>
                <p>
                    En cas d’oubli de votre mot de passe ou de votre compte, envoyer un mail au service IT: <a href="mailto:it@mail.com">service-it@groupomania.com</a>
                </p>
                <button id="login_button" v-on:click="login(email,password)">Connexion</button>
                <div id="message_error" v-if="errorMessage">{{errorMessage}}</div>
            </div>
        </ConnectionPage>
    </div>
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
                password: ""
            }
        },
        methods: {
            login(email, password) {
                console.log(email, password)
                //on utilise Axios pour envoyer les informations de connexion en lui indiquant sa route
                axios.post('http://localhost:3000/api/auth/login', {
                    email: email,
                    password: password
                  })
                    .then(response => {
                         //on récupère le token renvoyé et on le stocke dans session storage
                        const token = response.data.token;
                        sessionStorage.setItem("token", token);
                        this.$router.push('/home')

                  })
                    .catch(error => {
                         //si mauvaise authentification ou compte bloqué
                        if (error.response && error.response.status == 401) {
                            this.errorMessage = "Utilisateur ou mot de passe incorrect";
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

<style lang="scss">

    /*J'importe ma palette de couleur définie dans sass*/
    @import "../assets/colors.scss";

    h1 {
        font-size: 3.8em;
        font-family: 'Fjalla One', sans-serif;
        font-weight: 500;
        letter-spacing: 0.03em;
        line-height:1.1em;
        color: $text-light-grey;
    }

    h1 span {
        color: $white;
    }

    p {
        width: 75%;
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        font-style: italic;
        color: $text-light-grey;

    }

    p :last-of-type{

        color: red;

    }

    #login_content {
        width: 70%;
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
    }

    button {
        width: 20%;
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        color: $white;
        text-decoration: none;
        background-color: $pink;
    }

</style>