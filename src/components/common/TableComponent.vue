<template>
  <table class="table">
    <thead class="table__head">
      <tr>
        <th
          v-for="(headCell, headerIndex) in headers"
          :key="headerIndex"
          class="table__head-cell"
          :class="{
            'table__head-cell--sortable': enableSort(headCell),
            'table__head-cell--sorted': headCell.alias === currentAlias,
            'table__head-cell--sorted-asc':
              headCell.alias === currentAlias && currentSortedType === 'asc',
          }"
          v-on="
            enableSort(headCell)
              ? { click: () => onSortBy(headCell.alias) }
              : {}
          "
        >
          {{ headCell.text }}
          <FontAwesomeIcon
            v-if="enableSort(headCell)"
            icon="fa-solid fa-arrow-down"
            class="table__head-cell-icon"
          />
        </th>
      </tr>
    </thead>
    <tbody class="table__body">
      <template v-if="items.length">
        <tr
          class="table__body-row"
          v-for="(row, rowIndex) in items"
          :key="rowIndex"
        >
          <td
            v-for="(headCell, headerIndex) in headers"
            :key="headerIndex"
            class="table__body-cell"
            :class="{
              'table__body-cell--completed': row.status === 'completed',
            }"
          >
            <div v-if="headCell.alias === 'actions'" class="table__buttons">
              <button
                v-if="row.status !== 'completed'"
                class="table__button-update"
                @click="onOpenEditStatus(row)"
              >
                <FontAwesomeIcon icon="pencil" />
              </button>

              <button
                class="table__button-delete"
                @click="onOpenConfirmModal(row.id)"
              >
                <FontAwesomeIcon icon="trash" />
              </button>
            </div>
            {{ row[headCell.alias] }}
          </td>
        </tr>
      </template>
      <tr v-else-if="loading" class="table__empty-row">
        <td class="table__empty-cell" :colspan="headers.length">Загрузка...</td>
      </tr>
      <tr v-else class="table__empty-row">
        <td class="table__empty-cell" :colspan="headers.length">
          Результатов не найдено
        </td>
      </tr>
    </tbody>
  </table>
  <ModalComponent
    class="table-modal"
    modalTitle="Удаление заказа"
    :show="showConfirmModal"
    @closeModal="onCancelDeleteItem"
  >
    <template #body>
      <div class="table-modal__content">
        Вы действительно хотите удалить заказ?
      </div>
    </template>
    <template #footer>
      <div class="table-modal__actions">
        <ButtonComponent
          text="Ок"
          class="table-modal__button"
          @click="onConfirmDeleteItem"
        />
        <ButtonComponent
          text="Отмена"
          class="table-modal__button"
          @click="onCancelDeleteItem"
        />
      </div>
    </template>
  </ModalComponent>
  <ModalComponent
    class="table-modal"
    modalTitle="Редактирование статуса"
    :show="showEditStatusModal"
    @closeModal="onCancelEditStatus"
  >
    <template #body>
      <p class="table-modal__select-label">Выберите статус:</p>
      <select class="table-modal__select" v-model="selectedStatus" required>
        <option
          v-for="(status, index) in statusList"
          :key="index"
          :value="status.value"
        >
          {{ status.name }}
        </option>
      </select>
    </template>
    <template #footer>
      <div class="table-modal__actions">
        <ButtonComponent
          text="Сохранить"
          class="table-modal__button"
          @click="onConfirmEditStatus"
        />
        <ButtonComponent
          text="Отмена"
          class="table-modal__button"
          @click="onCancelEditStatus"
        />
      </div>
    </template>
  </ModalComponent>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

import { useNotification } from "@kyvg/vue3-notification";

import ModalComponent from "@/components/common/ModalComponent.vue";
import ButtonComponent from "@/components/common/ButtonComponent.vue";

import type { EventTypes } from "@/types/EventTypes";

const { notify } = useNotification();

