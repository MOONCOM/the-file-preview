<!--
  功能：移动端文件预览功能
       支持文本、图片、pdf、ppt、word、excel、视频、音频文件的在线预览
  使用：该组件作为一个单独的页面，点击业务页面预览按钮，跳转到预览界面进行预览，暂不支持弹窗预览功能
  传参：使用query形式进行地址栏传参，数据结构如下
      {
        url: string,      必填  要预览文件的地址
        title: string,    选填  设置预览页面的tab名称
      }
  注意：IOS端可以实现完美预览，但是Android端pdf、ppt、word、excel会下载到本地后，用本地的软件打开
-->
<template>
  <div class="file-preview">
    <component :is="showPreviewComponent" :class="setClass" :url="previewFileUrl"></component>
  </div>
</template>
<script>
import txtPreview from '@/components/txtPreview.vue';
import excelPreview from '@/components/excelPreview.vue';
import pdfPreview from '@/components/pdfPreview.vue';
import wordPreview from '@/components/wordPreview.vue';
import imagePreview from '@/components/imagePreview.vue';
import audioPreview from '@/components/audioPreview.vue';
import videoPreview from '@/components/videoPreview.vue';
import otherPreview from '@/components/otherPreview.vue';

export default {
  name: 'file-preview',
  props: {
    url: {
      type: String,
      default: '',
    },
    file: {
      type: [Object,File],
      default(){
        return {};
      },
    },
  },
  watch: {
    url: {
      immediate: true,
      handler: 'urlChangeHandle',
    },
    file: {
      handler: 'fileChangeHandle',
    },
  },
  data() {
    return {
      // 预览使用的组件名称
      showPreviewComponent: '',
      // 预览文件的地址
      previewFileUrl: '',
    };
  },
  computed: {
    // 当预览的文件类型为audio,video时，class取half
    setClass() {
      return ['audio', 'video'].includes(this.showPreviewComponent) ? 'half' : 'full';
    },
  },
  components: {
    txtPreview,
    wordPreview,
    pdfPreview,
    excelPreview,
    imagePreview,
    videoPreview,
    audioPreview,
    otherPreview,
  },
  methods:{
    urlChangeHandle(url){
      this.previewFileUrl = url;
      this.operateData(url);
    },
    fileChangeHandle(fileObj){
      // console.log(fileObj);
      let url = '';
      if (window.createObjcectURL != undefined) {
        url = window.createOjcectURL(fileObj);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(fileObj);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(fileObj);
      }
      this.previewFileUrl = url;
      this.operateData(fileObj.name);
    },
    // 根据文件类型选择预览的组件
    operateData(data){
      const TYPE_JSON = {
        image: 'jpeg,bmp,jpg,png,tif,gif,svg,wmf,webp',
        video: 'mp4,webm,ogg,m4v',
        audio: 'mp3,wav,flac',
        txt: 'txt',
        excel: 'xls,xlsx',
        word: 'doc,docx',
        // ppt: 'ppt,pptx',
        pdf: 'pdf',
      };
      // 获取文件类型
      const suffix = data
        .split('.')
        .reverse()[0]
        .toLowerCase();
      // 判断当前文件类型适合哪个模板
      for (const key in TYPE_JSON) {
        if (Object.hasOwn(TYPE_JSON, key) && TYPE_JSON[key].includes(suffix)) {
          this.showPreviewComponent = `${key}Preview`;
          return;
        }
      }
      this.showPreviewComponent = 'otherPreview';
    },
  },
};
</script>
<style scoped>
.file-preview {
  position: relative;
  width: 100%;
  height: 100%;
}
.file-preview > .full {
  position: absolute;
  height: 100%;
  width: 100%;
}
.file-preview > .half {
  position: absolute;
  width: 100%;
  height: 94%;
}
</style>
