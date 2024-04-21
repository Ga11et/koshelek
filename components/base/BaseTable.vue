<template>
  <v-data-table-virtual fixed-header :items="rows" :headers="headers" class="base-table">
    <template v-slot:top>
      <v-toolbar flat density="compact" class="bg-indigo-lighten-1">
        <v-toolbar-title :text="title" />
        <v-divider class="border-opacity-100 mx-4" color="white" inset vertical></v-divider>

        <template v-if="$vuetify.display.mdAndUp">
          <div class="text-h6 text-lg-h5">Pair: {{ settings.symbol }}</div>
          <v-divider class="border-opacity-100 mx-4" color="white" inset vertical></v-divider>
          <div class="text-h6 text-lg-h5 pr-4">Amount: {{ settings.limit }}</div>
        </template>

        <template v-else>
          <div class="text-body-2 pr-4">{{ settings.symbol }} / {{ settings.limit }}</div>
        </template>
      </v-toolbar>
    </template>

    <template v-slot:headers="{ columns }">
      <tr class="bg-indigo-lighten-4">
        <template v-for="column in columns" :key="column.key">
          <td>
            <span>
              <strong>{{ column.title }}</strong>
            </span>
          </td>
        </template>
      </tr>
    </template>

    <template v-slot:item.price="{ item }">
      {{ Number(item[0]) }}
    </template>
    <template v-slot:item.quantity="{ item }">
      {{ Number(item[1]).toFixed(5) }}
    </template>
    <template v-slot:item.total="{ item }">
      {{ Math.floor(item[0] * item[1] * 100000) / 100000 }}
    </template>
  </v-data-table-virtual>
</template>

<script setup>
import tableHeaders from "~/static/table-headers.json";

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "heading",
  },
});

const display = useDisplay();

const settings = useState("settings");

const headers = computed(() => {
  if (display?.mdAndUp.value) {
    return tableHeaders;
  }

  return tableHeaders.filter((el) => !el.additional);
});
</script>

<style lang="scss" scoped>
.base-table {
  --v-table-header-height: 30px;
  --v-table-row-height: 26px;
  background-color: inherit;

  :deep(.v-data-table-footer) {
    display: none;
  }
}
</style>
