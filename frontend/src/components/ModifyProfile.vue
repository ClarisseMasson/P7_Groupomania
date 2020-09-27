<template>
    <div>
        <form>
            <div class="container_input">
                <label for="name_account">Nom :</label>
                <input type="text" name="name_account" placeholder="Votre nom" v-model="account.name" v-focus>
                <label for="firstname_account">Prénom :</label>
                <input type="text" name="firstname_account" placeholder="Votre prénom" v-model="account.firstname">
            </div>            
            <div class="container_input">
                <label for="job_account">Profession :</label>
                <input type="text" name="job_account" placeholder="Indiquer votre profession" v-model="account.job">
            </div>
            <div class="container_input">
                <label for="email_account">Email :</label>
                <input type="text" name="email_account" placeholder="Modifier votre email" v-model="account.email">
                <label for="phone_account">Téléphone :</label>
                <input type="text" name="phone_account" placeholder="Ajouter un téléphone" v-model="account.phone">
            </div>
        </form>
        <div id="button_part">
            <button v-on:click="updateProfile()">Modifier</button>
        </div>
    </div>
</template>

<script>

    const axios = require('axios');

    export default {
        name: 'ModifyPost',
        components: {

        },
        props: {
            account: { type: Object }
        },
        methods: {
             //on vérifie si le formulaire est valide
            //si oui on déclenche la modification en transmettant le formulaire au backend 
             updateProfile() {
                if (this.updateFormIsValid()) {
                    axios.put('http://192.168.0.29:3000/api/account/profile/' + this.account.id, this.account, this.getHeader())
                        .then(() => {
                            this.$router.go();
                        })
                }
                else {
                    window.alert("Le formulaire n'est pas valide");
                }
             },
             //on vérifie si le mail est un mail valide avec le regex
             //on vérifie si le nom et le prénom on bien au moins 2 lettres
            updateFormIsValid() {
                const regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
                return regex.test(this.account.email)
                    && this.account.name.length >= 2
                    && this.account.firstname.length >= 2;
            },
        }
    }
</script>

<style scoped lang="scss">

    @import "../assets/colors.scss";

    form {
        padding: 4% 6% 0% 6%;
    }

    .container_input {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        margin: 0.2rem 0rem 0.5rem 0em;
        margin-bottom: 1.5em;
    }

    label {
        width: 100%;
        font-size: 1.2rem;
        font-family: 'Fjalla One', sans-serif;
        color: $dark-blue;
        margin-bottom: 0.3em;
        text-transform: uppercase;
        border-left:  0.25em solid $pink;
        padding-left: 0.25em;
    }

    .container_input input{
        outline: none;
        border: none;
        background-color: transparent;
        width: 100%;
        font-size: 1rem;
        font-family: 'Poppins', sans-serif;
        color: $dark-blue;
        margin-bottom: 1rem;
        border-bottom: 0.1em solid $text-grey;
    }

    .container_input input::placeholder, textarea::placeholder {
        font-weight: lighter;
        color: $text-grey;
    }

    #button_part {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 0% 6% 4% 6%;
    }
    
    button {
        cursor: pointer;
        border: none;
        width: 35%;
        border-radius: 0.5em;
        padding: 0.15rem 1rem 0.15rem 1rem;
        font-size: 1.1rem;
        font-family: 'Poppins', sans-serif;
        color: $white;
        text-align: center;
        background-color: $pink;
        align-self: flex-end;
        &:hover

    {
        background-color: darken($pink, 4%);
        box-shadow: 1px 1px 3px 2px darken($pink,10%) inset;
        transform: scale(0.995);
    }
    }
 
</style>