<template>
  <div class="input">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      autocomplete="false"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: any;
  type?: string;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  type: "text",
});
</script>

<style lang="scss" scoped>
.input {
  input {
    height: 34px;
    width: 100%;
    padding: 5px 8px;
  }
}
</style>
