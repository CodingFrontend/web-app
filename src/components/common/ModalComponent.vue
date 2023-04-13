<template>
  <div class="modal-backdrop" v-show="show">
    <div class="modal">
      <div class="modal__content">
        <button class="modal__button-close" @click="$emit('closeModal')">
          Close
        </button>
        <slot name="header">
          <h3 v-if="modalTitle" class="modal__title">{{ modalTitle }}</h3>
        </slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modalTitle?: string;
  show: boolean;
}

withDefaults(defineProps<Props>(), {
  modalTitle: "",
});
</script>

<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;

  display: flex;
  flex-direction: column;

  background: rgba(0, 0, 0, 0.5);

  overflow-y: auto;
}

.modal {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 33.75rem;
  margin: 2rem auto;
}

.modal__content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;

  padding: 20px 30px;
  background: #f5f5f5;
}

.modal__button-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;

  width: 1.25rem;
  height: 1.25rem;

  font-size: 0;

  border: none;
  background: none;
  cursor: pointer;

  transform: rotate(45deg);

  &:before,
  &:after {
    content: "";

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: block;
    margin: auto;

    background: #dadada;

    transition: background 0.3s;
  }

  &:before {
    width: 2px;
    height: 100%;
  }

  &:after {
    width: 100%;
    height: 2px;
  }

  &:hover::before,
  &:hover::after {
    background: #989898;
  }
}

.modal__title {
  margin-bottom: 30px;

  font-size: 20px;
  text-align: center;
}
</style>
