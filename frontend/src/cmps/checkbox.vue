<template>
  <div class="checkbox-container">
    <input
      type="checkbox"
      :id="label"
      @input="onCheck()"
      name="checkbox"
      value="todo"
    />
    <label
      v-if="label"
      class="checkbox-label"
      for="checkbox"
      :data-content="label"
      >{{ label }}</label
    >
  </div>
</template>
<script>
export default {
  name: "checkbox",
  props: {
    label: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      value: false
    };
  },
  methods: {
    onCheck() {
      this.value = !this.value;
      this.$emit("input", this.value);
    }
  },
  created() {}
};
</script>
