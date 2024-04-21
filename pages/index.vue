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
const ws = useState("ws", () => null);

const { data: stream, pending } = useAsyncData("order-book", () => {
  return baseFetch(`${config.public.serverUrl}/depth`, {
    query: settings.value,
  });
});

const connectHandler = () => {
  if (!ws.value) return;

  ws.value.send(
    JSON.stringify({
      method: "SUBSCRIBE",
      params: [`${String(settings.value.symbol).toLowerCase()}@depth`],
      id: 1,
    })
  );
};
const errorHandler = (event) => {
  console.log("web socket error", event);
};
const messageHandler = (event) => {
  if (!stream.value || !event?.data) return;
  const message = JSON.parse(event.data);
  if (!message?.data) return;

  stream.value.lastUpdateId = message.data.U;
  stream.value.bids = [...message.data.b, ...stream.value.bids]
    .filter((el) => +el[1] !== 0)
    .slice(0, settings.value.limit);
  stream.value.asks = [...message.data.a, ...stream.value.asks]
    .filter((el) => +el[1] !== 0)
    .slice(0, settings.value.limit);
};
const closeHandler = () => {
  if (!ws.value) return;

  ws.value.send(
    JSON.stringify({
      method: "UNSUBSCRIBE",
      params: [`${String(settings.value.symbol).toLowerCase()}@depth`],
      id: 1,
    })
  );
};

onMounted(() => {
  if (!ws.value) {
    ws.value = new WebSocket(config.public.wsUrl);
  } else {
    connectHandler();
  }

  ws.value.addEventListener("open", connectHandler);
  ws.value.addEventListener("error", errorHandler);
  ws.value.addEventListener("message", messageHandler);
});

onBeforeUnmount(() => {
  closeHandler();

  ws.value.removeEventListener("open", connectHandler);
  ws.value.removeEventListener("error", errorHandler);
  ws.value.removeEventListener("message", messageHandler);
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
