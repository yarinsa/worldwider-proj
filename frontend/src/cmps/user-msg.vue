<template>
  <section>
    <transition name="fade">
      <section class="msg-container" :class="classObj">
        <!-- <button @click="closeMsg">x</button> -->
        {{ msg }}
      </section>
    </transition>
  </section>
</template>

<script>
import { eventBus } from "@/services/event-bus.service.js";
export default {
  name: "message",
  props: {
    // text: {
    //   type: String,
    //   required: true
    // },
    // type: {
    //   type: String,
    //   default: "notification"
    //   //other options are danger / success
    // }
  },
  data() {
    return {
      msg: "",
      isActive: false,
      type: ""
      // classObj : {
      //   active: isActive,

      // }
    };
  },
  created() {
    eventBus.$on("show-msg", msg => {
      console.log(msg);
      this.msg = msg.txt;
      this.type = msg.type;
      this.isActive = true;
      setTimeout(() => {
        this.msg = null;
        this.type = null;
        this.isActive = false;
      }, 3000);
    });
  },
  methods: {
    closeMsg() {
      this.msg = null;
    }
  },
  computed: {
    classObj() {
      const classObj = { active: this.isActive };
      if (this.type === "danger") {
        classObj.danger = true;
      }
      if (this.type === "success") {
        classObj.success = true;
      }
      // return { notification: true };
      return classObj;
    }
  }
};
</script>
