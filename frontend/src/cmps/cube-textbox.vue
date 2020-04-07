<template>
  <span class="cube-textbox" :class="computedClass">
    {{ text }}
    <font-awesome-icon
      v-if="removeable"
      @click="remove"
      class="cube-textbox-remove"
      :icon="['fas', 'minus-circle']"
    />
  </span>
</template>
<script>
export default {
  name: "cube-textbox",
  props: {
    text: {
      required: true,
      type: String
    },
    //To define only one color send as attribue monoColor="rgb(some-color)", primary is default
    monoColor: {
      type: Boolean,
      default: false
    },
    monoColorBlue: {
      type: Boolean,
      default: false
    },
    //To add remove button on the box
    removeable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      colors: ["#2956aa", "#6f1777", "#17773c", "#990d0d", "#e7ac0a"]
    };
  },
  computed: {
    computedClass() {
      if (this.monoColor) {
        // style.colorBackdHover = "rgb(217, 217, 217)";
        // style.backgroundColor = `background-color: #e6e5e5`;
        return { gray: true };
      }
      if (this.monoColorBlue) {
        // style.backgroundColor = "#84bffd";
        // style.colorBackdHover = "rgb(99, 169, 243)";
        return { blue: true };
      }
      // const idx = Math.floor(Math.random() * (5 - 0));
      // return (backgroundColor = this.colors[idx]);
      // return style;
      return null;
    }
  },
  methods: {
    remove() {
      this.$emit("remove", this.text);
    }
  }
};
</script>
