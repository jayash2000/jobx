<template>
  <UFormField :label="label" :name="name">
    <UInput
      :type="type ?? 'text'"
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
      class="w-full shadow mt-1"
    />
  </UFormField>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  name: string;
  modelValue: string;
  type: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>
