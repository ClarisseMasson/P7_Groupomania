<template>
    <div>
        <form>
            <div id="title_input">
                <input type="text" id="title_post" name="title_post" placeholder="Donnez un titre" v-model="post.title" v-focus>
            </div>
            <div>
                <TextareaAutosize id="description_post" name="description_post" placeholder="Voulez-vous ajouter une description ? Ceci est facultatif..." v-model="post.description"></TextareaAutosize>
            </div>
            <div id="file_change">
                <div id="existing_file" v-if="hasFile">
                    <h2>Votre fichier :</h2>
                    <div id="preview_file">
                        <img :src="post.fileUrl" v-if="showImage" />
                        <video controls v-if="showVideo"><source :src="post.fileUrl" :type="fileType" /></video>
                        <img v-if="showImage || showVideo" src="../assets/images/icon_delete_white.svg" alt="supprimer fichier existant" id="delete_existing_file" v-on:click="deleteFile()" />
                    </div>
                </div>
                <div class="add_files" v-if="!hasFile">
                    <h2>Ajouter un fichier :</h2>
                    <label for="image_post">
                        <img v-bind:src="iconPhoto" alt="ajouter une photo" class="icon_form" />
                        <p>Image</p>
                    </label>
                    <input type="file" id="image_post" name="image_post" accept="image/png, image/jpeg, image/jpg" @change="imageIsUploaded()">
                    <label for="gif_post">
                        <img v-bind:src="iconGif" alt="ajouter un gif" class="icon_form" />
                        <p>Gif</p>
                    </label>
                    <input type="file" id="gif_post" name="gif_post" accept="image/gif" @change="gifIsUploaded()">
                    <label for="video_post">
                        <img v-bind:src="iconVideo" alt="ajouter un gif" class="icon_form" />
                        <p>Vidéo</p>
                    </label>
                    <input type="file" id="video_post" name="video_post" accept="video/mp4" @change="videoIsUploaded()">
                </div>
            </div>

        </form>
        <div id="button_part">
            <button v-if="post.id == -1" v-on:click="createPost()">Publier</button>
            <button v-if="post.id != -1" v-on:click="modifyPost()">Modifier</button>
        </div>
    </div>
</template>

