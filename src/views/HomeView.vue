<template>
  <HeaderBar />
  <main class="home-page">
    <EventsList />
  </main>
</template>

<script setup lang="ts">
import EventsList from "@/components/EventsList.vue";
import HeaderBar from "@/components/HeaderBar.vue";
</script>

<style lang="scss">
.home-page {
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 75px 0px;
}
</style>
