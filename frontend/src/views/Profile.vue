<template>
    <ConnectedPage>
        <article id="page_profile">
            <section id="top_part">
                <router-link to="/home" id="return_home"><img src="../assets/images/icon_return.svg" alt="retour à la page Home" /></router-link>
                <h1><span v-if="isMyAccount()">Mon </span>profil</h1>
            </section>
            <Lightbox v-if="showModal" @close="showModal = false" boxTitle="Modifier mon PROFIL"><ModifyProfile :account="account"></ModifyProfile></Lightbox>
            <div id="container_profile">
                <img src="../assets/images/profile_fond.jpg" alt="image de fond" />
                <div id="relative_photo">
                    <div id="photo_profile">
                        <img src="../assets/images/photo_profile.jpg" alt="photo de profil" />
                    </div>
                </div>
                <div id="nom_prenom_poste">
                    <h2>{{account.firstname}}<span> {{account.name}}</span></h2>
                    <h3>{{account.job}}</h3>
                </div>
                <address>
                    <div class="address-composant">
                        <h4>Email :</h4>
                        <p>{{account.email}}</p>
                    </div>
                    <div class="address-composant">
                        <h4>Telephone :</h4>
                        <p>{{account.phone}}</p>
                    </div>
                </address>
                <!-- On affiche le bouton pour supprimer le profil seulement si on est le propriètaire du compte ou l'admin -->
                <button v-if="showDelete" v-on:click="deleteProfile">Supprimer mon compte</button>

                <div id="edit_profile">
                    <div v-if="isMyAccount()">
                        <a id="modify_profile" v-on:click="showModal = true">
                            <img src="../assets/images/icon_modify_white.svg" alt="modifier son profil" />
                        </a>
                        <a id="logout_profile" v-on:click="logoutProfile">
                            <img src="../assets/images/icon_logout_white.svg" alt="supprimer son profil" />
                        </a>
                    </div>
                </div>

            </div>
        </article>
    </ConnectedPage>
</template>

<script>
    const axios = require('axios');

    import ConnectedPage from '@/components/ConnectedPage.vue'
    import Lightbox from '@/components/Lightbox.vue'
    import ModifyProfile from '@/components/ModifyProfile.vue'


    export default {
        name: 'Profile',
        components: {
            ConnectedPage,
            Lightbox,
            ModifyProfile
        },
        data() {
            return {
                account: {},
                accountUpdate: {},
                showModal: false
            };
        },
        mounted() {
            const accountId = this.$route.params.accountid;
            axios
                .get('http://192.168.0.29:3000/api/account/profile/' + accountId, this.getHeader())
                .then(response => (this.account = response.data))
        },
        computed: {
            showDelete() {
                //On vérifie si 
                return (this.isMyAccount() || sessionStorage.getItem("isAdmin") == "true") && !this.isModifying;
            }
        },
        methods: {
            //on supprime le profil dans la base de données et on renvoie vers la page login
            deleteProfile() {
                axios.delete('http://192.168.0.29:3000/api/account/profile/' + this.account.id, this.getHeader())
                    .then(() => {
                        this.returnToLogin();
                    })
            },
            updateProfile() {
                //on envoie la mise à jour (soit l'objet contenu dans accountUpdate) si le formulaire est valide 
                if (this.updateFormIsValid()) {
                    axios.put('http://192.168.0.29:3000/api/account/profile/' + this.account.id, this.accountUpdate, this.getHeader())
                        .then(() => {
                            this.isModifying = false;
                            this.$router.go();
                        })
                }
                else {
                    window.alert("Le formulaire n'est pas valide");
                }
            },
            logoutProfile() {
                this.returnToLogin();
            },
            returnToLogin() {
                //on se déconnecte et on est renvoyé vers la page login
                sessionStorage.clear();
                this.$router.push('/login');
            },
            updateFormIsValid() {
                // return true si le mail correspond au regex
                //et que le nom a plus d'1 caractère
                //et que le prénom a également plus d'1 caractère
                const regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
                return regex.test(this.accountUpdate.email)
                    && this.accountUpdate.name.length > 1
                    && this.accountUpdate.firstname.length > 1;
            },
            isMyAccount() {
                //renvoie true quand le compte affcihé est le même que celui stocké dans le sessionStorage(soit celui qui est connecté)
                return this.account.id == sessionStorage.getItem("accountId");
            }
        }
    }
</script>

