<template>
  <div>
    <!-- 上传对话框 -->
    <el-dialog
      title="上传中..."
      :visible.sync="dialogOfUpload"
      width="35%"
      style="text-align: center"
    >
      <el-upload
        class="upload-demo"
        action="#"
        drag
        multiple
        :headers="headers"
        :auto-upload="true"
        :file-list="fileList"
        :on-change="handleChange"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传Excel格式文件</div>
      </el-upload>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOfUpload = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpload()">上 传</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      dialogOfUpload: true,
      fileList: [],
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  },

  methods: {
    handleChange(file, fileList) {
      //文件数量改变
      this.fileList = fileList;
    },

    confirmUpload() {
      //确认上传
      var param = new FormData();
      this.fileList.forEach((val, index) => {
        param.append("file", val.raw);
      });

      axios.post("/message/uploadFile", param).then((responce) => {});

      this.$message({
        message: "上传成功！",
        duration: 1000,
      });
    },
  },
};
</script>

<style>
</style>