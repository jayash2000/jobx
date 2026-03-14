<template>
  <UFormField :label="label" :name="name" class="w-full">
    <UInput
      :type="
        type === 'password' ? (show ? 'text' : 'password') : (type ?? 'text')
      "
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
      class="w-full shadow-sm mt-1 text-sm sm:text-base"
    >
      <template v-if="type === 'password'" #trailing>
        <UButton
          type="button"
          color="neutral"
          variant="link"
          size="sm"
          :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="show ? 'Hide password' : 'Show password'"
          @click="show = !show"
          class="cursor-pointer"
        ></UButton>
      </template>
    </UInput>
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

const show = ref(false);
</script>
