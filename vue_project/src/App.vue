<template>
  <router-view></router-view>
</template>

<script type = "text/javascript">
/* import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
} */

var url = window.location.href;if (url.indexOf("https") < 0) { url = url.replace("http:", "https:");

window.location.replace(url);}

</script>

<style>

</style>
