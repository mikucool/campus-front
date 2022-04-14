<template>
  <div>
    <!-- 上传对话框 -->
    <el-dialog
      title="上传头像"
      :visible.sync="dialogOfUpload"
      width="35%"
      style="text-align: center"
    >
      <el-upload
        class="upload-demo"
        action="#"
        drag
        :multiple="false"
        :on-change="change"
        :headers="headers"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传Image文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOfUpload = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpload()">上 传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateAvatar } from "@/api/user";

export default {
  name: "Upload",
  data() {
    return {
      dialogOfUpload: true,
      file: null,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  },

  methods: {
    // handleChange(file, fileList) {
    //   //文件数量改变
    //   this.fileList = fileList;
    // },

    confirmUpload() {
      //确认上传
      console.log("上传的图片" + this.file);
      var param = new FormData();
      param.append("file", this.file);

      updateAvatar(param).then((res) => {
        console.log(res);
        this.$message({
          message: "上传成功！",
          duration: 1000,
          
        });

        this.$router.push({
        name: "user-home",
        params: { username: this.$route.params.username },
      });
      });
    },
    change(file, fileList) {
      if(fileList.length > 1) {
        alert("只能选择一张图片");
      }
      console.log(file.raw);
      this.file = file.raw;
    },
  },
};
</script>

<style>
</style>