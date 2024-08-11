<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容'
  }
})

const quillEditor = ref();
const content = ref();

watch(
  () => props.value,
  (newValue) => {
    quillEditor.value.setText(newValue);
  }
)

const getHtmlVal = () => {
  return quillEditor.value.getHTML();
}

const options = reactive({
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['image'],
    ],
  },
  theme: 'snow',
  placeholder: props.placeholder,
});

const readyQuill = () => {
  console.log('Quill准备好了', quillEditor.value);
}

defineExpose({
  getHtmlVal
});
</script>

<template>
  <QuillEditor
    ref="quillEditor"
    :options="options"
    v-model="content"
    style="height: 350px"
    @ready="readyQuill"
    class="quillEditor"
  />
  <div>{{ content }}</div>
</template>