<template>
  <v-container v-if="!pending && stream" fluid class="bg-indigo-lighten-5 h-100">
    <v-row class="h-100" no-gutters>
      <v-col cols="12" md="6" class="bg-green-lighten-4 main-table">
        <BaseTable :rows="stream.bids" title="Bids" class="main-table__element pa-4" />
      </v-col>
      <v-col cols="12" md="6" class="bg-red-lighten-4 main-table">
        <BaseTable :rows="stream.asks" title="Asks" class="main-table__element pa-4" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();

const settings = useState("settings", () => ({
  symbol: "BTCUSDT",
  limit: 100,
}));

const { data: stream, pending } = useAsyncData("order-book", () => {
  return baseFetch(`${config.public.serverUrl}/depth`, {
    query: settings.value,
  });
});

useWebSocket({
  url: config.public.wsUrl,
  settings,
  stream,
});
</script>

<style lang="scss" scoped>
.main-table {
  position: relative;
  width: 100%;
  height: 50%;

  @media screen and (min-width: 960px) {
    height: 100%;
  }

  &__element {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
