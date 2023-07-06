<template>
  <div>
    <Header />
    <router-view class="Authcenter" />
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
</script>

<style lang="scss" scoped>
.Authcenter {
  min-height: 800px;
  height: 90vh;
}
</style>
