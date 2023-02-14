<template>
  <div class="demo">
    <fieldset>
      <legend>预览线上文件</legend>
      <div class="operateList">
        <div v-for="(value,key) in fileLists" :key="key" :class="{'selected':value === url}" @click="previewHandler(value)">{{key}}</div>
      </div>
    </fieldset>
    <fieldset>
      <legend>预览本地文件</legend>
      <div class="upload">
        选择要预览的本地文件： <input type="file" @change="uploadHandle"/>
      </div>
    </fieldset>
    <fieldset>
      <legend>预览内容展示</legend>
      <div class="preview-section">
        <filePreview :url="url" :file="file"/>
      </div>
    </fieldset>
  </div>
</template>

<script>
import filePreview from '@/views/filePreview.vue';
import fileLists from './testURL';

export default {
  name: 'Demo',
  data() {
    return {
      fileLists,
      url: fileLists.excelURL,
      file: null,
    };
  },
  components: {
    filePreview,
  },
  methods: {
    previewHandler(url) {
      console.log(url);
      this.url = url;
    },
    uploadHandle(data){
      this.file = data.target.files[0];
    },
  },
};
</script>

<style scoped>
.demo{
  margin:0 40px;
}
.operateList{
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 50px;
}
.upload{
  width:1200px;
  margin:0 auto 20px;
}
.operateList .selected{
  background-color: #0077aa;
}
.operateList >div{
  width:120px;
  height:40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  margin-right:10px;
  background-color: #52c1ef;
  color:white;
}
.preview-section{
  width:1200px;
  height:500px;
  margin:0 auto;
  padding:10px;
  overflow-y:auto;
  border:1px solid #999;
}
</style>
