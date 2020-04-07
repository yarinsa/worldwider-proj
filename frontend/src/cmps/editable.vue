<template>
  <span
    :contenteditable="allowed"
    class="editable"
    :class="{ active: currentlyEditing }"
    @blur="onEdit"
    @click="toggleEdit"
    v-text="value"
  ></span>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number]
    },
    allowed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isEditing: false,
      currentlyEditing: false
    };
  },
  methods: {
    onEdit(event) {
      this.isEditing = true;
      this.currentlyEditing = false;
      const src = event.target.innerText;
      this.$emit("input", src);
    },
    toggleEdit() {
      if (this.allowed) this.currentlyEditing = true;
      else {
        this.currentlyEditing = false;
      }
    }
  }
};
</script>
<style></style>
