<template>
  <select
    :id="id"
    :value="modelValue"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    class="w-full p-2 border rounded-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
    aria-label="ariaLabel"
  >
    <option v-for="option in options" :key="option.code" :value="option.code">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
export interface IOption {
  code: string;
  name: string;
}

export interface ISelectorProps {
  id?: string;
  modelValue?: string;
  options?: IOption[];
  ariaLabel?: string | undefined;
}

withDefaults(defineProps<ISelectorProps>(), {
  modelValue: '',
  placeholder: '',
  ariaLabel: undefined,
});

const emit = defineEmits(["update:modelValue"]);
</script>
