<template>
  <form @submit.prevent="onAddEvent" class="add-event">
    <div class="add-event__title">Добавить заказ</div>
    <div class="add-event__fields">
      <InputComponent
        class="add-event-field"
        placeholder="Введите ваше имя"
        v-model:modelValue="form.name"
      />
      <InputComponent
        class="add-event-field"
        placeholder="Введите ваш адрес"
        v-model:modelValue="form.address"
      />
      <InputComponent
        class="add-event-field"
        placeholder="Комментарий"
        v-model:modelValue="form.comment"
      />
    </div>
    <ButtonComponent
      text="Добавить заказ"
      type="submit"
      class="add-event-button"
    />
  </form>
</template>
<script setup lang="ts">
import { reactive } from "vue";

import router from "@/router";
import moment from "moment";
import "moment/dist/locale/ru";

import { useNotification } from "@kyvg/vue3-notification";

import { useEventsStore } from "@/stores/events";
import { useAuthStore } from "@/stores/auth";

import { storeToRefs } from "pinia";

import InputComponent from "@/components/common/InputComponent.vue";
import ButtonComponent from "@/components/common/ButtonComponent.vue";

const eventsStore = useEventsStore();
const { notify } = useNotification();
const authStore = useAuthStore();

const { userName } = storeToRefs(authStore);

interface MandatoryField {
  key: string;
  label: string;
}

const form = reactive({
  name: userName,
  address: null,
  date: moment(new Date()).locale("ru").format("DD MMMM YYYY"),
  status: "new",
  comment: null,
});

const validateForm = (form: any, mandatoryFields: MandatoryField[]) => {
  const emptyField = mandatoryFields.filter((item) => {
    return !form[item.key];
  });

  let message = null;
  if (emptyField.length) {
    message = `Не заполнены обязательные поля: ${emptyField
      .map((item) => item.label)
      .join(", ")}`;
  }
  return message;
};

const onAddEvent = () => {
  // Валидация
  const mandatoryFields = [
    { key: "name", label: "Имя пользователя" },
    { key: "address", label: "Адрес" },
  ];
  const header = validateForm(form, mandatoryFields);

  if (header) {
    notify({
      title: "Ошибка!",
      text: header,
      type: "error",
      duration: 3000,
    });
    return;
  } else {
    eventsStore.addEvent(form).then(() => {
      router.push("/");
    });
  }
};
</script>

<style lang="scss" scoped>
.add-event {
  width: 300px;
}

.add-event__title {
  margin-bottom: 30px;
  font-size: 21px;
  font-weight: 500;
}

.add-event__fields {
  margin-bottom: 37px;
}

.add-event-field {
  margin-bottom: 21px;
  border: 1px solid lightgray;
  &:last-of-type {
    margin: 0;
  }
}

.add-event-button {
  background-color: #d9d9d9;
  width: 104px;
  height: 29px;
}
</style>
