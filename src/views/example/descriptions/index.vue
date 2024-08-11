<script setup lang="tsx">
import { Descriptions, DescriptionsSchema } from '@/components/Description/index.ts';
import { reactive, shallowReactive } from 'vue'
import Guide from './components/descGuide.vue';

const data = reactive({
  username: 'mint',
  nickName: '薄荷糖',
  age: 26,
  phone: '13655971xxxx',
  email: '502431556@qq.com',
  addr: '地址地址地址地址地址地址地址地址地址地址地址地址地址地址',
  sex: '男',
  certy: '3505831994xxxxxxxx'
})

const schema = shallowReactive<DescriptionsSchema[]>([
  {
    field: 'username',
    label: '用户名',
  },
  {
    field: 'nickName',
    label: '昵称',
  },
  {
    field: 'phone',
    label: '手机号'
  },
  {
    field: 'email',
    label: '邮箱'
  },
  {
    field: 'addr',
    label: '地址',
    span: 24
  }
])

</script>

<template>
  <div>
    <Descriptions
      class="m-10"
      title="描述组件"
      message="基于<el-descriptions>二次封装"
      :data="data"
      :schema="schema"
    />
    <Guide></Guide>
  </div>
</template>

<style lang="sass" scoped>

</style>
