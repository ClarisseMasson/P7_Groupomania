<template>
    <ConnectionPage introductionMessage="Veuillez-vous connecter avec l'identifiant fourni par le service RH et remplir les informations ci-dessous..."
                    problemMessage="Si vous n'avez pas reçu votre identifiant, veuillez contacter le service RH : "
                    contactMessage="service-rh@groupomania.com"
                    adresseContact="mailto:service-rh@mail.com">
        <form>
            <div>
                <label for="email">Identifiant :</label>
                <input v-model="email" type="email" id="email" name="user_mail" placeholder="Votre email" required>
            </div>
            <div>
                <label for="mot de passe">Mot de passe :</label>
                <input v-model="password" type="password" id="password" name="user_password" placeholder="Votre mot de passe" required>
            </div>
            <div>
                <label for="confirmation mot de passe">Confirmation Mot de passe :</label>
                <input v-model="confirmationPassword" type="password" id="confirmation_password" name="confirmation_user_password" placeholder="Votre mot de passe" required>
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
                errorMessage: "",//rempli avec l'erreur rencontrée
                email: "",
                password: "",
                confirmationPassword: "",
                firstname: "",
                name: ""
            }
        },
        methods: {
            signup(email, password, confirmationPassword, firstname, name) {
                if (this.verificationFormulaire(email, password, confirmationPassword)) {
                    //on utilise Axios pour envoyer les informations de création de compte
                    axios.post('http://192.168.0.29:3000/api/account/signup', {
                        email: email,
                        password: password,
                        firstname: firstname,
                        name: name
                    })
                        .then(() => {
                            //lorsque le compte est créé on se connecte automatiquement pour renvoyer l'utilisateur sur la page profil authentifié
                            axios.post('http://192.168.0.29:3000/api/account/login', {
                                email: email,
                                password: password
                            })
                                .then(response => {
                                    //on stocke l'accountId, le token et si il est administrateur dans sessionStorage
                                    sessionStorage.setItem("accountId", response.data.accountId);
                                    sessionStorage.setItem("token", response.data.token);
                                    sessionStorage.setItem("isAdmin", response.data.isAdmin);
                                    this.$router.push('/profile/' + response.data.accountId)
                                })
                        })
                        .catch(() => {
                                this.errorMessage = "*Une erreur s'est produite";
                        });
                }

            },
            verificationFormulaire(email, password, confirmationPassword) {
                const regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
                ////on verifie si le mail correspond à la regex, puis si le mot de passe est bien "fort",
                //si la confirmation du mot de passe est bien identique au mot de passe et enfin que tout les champs sont remplis
                if (!regex.test(email) || !this.passwordValidation(password) || password != confirmationPassword || !this.checkInputFields()) {
                    if (!regex.test(email)) {
                        this.errorMessage = "*Email invalide";
                    }
                    else if (password != confirmationPassword) {
                        this.errorMessage = "*Mot de passe non identique";
                    }
                    return false;
                }
                else {
                    return true;
                }

            },
            checkInputFields() {
                const inputs = document.getElementsByTagName("input");
                //on utilise une boucle pour vérifier que tout les champs font plus de 2 caractères
                //on précise le message d'erreur associé
                for (let input of inputs) {
                    if (input.value.length <= 2) {
                        this.errorMessage = "*Remplir le champ : " + input.getAttribute('placeholder');
                        return false;
                    }
                }
                return true;
            },
            passwordValidation(password) {
                //on vérifie si le mot de passe est d'au moins 8 caractères, a au moins 1 majuscule et 1 chiffre
                //comme ce qu'on a demandé dans le backend
                if (password.length >= 8 && password != password.toLowerCase() && /\d/.test(password)) {
                    return true;
                }
                else {
                    //on précise le message d'erreur associé
                    this.errorMessage = "*Mot de passe d'au moins 8 caractères contenant au moins 1 chiffre et 1 majuscule";
                    return false;
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    /*J'importe ma palette de couleur définie dans sass*/
    @import "../assets/colors.scss";

/*
    +----------------+
    | MON FORMULAIRE |
    +----------------+
*/
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
        width: 100%;
        padding: 0.8em;
        margin-top: 0.4em;
        margin-bottom: 1.1em;
        font-size: 1.1em;
        color: $dark-blue;
        box-shadow: -2px -7px 0px -2px $pink inset;
    }

/*
    +-------------+
    | MES BOUTONS |
    +-------------+
*/

    /*je définie mon block enveloppant mes deux boutons*/
    #buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 2em;
    }

    /*je définie les paramètres communs de mes 2 boutons*/
    button, #login_button {
        border-radius: 0.5em;
        width: 10em;
        padding: 0.5em 2em 0.5em 2em;
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        color: $white;
        text-align: center;
    }

    /*je définie mon bouton principal*/
    button {
        border: 0;
        background-color: $pink;
        margin-right: 1em;
        transition: 0.1s ease-in;
        &:hover{
        background-color: darken($pink, 4%);
        box-shadow: 1px 1px 3px 2px darken($pink,10%) inset;
        transform: scale(0.995);
        }
    }

    /*je définie mon bouton secondaire*/
    #login_button {
        border: 0.15em solid $white;
        color: $white;
        transition: 0.1s ease-in;
        opacity: 0.8;
        &:hover{
        opacity: 1;
        }
    }

    /*je définie ma phrase en cas d'erreur formulaire*/
    #message_error {
        width: 100%;
        margin-top: 1em;
    }

    /*je définie mon block enveloppant le nom et le prénom*/
    #name_firstname {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #name_firstname div {
        width: 48%;
    }

/*
    +---------------------+
    | RESPONSIVE_Tablette |
    +---------------------+
*/

@media screen and (min-width: 767px) and (max-width : 1367px) {

    #name_firstname {
        flex-wrap: wrap;
    }

    #name_firstname div {
        width: 100%;
    }

    #firstname, #name {
        width: 100%;
    }
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

    button, #login_button {
        width: 11em;
        margin-bottom: 1em;;
    }

    #name_firstname {
        flex-wrap: wrap;
    }
    
    #name_firstname div {
        width: 100%;
    }

    #firstname, #name {
        width: 100%;
    }
}
</style>