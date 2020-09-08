<template>
    <ConnectedPage>
        <h1>mon contenu : {{account}}</h1>
    </ConnectedPage>
</template>

<script>
    // @ is an alias to /src
    import ConnectedPage from '@/components/ConnectedPage.vue'
    const axios = require('axios');

    export default {
        name: 'Profile',
        components: {
            ConnectedPage
        },
        data() {
            return {
                account: null,
            }
        },
        mounted() {
            const accountId = sessionStorage.getItem('accountId');
            axios
                .get('http://localhost:3000/api/account/profile/'+ accountId)
                .then(response => (this.account = response.data))
        }
    }
</script>