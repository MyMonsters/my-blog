<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="`${props.color || '#333'} `" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  color: { type: String, required: false },
  name: String
})

const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style scoped></style>
