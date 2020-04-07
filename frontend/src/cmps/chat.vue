<template>
  <div class="chat">
    <rounded-button
      class="chat-button"
      :fa-icon="buttonIcon"
      :class="{ active: isActive }"
      @click.native="handleButton()"
    />
    <!-- <div class="chat-notification" :class="{ active: isNew }">•</div> -->

    <div class="chat-modal" :class="{ active: isActive }">
      <div class="chat-header">
        <span class="chat-header-title">Chat Messanger</span>
        <font-awesome-icon
          @click="toggleChat()"
          class="chat-header-icon"
          :icon="['far', `times-circle`]"
        />
      </div>
      <div class="chat-name">
        <site-input
          type="select"
          prepand="City:"
          v-model="topic"
          stretch
          :options="require('@/cities.json')"
        />
        {{ msg.topic }}
      </div>
      <ul class="chat-window">
        <li v-for="(msg, idx) in msgs" class="chat-window-message" :key="idx">
          <span class="chat-window-msg-sender">{{ msg.from }}: &nbsp;</span>
          <span class="chat-window-msg-text">{{ msg.txt }}</span>
        </li>
      </ul>
      <div class="chat-window-typing">{{ typing }}</div>
      <site-input
        type="text"
        @input="sendTypingMsg"
        @enter="sendMsg"
        stretch
        v-model="msg.txt"
      />
    </div>
  </div>
</template>
<script>
import RoundedButton from "@/cmps/rounded-button";
// import primaryButton from "@/cmps/primary-button.vue";
import siteInput from "@/cmps/site-input";
import socketService from "@/services/socket.service";
// import userService from "@/services/user.service";
// import socket from "socket.io-client";
export default {
  name: "chat",
  components: {
    RoundedButton,
    siteInput
    // primaryButton
  },
  data() {
    return {
      isActive: false,
      msg: {
        from: "Guest",
        txt: ""
      },
      msgs: [],
      topic: "",
      typing: "",
      isNew: false
    };
  },
  methods: {
    handleButton() {
      if (this.isActive) {
        this.sendMsg();
      } else {
        this.toggleChat();
        // this.isNew = false;
      }
    },
    toggleChat() {
      this.isActive = !this.isActive;
    },
    addMsg(msg) {
      this.typing = "";
      this.msgs.push(msg);
    },
    sendMsg() {
      socketService.emit("chat newMsg", this.msg);
      this.msg.txt = "";
    },
    sendTypingMsg() {
      socketService.emit("typing", this.msg.from);
    },
    resetTyping() {
      this.typing = "";
    },
    setTyping(data) {
      this.typing = `${data} is typing...`;
    },
    changeTopic() {
      socketService.emit("chat topic", this.topic);
    },
    getUser() {
      var nickname =
        this.$store.getters.user.firstName +
        " " +
        this.$store.getters.user.lastName;
      if (!this.$store.getters.user.firstName) {
        this.msg.from = "Guest";
      } else {
        this.msg.from = nickname;
      }
    }
  },
  watch: {
    topic() {
      // console.log('Topic Changed', this.topic);
    },
    "msg.txt"() {
      socketService.on("Typing", sender => {
        this.setTypingMsg(sender);
      });
      // console.log('MSG CHANGED');
    },
    msgs: {
      handler() {
        this.isNew = true;
        // console.log('New msg arrival!');
      }
    }
  },
  computed: {
    buttonIcon() {
      if (this.isActive) {
        return `paper-plane`;
      }
      if (this.typing !== "") {
        return "comment-dots";
      }
      return "comment";
    }
  },
  created() {
    this.getUser();
    socketService.setup();
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("typing", this.setTyping);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  }
};
</script>
