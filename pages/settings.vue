<template>
  <v-card class="h-100 pa-4">
    <v-select v-model="settings.symbol" label="Currency pair" :items="['BTCUSDT', 'BNBBTC', 'ETHBTC']"></v-select>
    <v-select v-model="settings.limit" label="Limit" :items="[100, 500, 1000]"></v-select>
  </v-card>
</template>

<script setup>
const settings = useState("settings", () => ({
  symbol: "BTCUSDT",
  limit: 100,
}));
</script>

<style lang="scss" scoped></style>
