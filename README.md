# Vue 3 + TypeScript + Vite

本项目只作为个人知识沉淀积累，保存组件封装案例

Form/Table/Search组件的封装，有参考vue-element-plus-admin项目

gitee源码地址：https://gitee.com/mint_candy/mint-admin/tree/main/
github源码地址：https://github.com/xiaoxinhuang0227/mint-admin
在线预览地址：https://xiaoxinhuang0227.github.io/mint-admin/

## 核心组件说明

### Table

对 Element Plus 的 Table 组件二次封装, 提供了更便捷的配置方式和更多实用功能。

核心功能：
- 灵活的列配置，支持自定义列设置，注意columns 配置必须包含 field 字段作为数据的唯一标识
- 表格视图在列配置中格式化，使用JSX动态生成，并集成分页功能
- 配合 useTable hook 使用, 集成表格增删改查功能

### Form

对 Element Plus 的 Form 组件的封装,通过 schema 配置的方式简化了表单开发流程,并提供了更便捷的表单操作方法

核心功能：
- 支持多种表单组件及自定义组件，通过schema配置，简化表单开发流程
- useForm hook 提供表单常用操作方法


## 插件说明

### 核心依赖

1. **Vue 生态**
```
- vue: ^3.4.31 - Vue.js 3 核心框架
- vue-router: ^4.0.13 - Vue 官方路由
- pinia: ^2.2.0 - Vue 状态管理库
- pinia-plugin-persistedstate: ^3.2.1 - Pinia 数据持久化插件
```

2. **UI 框架**
```
- element-plus: ^2.7.8 - 基于 Vue 3 的组件库
- @element-plus/icons-vue: ^2.3.1 - Element Plus 的图标库
```

3. **功能增强**
```
- @vueuse/core: ^10.11.0 - Vue 组合式 API 工具集
- vue-draggable-plus: ^0.5.3 - 拖拽功能实现
- @vueup/vue-quill: ^1.2.0 - 富文本编辑器
```

4. **图表/地图**
```
- echarts: ^5.5.1 - 数据可视化图表库
- @vuemap/vue-amap: ^2.1.2 - 高德地图 Vue 组件
- three: 0.148.0 - 3D 图形库
```

### 开发工具

1. **构建工具**
```
- vite: ^5.3.4 - 现代前端构建工具
- typescript: ^5.5.4 - JavaScript 的超集
```

2. **Vite 插件**
```
- @vitejs/plugin-vue: ^5.0.5 - Vue 3 单文件组件支持
- @vitejs/plugin-vue-jsx: ^4.0.0 - JSX 语法支持
- unplugin-auto-import: ^0.18.2 - API 自动导入
- unplugin-vue-components: ^0.27.3 - 组件自动导入
- vite-plugin-mock: ^3.0.2 - 数据 mock 支持
```

3. **样式相关**
```
- sass: ^1.77.8 - CSS 预处理器
- unocss: ^0.61.9 - 原子化 CSS 引擎
```

4. **工具库**
```
- axios: ^1.7.3 - HTTP 请求库
- dayjs: ^1.11.12 - 日期处理库
- lodash-es: ^4.17.21 - 实用工具库
```

### 其他工具

```
- mockjs: ^1.1.0 - 生成模拟数据
- nprogress: ^0.2.0 - 进度条
- terser: ^5.31.6 - JavaScript 压缩工具
```

这些插件和工具共同构建了一个现代化的 Vue 3 + TypeScript 开发环境,支持组件库开发、数据可视化、地图应用等多种场景。