const emit = defineEmits<{
  (e: "deleteItem", id: number): void;
  (e: "editStatus", id: number, status: string): void;
  (e: "sortItems", type: string, alias: string): void;
}>();

interface HeaderTypes {
  text?: string;
  alias: string;
}

interface Props {
  headers: HeaderTypes[];
  items: EventTypes[];
  loading: boolean;
}

defineProps<Props>();

// modals functionality
const showConfirmModal = ref(false);
const currentItemId = ref();

const onOpenConfirmModal = (id: number) => {
  showConfirmModal.value = true;
  currentItemId.value = id;
};

const onConfirmDeleteItem = () => {
  const item = currentItemId.value;
  emit("deleteItem", item);
  showConfirmModal.value = false;
};

const onCancelDeleteItem = () => {
  showConfirmModal.value = false;
};

const showEditStatusModal = ref(false);
const selectedStatus = ref("");
const statusList = reactive([
  {
    name: "Выполнен",
    value: "completed",
  },
]);

const onOpenEditStatus = (item: EventTypes) => {
  showEditStatusModal.value = true;
  currentItemId.value = item.id;
};

const onCancelEditStatus = () => {
  showEditStatusModal.value = false;
};

const onConfirmEditStatus = () => {
  if (!selectedStatus.value) {
    notify({
      title: "Ошибка!",
      text: "Выберите статус",
      type: "error",
      duration: 3000,
    });
    return;
  } else {
    emit("editStatus", currentItemId.value, selectedStatus.value);
    showEditStatusModal.value = false;
  }
};

// Sort table
const currentSortedType = ref("");
const currentAlias = ref("");

const enableSort = (headCell: HeaderTypes) => {
  return headCell.alias === "address" || headCell.alias === "date";
};

const onSortBy = (alias: string) => {
  if (!alias) return;
  if (alias !== currentAlias.value) {
    currentSortedType.value = "desc";
    currentAlias.value = alias;
  } else {
    currentSortedType.value =
      currentSortedType.value === "asc" ? "desc" : "asc";
  }
  emit("sortItems", currentSortedType.value, currentAlias.value);
};
</script>

<style lang="scss">
.table {
  background-color: #d9d9d9;
  border: 1px solid #000000;
  width: 100%;
}

.table__head {
  height: 35px;
}
.table__head-cell-icon {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}
.table__head-cell {
  padding: 0 5px;
  font-weight: 500;
  text-align: center;
  border-right: 1px solid #000000;
  &:first-child,
  &:last-child {
    border-left: 1px solid #000000;
  }

  &--sortable {
    cursor: pointer;
    &:hover {
      .table__head-cell-icon {
        opacity: 1;
        visibility: visible;
      }
    }
  }
}

.table__head-cell--sorted .table__head-cell-icon {
  visibility: visible;
  opacity: 1;
}

.table__head-cell--sorted-asc .table__head-cell-icon {
  transform: rotate(180deg);
}

.table__body-cell {
  padding: 12px 5px;
  word-break: break-word;
  border: 1px solid #000000;
  text-align: center;
  &--completed {
    opacity: 0.5;
  }
}

.table__empty-row {
  text-align: center;
  border-top: 1px solid #000000;

  font-size: 20px;
}

.table__empty-cell {
  padding: 20px;
}

.table__buttons {
  display: inline-flex;
}

.table__button-update {
  border: none;
  background-color: transparent;
  cursor: pointer;

  color: #242121d1;
}

.table__button-delete {
  border: none;
  background-color: transparent;
  cursor: pointer;

  color: #242121d1;
}

.table-modal {
  .modal__content {
    width: 335px;
    height: 215px;
  }
}

.table-modal__actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.table-modal__content {
  margin-bottom: 50px;
  text-align: center;
}

.table-modal__button {
  width: 100px;
  height: 27px;
}

.table-modal__select-label {
  margin-bottom: 15px;
  font-size: 14px;
}

.table-modal__select {
  margin-bottom: 30px;
  width: 100%;
  height: 25px;

  cursor: pointer;
}
</style>
