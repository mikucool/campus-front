<template>
  <div id="vditor" name="description"></div>
</template>
<script>
import Vditor from "vditor";
import "vditor/dist/index.css";
export default {
  data() {
    return {
      contentEditor: "",
      inputMsg: "",
    };
  },

  created() {},
  mounted() {
    let _this = this;
    _this.contentEditor = new Vditor("vditor", {
      height: 450,
      width: 800,
      placeholder: "此处为提示信息",
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },

      //这里写上传
      upload: {
        accept: "image/*",
        url: "http://localhost:8081/post/fileUpload",
        filename(name) {
          return name
              .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "")
              .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "")
              .replace("/\\s/g", "");
        },
        linkToImgCallback() {
          console.log("api处理");
        },
        success(editor, msg) {
          let responseData = JSON.parse(msg);
          //此处后台返回一个上传保存的url地址，此时编辑器应该将该地址插入到文本中，，，
          console.log(responseData.url);
          let imgMsg = "![image](" + responseData.url + ")";
          _this.inputMsg = "![image](" + responseData.url + ")";
          _this.contentEditor.insertValue(imgMsg, true);
          return true;
        },
        error(msg) {
          console.log(msg + "上传失败了");
        },
      },
      value: this.inputMsg,
    });
  },

  methods: {
    insertValue() {
      this.inputMsg = "插入";
      this.contentEditor.getValue();
    },
  },
};
</script>