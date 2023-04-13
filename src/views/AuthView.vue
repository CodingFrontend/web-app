<template>
  <main class="auth-view">
    <AuthForm />
  </main>
</template>

<script setup lang="ts">
import AuthForm from "@/components/AuthForm.vue";
</script>
<style lang="scss" scoped>
.auth-view {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
