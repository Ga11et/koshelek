<template>
  <v-container fluid class="bg-indigo-lighten-1">
    <v-row justify="center" no-gutters>
      <nuxt-link :to="link.slug" v-for="link in links" :key="link" class="footer-link mx-2 text-button">
        {{ link.title }}
      </nuxt-link>

      <v-col class="text-center mt-4" cols="12"> {{ new Date().getFullYear() }} — <strong>Koshelek</strong> </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import links from "~/static/menu.json";
</script>

<style lang="scss" scoped>
.footer-link {
  position: relative;

  &::after {
    backface-visibility: hidden;
    bottom: 0px;
    content: " ";
    display: block;

    width: 0;
    height: 1px;
    background-color: currentColor;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  &.router-link-active {
    &::after {
      backface-visibility: hidden;
      border-color: #fff;
      transition: width 350ms ease-in-out;
      width: 100%;
    }
  }
}
</style>
