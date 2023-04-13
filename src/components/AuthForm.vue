<template>
  <form @submit.prevent="onSubmit" class="auth-form">
    <div class="auth-form__title">Авторизация</div>
    <div class="auth-form__fields">
      <InputComponent
        class="auth-form-field"
        placeholder="Имя пользователя"
        v-model:modelValue="form.user"
      />
      <InputComponent
        class="auth-form-field"
        placeholder="Пароль"
        type="password"
        v-model:modelValue="form.password"
      />
    </div>
    <ButtonComponent text="Войти" type="submit" class="auth-form-button" />
  </form>
</template>
<script setup lang="ts">
import { reactive } from "vue";

import { useAuthStore } from "@/stores/auth";
import { useNotification } from "@kyvg/vue3-notification";

import InputComponent from "@/components/common/InputComponent.vue";
import ButtonComponent from "@/components/common/ButtonComponent.vue";

const authStore = useAuthStore();
const { notify } = useNotification();

interface MandatoryField {
  key: string;
  label: string;
}

const form = reactive({
  user: null,
  password: null,
});

const validateForm = (form: any, mandatoryFields: MandatoryField[]) => {
  const emptyField = mandatoryFields.filter((item) => {
    return !form[item.key];
  });
  const passwordField = mandatoryFields.find((item) => item.key === "password");

  let message = null;
  if (emptyField.length) {
    message = `Не заполнены обязательные поля: ${emptyField
      .map((item) => item.label)
      .join(", ")}`;
  } else if (form[passwordField.key].length < 8) {
    message = "Пароль должен содержать не менее 8 символов";
  }
  return message;
};

const onSubmit = () => {
  // Валидация
  const mandatoryFields = [
    { key: "user", label: "Имя пользователя" },
    { key: "password", label: "Пароль" },
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
    authStore.login(form);
  }
};
</script>

<style lang="scss" scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 22px 40px;

  width: 344px;
  height: 245px;

  background-color: #d9d9d9;
}

.auth-form__title {
  margin-bottom: 30px;
  font-size: 21px;
  font-weight: 500;
}

.auth-form__fields {
  margin-bottom: 37px;
}

.auth-form-field {
  margin-bottom: 21px;
  &:last-of-type {
    margin: 0;
  }
}

.auth-form-button {
  background-color: #fff;
  width: 104px;
  height: 29px;
}
</style>
