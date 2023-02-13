<template>
  <div class="wrap">
    <div class="excel-container" ref="docxContainer" v-html="excelData"></div>
  </div>
</template>

<script>
import { utils, read } from 'xlsx';

export default {
  name: 'excel-preview',
  props: {
    url: {
      required: true,
      type: String,
      default: '',
    },
  },
  data() {
    return {
      excelData: null,
    };
  },
  watch: {
    url: {
      immediate: true,
      handler: 'render'
    },
  },
  methods: {
    async render() {
      const f = await fetch(this.url);
      const ab = await f.arrayBuffer();
      const wb = read(ab);
      this.excelData = utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);
    },
  },
};
</script>

<style scoped>
  .excel-container /deep/td {
    min-width: 50px;
    height: 30px;
    outline: 0.02667rem solid #999;
  }
</style>
