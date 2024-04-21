<template>
  <v-app-bar :order="0" class="bg-indigo-lighten-4">
    <template v-slot:prepend v-if="$vuetify.display.mdAndDown">
      <v-app-bar-nav-icon variant="text" @click.stop="emit('drawlerToggle')"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Koshelek</v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
const emit = defineEmits(["drawlerToggle"]);
</script>

<style lang="scss" scoped></style>
