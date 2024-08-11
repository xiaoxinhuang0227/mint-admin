<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from "@/store/modules/permission"; 
import { FormSchema, Form } from '@/components/Form';
import { useValidator } from '@/hooks/useValidator';
import { useForm } from '@/hooks/useForm';
import AuthAPI, { LoginData } from "@/api/auth.ts";
import { storeToRefs } from "pinia";

const { required } = useValidator();
const { formRegister, formMethods } = useForm();
const { getFormData, getElFormExpose } = formMethods;
const { updateUserInfo } = useUserStore();
const { generateRoutes, setIsAddRoutes } = usePermissionStore();
const { getAsyncRouters } = storeToRefs(usePermissionStore());
const { push } = useRouter();

const login = async () => {
  const formRef = await getElFormExpose()
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      const formData = await getFormData()

      try {
        const res = await AuthAPI.login(formData);
        updateUserInfo(res);
        await generateRoutes(res.permission);
        setIsAddRoutes(true);
        push({ name: getAsyncRouters.value[0].name });
      } catch (error) {
        console.log(error)
      }
    }
  })
}

const schema = reactive<FormSchema[]>([
  {
    field: 'username',
    label: '用户名',
    value: 'admin',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: '请输入用户名'
    }
  },
  {
    field: 'password',
    label: '密码',
    value: 'admin',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      placeholder: '请输入密码'
    }
  },
]);

const formRules = {
  username: [required()],
  password: [required()]
}

</script>

<template>
  <div class="page-login">
    <div class="mask"></div>
    <div class="login-wrap">
      <h1>Mint Admin</h1>
      <Form :schema="schema" @register="formRegister" :rules="formRules"></Form>
      <el-button @click="login" type="primary" class="mt-10 login-btn">登 录</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-login {
  height: 100vh;
  background-image: url('@/assets/login-bg.jpg');
  background-size: cover;
  color: #000;
  .mask {
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
  }
  .login-wrap {
    width: 350px;
    position: absolute;
    padding: 10px 30px 50px;
    top: 50%;
    right: 20%;
    transform: translateY(-50%);
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    .login-btn {
      padding: 20px;
      width: 100%;
      font-size: 20px;
    }
  }
}
</style>