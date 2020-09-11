<template>
    <div>
        <form>
            <div>
                <input type="text" id="title_post" name="title_post" placeholder="le titre de mon post" v-model="post.title">
            </div>
            <div>
                <textarea id="description_post" name="description_post" placeholder="Mettez ici le commentaire de votre post (ceci est facultatif...)" v-model="post.description"></textarea>
            </div>
            <div id="file_change">
                <label for="msg">Ajouter un fichier :</label>
                <input type="file" id="image_post" name="image_post" accept="image/png, image/jpeg, image/jpg" @change="fileIsUploaded('image_post')">
                <input type="file" id="gif_post" name="gif_post" accept="image/gif" @change="fileIsUploaded('gif_post')">
                <input type="file" id="video_post" name="video_post" accept="video/mp4" @change="fileIsUploaded('video_post')">
            </div>
        </form>
        <button v-on:click="createPost()">Publier</button>
    </div>
</template>

<script>

    const axios = require('axios');

    export default {
        name: 'CreatePost',
        components: {

        },
        data() {
            return {
                post: {},
                fileToUpload: null
            }
        },
        methods: {
            createPost() {
                console.log(JSON.stringify(this.post));
                var formData = new FormData();
                formData.append("post", JSON.stringify(this.post));
                formData.append("accountId", sessionStorage.getItem("accountId"));
                formData.append("file", this.fileToUpload);


                axios.post('http://localhost:3000/api/post', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(() => {
                        this.$router.go();
                    })
            },
            fileIsUploaded(fileInputId) {
                console.log(fileInputId);
                for (let element of document.getElementsByClassName("fileIsUploaded")) {
                    element.classList.remove("fileIsUploaded");
                }
                let fileInput = document.getElementById(fileInputId);
                fileInput.classList.add("fileIsUploaded");
                //on garde en mémoire le fichier qui doit être uploadé
                this.fileToUpload = fileInput.files[0];
            }
        }
    }
</script>

<style scoped lang="scss">

    h1 {
        font-family: 'Comic Sans MS';
        color: palevioletred;
    }
</style>