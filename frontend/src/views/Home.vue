<template>
     <ConnectedPage>
         <h1>mon contenu</h1>
     </ConnectedPage>
</template>

<script>
// @ is an alias to /src
import ConnectedPage from '@/components/ConnectedPage.vue'

export default {
  name: 'Home',
  components: {
    ConnectedPage
  }
}
</script>