<style scoped lang="scss">

    @import "../assets/colors.scss";


    h1 {
        width: 100%;
        font-family: 'Fjalla One', sans-serif;
        font-size: 1.5em;
        color: $medium-blue;
        text-align: center;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        flex-grow: 100%;
        margin-right: 1.5em;
    }

    h2 {
        font-family: 'Fjalla One', sans-serif;
        font-size: 2.4em;
        color: $dark-blue;
        letter-spacing: 0.1em;
        line-height: 1.2em;

        span

    {
        text-transform: uppercase;
    }

    }

    h3 {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1em;
        color: $text-grey;
        font-weight: normal;
    }

    h4 {
        font-family: 'Fjalla One', sans-serif;
        font-size: 1em;
        color: $dark-blue;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        line-height: 1.4em;
    }

    p {
        font-family: 'Poppins', sans-serif;
        font-size: 1em;
        color: $text-grey;
    }

    /*Page définissant la largeur d'affichage de mes éléments*/
    #page_profile {
        width: 32%;
    }

    /*<= mon profil*/
    #top_part {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 3.2em;
        margin-bottom: 2.5em;
        img

    {
        height: 1.8em;
    }

    }

/*
    +-------------------+
    | CONTENU_PRINCIPAL |
    +-------------------+
*/

    /*Conteneur principal*/
    #container_profile {
        position: relative;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        background-color: $white;
        border-radius: 0.2em;
        box-shadow: 0em 0em 0.4em 0.1em rgba($medium-blue, 0.2);
        img

    {
        width: 100%;
        border-top-left-radius: 0.2em;
        border-top-right-radius: 0.2em;
    }

    }

    #nom_prenom_poste {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 4em;
        padding-bottom: 2em;
        border-bottom: .1em solid $text-light-grey;
    }

    address {
        width: 100%;
        font-style: normal;
        padding-top: 1em;
        padding-bottom: 1em;
        .address-composant{
        width: 100%;
        padding: 0.5em 1.5em 0.5em 1.5em;
        }
    }

    button {
        outline-style: none;
        border: 0;
        width: 20em;
        border-radius: 0.5em;
        padding: 0.5em 2em 0.5em 2em;
        font-size: 1.1em;
        font-family: 'Poppins', sans-serif;
        color: $white;
        text-align: center;
        background-color: $pink;
        transition: 0.1s ease-in;
        margin-bottom: 1.5em;
        &:hover{
        background-color: darken($pink, 4%);
        box-shadow: 1px 1px 3px 2px darken($pink,10%) inset;
        transform: scale(0.995);
        }
    }

/*
    +-------------------------------------+
    | CONTENU_AU_DESSUS_DU_BLOC_PRINCIPAL |
    +-------------------------------------+
*/

    /*boutons de modification et de déconnection*/
    #edit_profile {
        top: 1em;
        right: 1em;
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        img{
        width: 1.5em;
        margin-left: 0.7em;
        }
        a {
        cursor: pointer;
        }
    }

    /*Image de profil ronde*/
    #photo_profile {
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -70%);

        img {
            border-radius: 50%;
            border: 0.5em solid $white;
        }
    }

    #relative_photo {
        position: relative;
        width: 25em;
        height: auto;
        align-content: center;
    }

/*
    +------------------------------+
    | RESPONSIVE_Tablette_Ipad Pro |
    +------------------------------+
*/

@media screen and (min-width: 1000px) and (max-width : 1367px) {

    #page_profile {
        width: 60%;
    }

    button {
        width: 50%;
        font-size: 1em;
    }

}


/*
    +-----------------------------+
    | RESPONSIVE_Tablette_paysage |
    +-----------------------------+
*/

@media screen and (min-width: 767px) and (max-width : 1365px) and (orientation: landscape) {

    #page_profile {
        width: 60%;
    }

    button {
        width: 50%;
        font-size: 1em;
    }
}

/*
    +-----------------------------+
    | RESPONSIVE_Tablette_paysage |
    +-----------------------------+
*/

@media screen and (min-width: 767px) and (max-width : 1024px) and (orientation: portrait) {

    #page_profile {
        width: 80%;
    }

    button {
        width: 50%;
        font-size: 1em;
    }

}
/*
    +-----------------------+
    | RESPONSIVE_smartphone |
    +-----------------------+
*/

@media screen and (max-width: 767px) {

    h1 {
        font-size: 1.3em;
        margin-right: 1.3em;
    }

    h2 {
        text-align: center;
    }


    #top_part {
        margin-top: 1.3em;
        margin-bottom: 1.3em;

        img{
        height: 1.4em;
        }
    }

    #page_profile {
        width: 90%;
    }

    button {
        width: 80%;
        font-size: 1em;
    }
    
    #nom_prenom_poste {
    flex-wrap: wrap;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-bottom: 1em;
    }

    
    #relative_photo {
        width: 18em;
    }


}

@media screen and (max-width: 767px) and (orientation: landscape){

    h1 {
        font-size: 1.3em;
        margin-right: 1.3em;
    }

    h2 {
        text-align: center;
    }


    #top_part {
        margin-top: 1.3em;
        margin-bottom: 1.3em;

        img{
        height: 1.4em;
        }
    }

    #page_profile {
        width: 90%;
    }

    button {
        width: 80%;
        font-size: 1em;
    }
    
    #nom_prenom_poste {
    flex-wrap: wrap;
    padding-top: 5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-bottom: 1em;
    }

     
}
</style>