<script>

    const axios = require('axios');

    import photo from "../assets/images/icon_photo_pink.svg"
    import photoClicked from "../assets/images/icon_photo_clicked_pink.svg"
    import gif from "../assets/images/icon_gif_pink.svg"
    import gifClicked from "../assets/images/icon_gif_clicked_pink.svg"
    import video from "../assets/images/icon_video.svg"
    import videoClicked from "../assets/images/icon_video_clicked.svg"


    export default {
        name: 'CreatePost',
        components: {

        },
        props: {
            post: {
                type: Object,
                default: function () {
                    return {
                        id: -1,
                        title: "",
                        description: "",
                        fileUrl: null,
                        filType: null
                    }
                }
            }
        },
        data() {
            return {
                iconPhoto: photo,
                iconGif: gif,
                fileToUpload: null,
                iconVideo: video,
                hasFile: false
            }
        },
        created() {
            this.hasFile = (this.post.fileUrl != null);
        },
        computed: {
            showImage() {
                return this.post.fileType && this.post.fileType.split("/")[0] == "image";
            },
            showVideo() {
                return this.post.fileType && this.post.fileType.split("/")[0] == "video";
            },
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
                        ...this.getHeader().headers,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(() => {
                        this.$router.go();
                    })
            },
            modifyPost() {
                console.log(JSON.stringify(this.post));
                var formData = new FormData();
                formData.append("post", JSON.stringify(this.post));
                formData.append("accountId", sessionStorage.getItem("accountId"));
                formData.append("file", this.fileToUpload);

                console.log(formData);

                axios.put('http://localhost:3000/api/post/' + this.post.id, formData, {
                    headers: {
                        ...this.getHeader().headers,
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
            },
            imageIsUploaded() {
                const imageInputFile = document.getElementById('image_post');
                const imageLabel = document.querySelector('label[for=image_post]');

                if (imageInputFile.files.length == 1) {

                    this.cleanFileSelected();

                    this.iconPhoto = photoClicked;
                    this.fileToUpload = imageInputFile.files[0];

                    imageLabel.classList.add('file_selected');

                } else {
                    this.iconPhoto = photo;
                    this.fileToUpload = null;

                    imageLabel.classList.remove('file_selected');

                }
            },
            gifIsUploaded() {
                const gifInputFile = document.getElementById('gif_post');
                const gifLabel = document.querySelector('label[for=gif_post]');


                if (gifInputFile.files.length == 1) {

                    this.cleanFileSelected();
                    this.iconGif = gifClicked;
                    this.fileToUpload = gifInputFile.files[0];

                    gifLabel.classList.add('file_selected');

                } else {
                    this.iconGif = gif;
                    this.fileToUpload = null;

                    gifLabel.classList.remove('file_selected');

                }
            },
            videoIsUploaded() {
                const videoInputFile = document.getElementById('video_post');
                const videoLabel = document.querySelector('label[for=video_post]');

                if (videoInputFile.files.length == 1) {

                    this.cleanFileSelected();
                    this.iconVideo = videoClicked;
                    this.fileToUpload = videoInputFile.files[0];

                    videoLabel.classList.add('file_selected');

                } else {
                    this.iconVideo = video;
                    this.fileToUpload = null;

                    videoLabel.classList.remove('file_selected');


                }
            },
            cleanFileSelected() {
                const imageLabel = document.querySelector('label[for=image_post]');
                const gifLabel = document.querySelector('label[for=gif_post]');
                const videoLabel = document.querySelector('label[for=video_post]');

                imageLabel.classList.remove('file_selected');
                gifLabel.classList.remove('file_selected');
                videoLabel.classList.remove('file_selected');

                this.iconPhoto = photo;
                this.iconGif = gif;
                this.iconVideo = video;
            },
            deleteFile() {
                this.post.fileUrl = null;
                this.post.fileType = null;
                this.hasFile = false;
            }
        }
    }
</script>

<style scoped lang="scss">

    @import "../assets/colors.scss";


    h2 {
        width: 100%;
        font-size: 1.2rem;
        font-family: 'Fjalla One', sans-serif;
        color: $medium-blue;
        margin-bottom: 0.3em;
        letter-spacing: 0.05em;
    }

    label p {
        cursor: pointer;
        font-size: 0.9rem;
        font-family: 'Poppins', sans-serif;
        color: $dark-blue;
    }

    .file_selected p {
        font-weight: bold;
        color: $pink;
    }

    form {
        padding: 4% 6% 0% 6%;
        img, video

    {
        width: 80%
    }

    }

    input, textarea {
        outline: none;
        border: none;
        background-color: transparent;
    }

    #title_input input {
        width: 100%;
        font-size: 1.35rem;
        font-family: 'Poppins', sans-serif;
        font-weight: normal;
        color: $dark-blue;
        margin-bottom: 0.7rem;
    }



    #title_input input::placeholder, textarea::placeholder {
        font-weight: 200;
                color: $text-grey;

    }


    #title_input input:-webkit-autofill,
    #title_input input:-webkit-autofill:hover,
    #title_input input:-webkit-autofill:focus {
        -webkit-text-fill-color: $dark-blue;
        -webkit-box-shadow: 0 0 0 30px $white inset !important;
    }

    textarea {
        width: 100%;
        min-height: 10rem;
        outline: none;
        border: none;
        border: 0.1em solid $medium-blue;
        font-size: 0.95rem;
        font-family: 'Poppins', sans-serif;
        font-weight: normal;
        color: $dark-blue;
        padding: 0.3rem;
        margin-bottom: 0.7rem;
    }

    /*fais disparaitre les input file par défaut*/
    .add_files input {
        display: none;
    }

    .add_files {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        margin: 0.2rem 0rem 0.5rem 0em;
    }

    label {
        display: flex;
        align-items: center;
        margin-right: 1em;
    }

    .icon_form {
        cursor: pointer;
        width: 1.8rem;
        height: auto;
        margin-right: 0.4em;
    }

    #publish {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }

    #button_part {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 2% 6% 4% 6%;
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

    #preview_file {
        position: relative;
    }

    #delete_existing_file {
        cursor: pointer;
        width: 1.5em;
        position: absolute;
        top: 0px;
        right: 20%;
        margin: 0.5em;
        box-shadow: 0px 0px 6px 1px rgba($text-grey, 0.4);
        border-radius: 50%;
    }
</style>