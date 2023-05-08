<template>
  <div>
    <MdEditor
      :editorId="state.id"
      v-model="props.content"
      :previewTheme="state.theme"
      :previewOnly="props.previewOnly"
      :toolbarsExclude="Exclude"
      class="myEditor"
    />
    <!-- <MdCatalog
			:editorId="state.id"
			:scrollElement="scrollElement"
			:theme="state.theme"
		/> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const props = defineProps({
  previewOnly: {
    type: Boolean,
    default: false
  },
  content: {
    typr: String,
    default: false
  }
})
const Exclude = ['github']
const state = reactive({
  id: 'article',
  theme: 'smart-blue',
  catalogList: []
})
</script>

<style lang="css" scoped>
.md-editor {
  text-align: left;
}
.content-container {
  text-align: left;
}

.myEditor {
  text-align: left;
}
</style>
