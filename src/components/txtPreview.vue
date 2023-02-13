/**
 * @Description: txt文本预览
 * @author: xuyong
 * @date: 2023/2/10
*/
<template>
  <div class="wrap">
    <pre class="txt-container" ref="txtContainer">{{ textMessage }}</pre>
  </div>
</template>

<script>
export default {
  name: 'txt-preview',
  props: {
    url: {
      required: true,
      type: String,
      default: '',
    },
  },
  data() {
    return {
      textMessage: '',
    };
  },
  watch: {
    url: {
      immediate: true,
      handler: 'getTxtMessage'
    },
  },
  methods: {
    // 获取txt格式文件的数据
    getTxtMessage() {
      fetch(this.url)
        .then((res) => res.text())
        .then((data) => {
          this.textMessage = data;
        });
    },
  },
};
</script>
