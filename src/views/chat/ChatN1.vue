<template>
  <div>
    <el-row style="margin-top: 50px">
      <el-col :span="8">
        <el-card
          v-for="config in userConfigList"
          :key="config.Id"
          shadow="hover"
        >
          <JwChat-item :config="config" @click="bindClick" />
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="always">
          <JwChat
            :taleList="list"
            @enter="bindEnter"
            v-model="inputMsg"
            :toolConfig="tool"
            :config="chatConfig"
            scrollType="scroll"
            v-if="flag"
          ></JwChat>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 非实时通信 1.0

import { mapGetters } from "vuex";
import {
  addMessage,
  listContact,
  listMessage,
  uploadFile,
} from "@/api/message";
import { getInfo } from "@/api/user";

export default {
  name: "ChatIndex",
  computed: {
    ...mapGetters(["token"]),
  },
  data() {
    return {
      user: {},
      inputMsg: "",
      list: [],
      tool: {
        show: ["file", ["文件1"]], // 二级数组自定义名称
        showEmoji: true,
        /**
         * @description: 点击按钮的回调函数
         * @param {*} type 当前点击的按钮
         * @param {*} plyload 附加文件或者需要处理的数据
         * @return {*}
         */
        callback: this.toolEvent,
      },
      chatConfig: {
        historyConfig: {
          show: true,
          tip: "加载更多",
          callback: this.bindLoadHistory,
        },
      },
      userConfigList: [],
      currentUser: {}, // 当前联系人
      flag: true,
      file: null,
    };
  },

  created() {
    alert("fetch");
    this.fetchInfo();
    listContact().then((res) => {
      res.data.forEach((v) => {
        this.userConfigList.push({
          id: v.sendId,
          img: v.sendAvatar,
          name: v.sendName,
          dept: v.content,
        });
      });
      this.currentUser = this.userConfigList[0];
      this.listMessage(this.currentUser.name);
    });
  },

  methods: {
    // 查询消息
    listMessage(friendName) {
      listMessage(friendName).then((res) => {
        this.list = [];
        res.data.forEach((value) => {
          // 判断是谁发的信息
          let mine = value.sendName === this.user.username;
          //封装消息
          let message = {
            date: value.createTime,
            text: { text: value.content },
            mine: mine,
            name: value.sendName,
            img: value.sendAvatar,
          };
          this.list.push(message);
        });
        console.log("获取消息列表", this.list);
      });
    },
    // 点击好友进行对话时先获取相应信息

    bindClick(play) {
      console.log("user", play);
      console.log("获取用户name", play.value.name);
      this.currentUser = play.value;
      this.listMessage(this.currentUser.name);
    },

    bindEnter() {
      const msg = this.inputMsg;
      if (!msg) return;
      // 发送文件
      if (this.file != null) {
        this.flag = false;
        uploadFile(this.file).then((res) => {
          console.log(res.data);
          this.file = null;
          this.flag = true;
        });
      }
      const msgObj = {
        date: new Date(),
        text: { text: msg },
        mine: true,
        name: this.user.username,
        img: this.user.avatar,
      };
      //添加到消息表
      let { id, name, img } = this.currentUser; // 将与当前对话用户对应的属性值赋给变量
      addMessage({
        sendId: this.user.id,
        sendName: this.user.username,
        receiveId: id,
        receiveName: name,
        sendAvatar: this.user.avatar,
        receiveAvatar: img,
        content: msg,
      });
      this.inputMsg = "";
      this.list.push(msgObj);
    },
    /**
     * @description:
     * @param {*} type 当前点击的按钮
     * @param {*} plyload 附加文件或者需要处理的数据
     * @return {*}
     */
    toolEvent(type, plyload) {
      // 遍历文件集合 plyload
      for (var i = 0; i < plyload.length; i++) {
        this.file = {};
        var fileName = plyload[i].name;
        console.log(fileName);
        // 获取取文件后缀
        var FileExt = plyload[i].name.replace(/.+\./, "");

        // 对文件归类
        if (FileExt == "jpg" || FileExt == "png" || FileExt == "gif") {
          this.inputMsg =
            "<img data-src='http://localhost:8081/static/message/" +
            fileName +
            "'/>";
        } else if (FileExt == "mp3" || FileExt == "wma" || FileExt == "wav") {
          this.inputMsg =
            "<audio data-src='http://localhost:8081/static/message/" +
            fileName +
            "'/>";
        } else if (
          FileExt == "mp4" ||
          FileExt == "mov" ||
          FileExt == "m4v" ||
          FileExt == "rm" ||
          FileExt == "rmvb" ||
          FileExt == "wmv"
        ) {
          this.inputMsg =
            "<video data-src='http://localhost:8081/static/message/" +
            fileName +
            "'/>";
        } else {
          alert("格式不支持");
          return;
        }

        // 上传文件到后端
        // 前端向后端发送的文件需要以formData格式存储，文件需要通过append的方式将数据传给formData对象
        var param = new FormData();
        param.append("file", plyload[i]);
        console.log(param);
        this.file = param;
        
      }
    },

    /**
     * @description: 点击加载更多的回调函数
     * @param {*}
     * @return {*}
     */
    bindLoadHistory() {
      const history = new Array(3).fill().map((i, j) => {
        return {
          date: "2020/05/20 23:19:07",
          text: { text: j + new Date() },
          mine: false,
          name: "JwChat",
          img: "image/three.jpeg",
        };
      });
      this.list = history.concat(this.list);
      console.log("加载历史", list, history);
    },
    // 获取当前登录用户信息
    fetchInfo() {
      getInfo(this.$route.params.username).then((res) => {
        console.log(res);
        const { data } = res;
        this.user = data;
      });
    },
  },
};
</script>