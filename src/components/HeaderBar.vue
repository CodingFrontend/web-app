<template>
  <header class="header">
    <nav class="header__links">
      <router-link class="header-link" :to="{ name: 'home' }"
        >Все заказы</router-link
      >
      <router-link class="header-link" :to="{ name: 'addEvent' }"
        >Добавить заказ</router-link
      >
    </nav>
    <div class="header__actions">
      <div class="header-user">{{ userName }}</div>
      <ButtonComponent
        text="Выйти"
        class="header-auth-button"
        @click="onLogout"
      />
    </div>
  </header>
</template>
<script setup lang="ts">
import ButtonComponent from "@/components/common/ButtonComponent.vue";

import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();

const { userName } = storeToRefs(authStore);
const { logout } = authStore;

const onLogout = () => {
  logout();
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  height: 52px;
  width: 100%;

  padding: 12px 22px;

  background-color: #165996;
}

.header__actions {
  display: flex;
  align-items: center;
}

.header-user {
  margin-right: 28px;
  color: #000;
  font-size: 14px;
  font-weight: 500;
}

.header-auth-button {
  height: 27px;
  width: 78px;
}

.header-link {
  color: #ffffff;
  margin-right: 38px;
  text-decoration: none;
  &:hover {
    background-color: transparent;
    text-decoration: underline;
  }
}
</style>
