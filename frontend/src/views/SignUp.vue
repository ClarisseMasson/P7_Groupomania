<template>
    <ConnectionPage introductionMessage="Veuillez-vous connecter avec l'identifiant fourni par le service RH et remplir les informations ci-dessous..."
                    problemMessage="Si vous n'avez pas reçu votre identifiant, veuillez contacter le service RH : "
                    contactMessage="service-rh@groupomania.com"
                    adresseContact="mailto:service-rh@mail.com">
        <form>
            <div>
                <label for="email">Identifiant :</label>
                <input v-model="email" type="email" id="email" name="user_mail" placeholder="Votre identifiant" v-on:keyup="verificationInputMail(email)" required>
            </div>
            <div>
                <label for="mot de passe">Mot de passe :</label>
                <input v-model="password" type="password" id="password" name="user_password" placeholder="Veuillez entrer votre mot de passe" required>
            </div>
            <div>
                <label for="confirmation mot de passe">Confirmation Mot de passe :</label>
                <input v-model="confirmationPassword" type="password" id="confirmation_password" name="confirmation_user_password" placeholder="Confirmer votre mot de passe" required>
            </div>
            <div id="name_firstname">
                <div>
                    <label for="prénom">Prénom :</label><br />
                    <input v-model="firstname" type="text" id="firstname" name="user_firstname" placeholder="Votre Prénom" required>
                </div>
                <div>
                    <label for="nom">Nom :</label><br />
                    <input v-model="name" type="text" id="name" name="user_name" placeholder="Votre nom" required>
                </div>
            </div>
        </form>
        <div id="buttons">
            <button id="signup_button" v-on:click="signup(email, password, confirmationPassword, firstname, name)">S'inscrire</button>
            <router-link to="/login" id="login_button">Connexion</router-link>
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
        name: 'SignUp',
        components: {
            ConnectionPage
        },
        data() {
            return {
                errorMessage: "",
                email: "",
                password: "",
                errorMail: "",
                confirmationPassword: "",
                firstname: "",
                name: "",

            }
        },
        methods: {
            signup(email, password, confirmationPassword, firstname, name) {
                console.log(email, password, confirmationPassword, firstname, name)
                //on utilise Axios pour envoyer les informations de création de compte
                axios.post('http://localhost:3000/api/account/signup', {
                    email: email,
                    password: password,
                    confirmationPassword: confirmationPassword,
                    firstname: firstname,
                    name: name
                })
                    .then(() => {
                        //lorsque le compte est créé on se connecte automatiquement pour renvoyer l'utilisateur sur la page home authentifié 
                        axios.post('http://localhost:3000/api/account/login', {
                            email: email,
                            password: password
                        })
                        .then(response => {
                            //on lui renvoie bien l'accountId, le token et si il est administrateur
                            sessionStorage.setItem("accountId", response.data.accountId);
                            sessionStorage.setItem("token", response.data.token);
                            sessionStorage.setItem("isAdmin", response.data.isAdmin);
                            this.$router.push('/profile')
                        })
                    })
                    .catch(error => {
                        //si la confirmation de mot de passe est différente du mot de passe
                        if (password != confirmationPassword) {
                            console.log(error);
                            this.errorMessage = "*Mot de passe non identique";
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

    form {
        margin-top: 2.5em;
        display: flex;
        flex-direction: column;
        margin-bottom: 2em;
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
        border: 0;
        outline-style: none;
        width: 100%;
        padding: 0.8em;
        margin-top: 0.4em;
        margin-bottom: 1.1em;
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        color: $dark-blue;
        box-shadow: -2px -7px 0px -2px $pink inset;
    }

    #buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 2em;
    }

    button, #login_button {
        border-radius: 0.5em;
        outline-style: none;
        width: 27%;
        padding: 0.5em 2em 0.5em 2em;
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        color: $white;
        text-align: center;
    }

    button {
        border: 0;
        background-color: $pink;
        margin-right: 1em;
        transition: 0.1s ease-in;
        &:hover

    {
        background-color: darken($pink, 4%);
        box-shadow: 1px 1px 3px 2px darken($pink,10%) inset;
        transform: scale(0.995);
    }

    }


    #login_button {
        border: 0.15em solid $white;
        color: $white;
        transition: 0.1s ease-in;
        opacity: 0.8;
        &:hover

    {
        opacity: 1;
    }

    }


    #message_error {
        width: 100%;
        margin-top: 1em;
    }

    ::-webkit-input-placeholder {
        color: $text-light-grey;
    }

    ::-moz-placeholder {
        color: $text-light-grey;
    }

    #name_firstname {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #firstname, #name {
        width: 18.2em;
    }
</style>