<template>
  <div class="events-list">
    <TableComponent
      :items="eventsList"
      :headers="processedTableHeaders"
      :loading="isLoading"
      @deleteItem="onDeleteItem"
      @editStatus="onEditStatus"
      @sortItems="onSortItems"
    />
  </div>
</template>
<script setup lang="ts">
import TableComponent from "@/components/common/TableComponent.vue";

import { ref, reactive, onMounted, computed } from "vue";
import { useEventsStore } from "@/stores/events";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const tableHeaders = reactive([
  {
    text: "№",
    alias: "id",
  },
  {
    text: "Имя клиента",
    alias: "name",
  },
  {
    text: "Адрес",
    alias: "address",
  },
  {
    text: "Дата заказа",
    alias: "date",
  },
  {
    text: "Статус",
    alias: "statusName",
  },
  {
    text: "Комментарий",
    alias: "comment",
  },
  {
    text: "",
    alias: "actions",
  },
]);

const isLoading = ref(false);

const eventsStore = useEventsStore();
const { eventsList } = storeToRefs(eventsStore);
const { getAllEvents, deleteEvent, updateEvent } = eventsStore;

const authStore = useAuthStore();
const { isAdmin } = storeToRefs(authStore);

const processedTableHeaders = computed(() => {
  return isAdmin.value
    ? tableHeaders
    : tableHeaders.filter((item) => item.alias !== "actions");
});

const onSortItems = (type: string, alias: string) => {
  eventsList.value.sort((a, b) => {
    if (a[alias] > b[alias]) {
      return type === "asc" ? 1 : -1;
    } else if (a[alias] < b[alias]) {
      return type === "asc" ? -1 : 1;
    }
    return 0;
  });
};

const onDeleteItem = (id: number) => {
  deleteEvent(id).then(() => {
    getAllEvents();
  });
};

const onEditStatus = (id: number, status: string) => {
  updateEvent(id, {
    status: status,
  }).then(() => {
    getAllEvents();
  });
};

onMounted(() => {
  isLoading.value = true;
  getAllEvents().then(() => {
    isLoading.value = false;
  });
});
</script>
<style lang="scss" scoped>
.events-list {
  padding: 0 20px;
  width: 100%;
}
</style>
