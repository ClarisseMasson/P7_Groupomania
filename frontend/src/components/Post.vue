<template>
    <div class="post" v-if="!isDeleted">
        <div>{{authorName}} {{authorFirstname}}</div>
        <h1>{{title}}</h1>
        <p>{{description}}</p>
        <img :src="fileUrl" v-if="showImage" />
        <video controls v-if="showVideo"><source :src="fileUrl" :type="fileType" /></video>
        <button v-if="showModify">modify</button>
        <button v-if="showDelete" v-on:click="deletePost">supprimer</button>
    </div>
</template>

<script>
    const axios = require('axios');

    export default {
        name: 'Post.vue',
        components: {

        },
        props: {
            authorName: { type: String },
            authorFirstname: { type: String},
            title: { type: String },
            description: { type: String },
            fileUrl: { type: String },
            date: { type: String },
            authorId: { type: Number },
            fileType: { type: String },
            id: {type: Number}
        },
        data() {
            return { isDeleted: false };
        },
        computed: {
            showImage() {
                return this.fileType && this.fileType.split("/")[0] == "image";
            },
            showVideo() {
                return this.fileType && this.fileType.split("/")[0] == "video";
            },
            showDelete() {
                return this.authorId == sessionStorage.getItem("accountId") || sessionStorage.getItem("isAdmin") == "true";
            },
            showModify() {
                return this.authorId == sessionStorage.getItem("accountId");
            }
        },
        methods: {
            deletePost() {
                axios.delete('http://localhost:3000/api/post/' + this.id)
                    .then(() => {
                        this.isDeleted = true;
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    video {
        width: 50%;
    }
</style>