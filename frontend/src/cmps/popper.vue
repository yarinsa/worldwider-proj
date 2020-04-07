<template>
  <div class="popper" :class="computedClass">
    <div
      v-for="(item, idx) in optionsToRender"
      :key="idx"
      @click="onSelect(item)"
      class="popper-item"
    >
      {{ item }}
    </div>
  </div>
</template>
<script>
export default {
  name: "popper",
  props: {
    options: {
      type: Array
    },
    maxItems: {
      type: Number
    },
    query: {
      type: String,
      default: ""
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSelect(item) {
      this.$emit("input", item);
    }
  },
  computed: {
    optionsToRender() {
      let optionsToRender = this.options.filter(item =>
        item
          .toString()
          .toLowerCase()
          .includes(this.query.toLowerCase())
      );
      if (this.maxItems) {
        return optionsToRender.slice(0, this.maxItems);
      }
      return optionsToRender;
    },
    computedClass() {
      return { active: this.active };
    }
  }
};
</script>
