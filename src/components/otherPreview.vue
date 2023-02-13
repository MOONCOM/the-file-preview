<template>
  <div class="wrap">
    <p>已下载，请使用本地工具查看</p>
  </div>
</template>

<script>
export default {
  name: 'otherPreview',
  props: {
    url: {
      required: true,
      type: String,
      default: '',
    },
  },
  watch: {
    url: {
      immediate: true,
      handler: 'download',
    },
  },
  methods: {
    download() {
      window.open(this.url);
    },
  },
};
</script>

<style scoped>
  p{
    position: absolute;
    width: 100%;
    top:40%;
    text-align: center;
  }
</style>
