# preview-vue

## 安装
```
npm i the-file-preview
```

## 描述
实现了对线上文件和本地上传文件的预览

## 参数选项
| 参数    | 类型  | 描述 |
|-------|-----|----|
| url   | String | 线上文件的url |
| file  | File | 本地的上传文件 |

## 示例
点击查看 [线上演示](https://mooncom.github.io/file-preview/demo/).

## 使用
main.js 中注册全局组件
```
const FilePreview = require('file-preview');
Vue.component('FilePreview',FilePreview);
```
1. 当使用线上url预览时
```
<template>
    <filePreview :url="url"/>
</template>
```
2. 当预览本地文件时
``` 
<template>
    <div class="upload">
      要上传的文件： <input type="file" @change="uploadHandle"/>
    </div>
    <filePreview :file="file"/>
</template>

export default {
  name: 'Demo',
  data() {
    return {
      file: null,
    };
  },
  methods: {
    uploadHandle(data){
      this.file = data.target.files[0];
    },
  },
};
```



