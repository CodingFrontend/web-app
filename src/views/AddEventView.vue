<template>
  <HeaderBar />
  <main class="event-page">
    <AddEventForm />
  </main>
</template>

<script setup lang="ts">
import AddEventForm from "@/components/AddEventForm.vue";
import HeaderBar from "@/components/HeaderBar.vue";
</script>

<style lang="scss">
.event-page {
  padding: 75px 40px;

  background-color: #f5f5f5;
}
</style>
