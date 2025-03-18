<template>
  <input
    type="number"
    :id="id"
    :value="modelValue"
    @input="emit('update:modelValue', parseFloat(($event.target as HTMLInputElement).value) || null)"
    class="w-full p-2 border rounded-10 focus:outline-none focus:ring-2 focus:ring-green-500 no-arrows placeholder-gray"
    :aria-label="ariaLabel"
    :disabled="isDisabled"
    :placeholder="placeholder"
  />
</template>

<script setup lang="ts">
export interface IInputNumberProps {
  modelValue: string;
  placeholder?: string;
  isDisabled?: boolean;
  id: string;
  ariaLabel?: string | undefined;
}

withDefaults(defineProps<IInputNumberProps>(), {
  modelValue: '',
  placeholder: '',
  isDisabled: false,
  ariaLabel: undefined,
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.no-arrows::-webkit-inner-spin-button,
.no-arrows::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-arrows {
  -moz-appearance: textfield;
}
</style>