<script setup>
import RichText from '@/components/RichText/index.vue';

const textContent = ref();
const editorRef = ref();
const editorHtml = ref();

const getEditorVal = () => {
  editorHtml.value = editorRef.value.getHtmlVal();
}
</script>

<template>
<div class="page-rich-text">
  <RichText ref="editorRef" :value="textContent"></RichText>
  <div class="flex-center">
    <ElButton class="m-5 w100" type="primary" @click="getEditorVal">获取HTML内容</ElButton>
  </div>

  <ElInput :value="editorHtml" type="textarea" :rows="10"></ElInput>
</div>
</template>