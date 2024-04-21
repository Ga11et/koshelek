<template>
  <v-layout class="h-screen">
    <!-- v-app-bar дает гидрационные ошибки -->
    <client-only>
      <LayoutHeader @drawlerToggle="drawlerOpened = !drawlerOpened" />
    </client-only>

    <v-navigation-drawer v-model="drawlerOpened" floating class="bg-indigo-lighten-4">
      <v-list density="compact" nav>
        <v-list-item
          :prepend-icon="`mdi-${item.icon}`"
          :active="$route.path === item.slug"
          :to="item.slug"
          v-for="item in links"
          nuxt
          class="bg-indigo-lighten-1"
        >
          <template v-slot:append>
            <div class="text-button">{{ item.title }}</div>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex flex-column justify-space-between">
      <div style="flex: 1">
        <slot></slot>
      </div>

      <LayoutFooter />
    </v-main>
  </v-layout>
</template>

<script setup>
import links from "~/static/menu.json";

const ws = useState("ws");

const drawlerOpened = ref(false);

onBeforeUnmount(() => {
  if (!ws.value) return;

  ws.value.close();
});
</script>

<style lang="scss" scoped></style>
