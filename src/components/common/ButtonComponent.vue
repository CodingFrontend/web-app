<template>
  <button :type="type" class="button-text">
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
interface Props {
  text: string;
  type?: string;
}

withDefaults(defineProps<Props>(), {
  type: "text",
});
</script>

<style lang="scss">
.button-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  background-color: #d9d9d9;

  font-size: 12px;

  cursor: pointer;
}
</style>
