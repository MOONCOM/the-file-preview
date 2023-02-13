<template>
  <div class="demo">
    <div class="operateList">
      <div v-for="(value,key) in fileLists" :key="key" @click="previewHandler(value)">{{key}}</div>
    </div>
    <div class="upload">
      要预览的本地文件： <input type="file" @change="uploadHandle"/>
    </div>
    <hr>
    <div class="preview-section">
      <filePreview :url="url" :file="file"/>
    </div>
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
.operateList >div{
  width:120px;
  height:40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  margin-right:10px;
  background-color: #0077aa;
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
