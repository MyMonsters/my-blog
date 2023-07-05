<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="`${props.color || '#333'} `" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    prefix: string
    name: string
    color: string
  }>(),
  { prefix: 'icon' }
)
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped></style>
