<template>
  <div>
    <JwChat-index
      :config="config"
      :showRightBox="true"
      scrollType="scroll"
      :taleList="taleList"
      @enter="bindEnter"
      @clickTalk="talkEvent"
      v-model="inputMsg"
      :toolConfig="tool"
      :winBarConfig="winBarConfig"
      width="1080"
      height="750"
      v-if="flag"
    >
      <template>
        <JwChat-rightbox :config="rightConfig" @click="rightClick" />
      </template>
    </JwChat-index>
  </div>
</template>


<script>
// 非实时通信2.0

import {
  addMessage,
  listContact,
  listMessage,
  uploadFile,
} from "@/api/message";
import { getInfo } from "@/api/user";

export default {
  data() {
    return {
      inputMsg: "",
      taleList: [],
      tool: {
        show: ["file", ["文件1"]],
        showEmoji: true,
        callback: this.toolEvent,
      },
      config: {
        img: null,
        name: null,
        dept: "点击好友开始聊天吧",
        callback: this.bindCover,
        historyConfig: {
          show: true,
          tip: "加载更多",
          callback: this.bindLoadHistory,
        },
        quickList: [{ text: "快捷语录" }],
      },
      winBarConfig: {
        active: "win00",
        width: "240px",
        listHeight: "60px",
        list: [],
        callback: this.bindWinBar,
      },
      rightConfig: {
        tip: "信息",
        listTip: "当前在线",
        // notice: 'mikucool',
        list: [], // 左侧联系人列表
      },

      currentUser: {
        id: null,
        img: null,
        name: null,
        dept: null,
      },
      flag: true,
      file: null,
    };
  },

  created() {
    alert("fetch");
    this.fetchInfo();
    listContact().then((res) => {
      res.data.forEach((v) => {
        this.winBarConfig.list.push({
          id: v.sendId,
          img: v.sendAvatar,
          name: v.sendName,
          dept: v.content,
        });
      });
      this.currentUser = this.winBarConfig.list[0];
      this.config.name = this.currentUser.name;
      this.config.img = this.currentUser.img;
      this.config.dept = this.currentUser.dept;

      this.listMessage(this.currentUser.name);
    });
  },

  methods: {
    // 查询消息
    listMessage(friendName) {
      listMessage(friendName).then((res) => {
        this.taleList = [];
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
          this.taleList.push(message);
        });
        console.log("获取消息列表", this.taleList);
      });
    },

    bindEnter() {
      const msg = this.inputMsg;
      if (!msg) return;
      // 发送文件
      if (this.file != null) {
        // flag 的作用是使页面重新渲染，避免上传文件时无法读取
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
      this.taleList.push(msgObj);
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
        if (FileExt == "jpg" || FileExt == "png" || FileExt == "gif" ||FileExt == "bmp") {
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
      let list = history.concat(this.list);
      this.list = list;
      console.log("加载历史", list, history);
    },
    bindCover(type) {
      console.log("header", type);
    },
    bindWinBar(play = {}) {
      const { type, data = { id: null, img: null, name: null, dept: null } } =
        play;

      this.currentUser = data;
      console.log(this.currentUser);
      this.listMessage(this.currentUser.name);
      if (type === "winBar") {
        const { id, dept, name, img } = data;
        this.config.dept = dept;
        this.config.name = name;
        this.config.img = img;
        this.winBarConfig.active = id;
      }
    },
    rightClick(type) {
      console.log("rigth", type);
    },

    talkEvent() {
      alert("talkEvent");
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
