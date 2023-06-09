<template>
  <div>
    <div class="checkbox-wrapper-2 flex items-center">
      <input type="checkbox" class="sc-gJwTLC ikxBAC" @click="handleswitchDark" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/modules/setting'
import { computed } from 'vue'
const settingStore = useSettingStore()
const isDark: any = computed(() => settingStore.isDark)
const handleswitchDark = () => {
  let html = document.querySelector('html')
  if (!isDark.value) {
    html?.setAttribute('data-theme', 'dark')
  } else {
    html?.setAttribute('data-theme', '')
  }
  settingStore.setIsDark(!isDark.value)
  console.log(isDark.value)
}
</script>

<style scoped>
.checkbox-wrapper-2 {
  height: 64px;
}
.checkbox-wrapper-2 .ikxBAC {
  appearance: none;
  background-color: #6e79d6;
  /* background-color: #dfe1e4; */
  border-radius: 72px;
  border-style: none;
  flex-shrink: 0;
  height: 20px;
  margin: 0;
  position: relative;
  width: 30px;
}

.checkbox-wrapper-2 .ikxBAC::before {
  bottom: -6px;
  content: '';
  left: -6px;
  position: absolute;
  right: -6px;
  top: -6px;
}

.checkbox-wrapper-2 .ikxBAC,
.checkbox-wrapper-2 .ikxBAC::after {
  transition: all 100ms ease-out;
}

.checkbox-wrapper-2 .ikxBAC::after {
  background-color: #fff;
  border-radius: 50%;
  content: '';
  height: 14px;
  left: 3px;
  position: absolute;
  top: 3px;
  width: 14px;
}

.checkbox-wrapper-2 input[type='checkbox'] {
  cursor: default;
}

.checkbox-wrapper-2 .ikxBAC:hover {
  /* background-color: #c9cbcd; */
  background-color: #535db3;
  transition-duration: 0s;
}

.checkbox-wrapper-2 .ikxBAC:checked {
  background-color: #c9cbcd;
  /* background-color: #6e79d6; */
}

.checkbox-wrapper-2 .ikxBAC:checked::after {
  background-color: #fff;
  left: 13px;
}

.checkbox-wrapper-2 :focus:not(.focus-visible) {
  outline: 0;
}

.checkbox-wrapper-2 .ikxBAC:checked:hover {
  /* background-color: #535db3; */
  background-color: #c9cbcd;
}
</style>
