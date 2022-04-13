<template>
  <div class="columns">
    <div class="column is-full">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span><i class="fa fa fa-book"> 主题 / 发布主题</i></span>
        </div>
        <div>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-form-item prop="title">
              <el-input v-model="ruleForm.title" placeholder="输入主题名称" />
            </el-form-item>

            <!--Markdown-->
            <div id="vditor" />

            <b-taginput
              v-model="ruleForm.tags"
              class="my-3"
              maxlength="15"
              maxtags="3"
              ellipsis
              placeholder="请输入主题标签，限制为 15 个字符和 3 个标签"
            />

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即创建
              </el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { post } from "@/api/post";
import Vditor from "vditor";
import "vditor/dist/index.css";
import { mapGetters } from "vuex";

export default {
  name: "TopicPost2",

  data() {
    return {
      contentEditor: {},
      ruleForm: {
        title: "", // 标题
        tags: [], // 标签
        content: "", // 内容
      },
      rules: {
        title: [
          { required: true, message: "请输入话题名称", trigger: "blur" },
          {
            min: 1,
            max: 25,
            message: "长度在 1 到 25 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  computed: {
    ...mapGetters(["token", "user"]),
  },

  mounted() {
    this.vditorFun();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.contentEditor.getValue().length === 1 ||
            this.contentEditor.getValue() == null ||
            this.contentEditor.getValue() === ""
          ) {
            alert("话题内容不可为空");
            return false;
          }
          if (this.ruleForm.tags == null || this.ruleForm.tags.length === 0) {
            alert("标签不可以为空");
            return false;
          }
          this.ruleForm.content = this.contentEditor.getValue();
          post(this.ruleForm).then((response) => {
            const { data } = response;
            setTimeout(() => {
              this.$router.push({
                name: "post-detail",
                params: { id: data.id },
              });
            }, 800);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.contentEditor.setValue("");
      this.ruleForm.tags = "";
    },

    /////////////////////////////////////////////////////////////

    vditorFun() {
      let self = this;
      this.contentEditor = new Vditor("markdownContent", {
        height: 600,
        width: 800,
        placeholder: "开始编辑...",
        toolbar: [
          // "emoji",  表情
          "headings",
          "bold",
          "italic",
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          // "check",
          "outdent",
          "indent",
          "|",
          "quote",
          "line",
          "code",
          "inline-code",
          "insert-before",
          "insert-after",
          "|",
          // "upload",默认上传
          {
            //自定义上传
            hotkey: "",
            name: "upload",
            // tipPosition: "s",
            tip: "上传图片",
            className: "right",
          },
          // "record",
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "fullscreen",
          "edit-mode",
          {
            name: "more",
            toolbar: [
              "both",
              // "code-theme",
              // "content-theme",
              "export",
              "outline",
              "preview",
              // "devtools",
              // "info",
              // "help",
            ],
          },
          // ,"|",
          // {
          //   hotkey: "⌘-S",
          //   name: "save",
          //   tipPosition: "s",
          //   tip: "保存",
          //   className: "right",
          //   icon: `<img style="height: 16px" src='https://img.58cdn.com.cn/escstatic/docs/imgUpload/idocs/save.svg'/>`,
          //   click() {
          //     that.saveDoc();
          //   }
          // },
        ],
        toolbarConfig: {
          pin: true,
        },
        counter: {
          enable: true,
          type: "字数统计",
        },
        //默认开启了大纲
        outline: {
          enable: true,
        },
        cache: {
          enable: false,
        },
        //编辑器有焦点和失去焦点可以判断是否有内容，此处自己封装检查校验即可
        blur() {
          self.vaditEditorContent();
        },
        focus() {
          self.vaditEditorContent();
        },
        //因我的需求是不需要表情符号，所以把编辑器中的表情符号都删除
        input(val) {
          let pattern = new RegExp(
            "[^\\u0020-\\u007E\\u00A0-\\u00BE\\u2E80-\\uA4CF\\uF900-\\uFAFF\\uFE30-\\uFE4F\\uFF00-\\uFFEF\\u0080-\\u009F\\u2000-\\u201f\r\n]"
          );
          if (val != "" && val != null) {
            //去除表情
            let rs = "";
            if (pattern.test(val)) {
              for (let i = 0; i < val.length; i++) {
                rs = rs + val.substr(i, 1).replace(pattern, "");
              }
            } else {
              rs = val;
            }
            //替换防盗链图片，有两种方法，第一种是替换页面的图片路径，替换页面的需要在详情回显的时候也需要进行处理，方法和替换页面的方法一样；
            //第二是直接替换md格式数据中的地址

            //  第一种：
            // let reg = /(http|https):\/\/([\w.]+\/?)\S*/gi;
            // let valueMatch = rs.match(reg);
            // let replaceUrl = self.gb.mdImgPath("");
            // self.contentEditor.setValue(rs);
            // setTimeout(() => {
            //   let imgLinkPar = $(".vditor-ir")
            //     .find(".vditor-reset")
            //     .children("p");
            //   let childTag = imgLinkPar.find("span.vditor-ir__node");
            //   childTag.each(function () {
            //     let imgLinkTag = $(this).find("img").attr("src") + ")";
            //     for (let k = 0; k < valueMatch.length; k++) {
            //       if (imgLinkTag == valueMatch[k]) {
            //         $(this).find("img").attr("src", replaceUrl);
            //       }
            //     }
            //   });
            // }, 300);

            //  第二种：
            setTimeout(() => {
              //替换防盗链图片
              let reg = /(http|https):\/\/([\w.]+\/?)\S*/gi; //gi: 全局匹配 + 忽略大小写
              if (reg.test(rs)) {
                let valueMatch = rs.match(reg);
                // console.log(valueMatch)
                let replaceUrl = self.gb.mdImgPath("") + ")";
                let linkOutUrl = rs;
                let urlStr;
                for (let k = 0; k < valueMatch.length; k++) {
                  let ishttps = "https:" == valueMatch[k] ? true : false;
                  if (ishttps) {
                    urlStr = valueMatch[k].split("https://");
                  } else {
                    urlStr = valueMatch[k].split("http://");
                  }
                  // console.log(urlStr)
                  const index = valueMatch[k].indexOf("/") + 2;
                  let endUrl = valueMatch[k].substring(index);
                  let threeSplit = endUrl.split("/");
                  let getThree = threeSplit
                    .slice(0, threeSplit.length - 3)
                    .join("/");
                  // console.log(getThree)
                  if (getThree == "mmbiz.qpic.cn") {
                    linkOutUrl = linkOutUrl.replace(valueMatch[k], replaceUrl);
                  }
                }
                self.contentEditor.setValue(linkOutUrl);
              }
            }, 2000);
          }
        },
        //编辑页面使用，发布页面不需要
        after: () => {
          self.contentEditor.setValue(self.activityForm.activity_content);
        },
        //这里写上传
        upload: {
          accept: "image/jpg, image/jpeg, image/png", //规定上传的图片格式
          url: this.gb.reqPath("/v1/Activity/upload"), //请求的接口
          multiple: false,
          fieldName: "file",
          max: 2 * 1024 * 1024, //上传图片的大小
          // extraData: { access_token: this.token }, //为 FormData 添加额外的参数
          linkToImgUrl: this.gb.reqPath("/v1/Activity/upload"),
          filename(name) {
            return name
              .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "")
              .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "")
              .replace("/\\s/g", "");
          },
          validate(msg) {
            console.log(msg + "格式");
          },
          //粘贴图片回显处理，如果有图片加了防盗链，则让后台代理替换成自己的图片
          linkToImgFormat(files) {
            let code = 0;
            let msg = "";
            let data = JSON.parse(files);
            // let linkImgName = data.result.path
            // //上传图片请求状态
            if (data.ret_code == 200) {
              // let lastTipNum = linkImgName.substr(linkImgName.lastIndexOf('/', linkImgName.lastIndexOf('/') - 1) + 1);
              // let index = lastTipNum.lastIndexOf("\/");
              // let imgUrl = decodeURI(lastTipNum.substring(index + 1, lastTipNum.length));
              let responseData = self.gb.imgOutLinkPath(data.result.path);
              let succUrl = {};
              let originalURL = "originalURL";
              let url = "url";
              succUrl[originalURL] = data.result.originalURL;
              succUrl[url] = responseData;
              let end = JSON.stringify({
                msg,
                code,
                data: succUrl,
              });
              return end;
            } else {
              self.$message({
                message: "图片上传失败！",
                type: "error",
              });
            }
          },
          //上传图片回显处理
          format(files, responseText) {
            // let imageResult = JSON.parse(responseText)
            let code = JSON.parse(responseText);
            let msg = JSON.parse(responseText);
            let data = JSON.parse(responseText);
            let filName = data.result.cover_files;
            //上传图片请求状态
            if (data.ret_code == 200) {
              let lastTipNum = filName.substr(
                filName.lastIndexOf("/", filName.lastIndexOf("/") - 1) + 1
              );
              let index = lastTipNum.lastIndexOf("/");
              self.imgNameStr = decodeURI(
                lastTipNum.substring(index + 1, lastTipNum.length)
              );
              let responseData = self.gb.imgPath(data.result.cover_files);
              let succ = {};
              succ[self.imgNameStr] = responseData;
              //图片回显
              return JSON.stringify({
                msg,
                code,
                data: {
                  errFiles: [],
                  succMap: succ,
                  // succMap: {
                  //   'default.png': `${responseData}`
                  // }
                },
              });
            } else {
              self.$message({
                message: "图片上传失败！",
                type: "error",
              });
            }
          },
          error(msg) {
            console.log(msg + "上传失败了");
          },
        },
      });
    },
  },
};
</script>

<style>
</style>
