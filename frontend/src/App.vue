<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat';
  resize: none;
  text-decoration: none;
  transition: 0.3s;
}

:root {
  --shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  --dark-blue: #000A2D;
  --milk: #FFFDF6;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
