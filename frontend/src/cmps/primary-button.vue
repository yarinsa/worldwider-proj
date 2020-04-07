<template>
  <button class="primary-button" :type="type">{{ text }}</button>
</template>
<script>
export default {
  name: "primary-button",
  props: {
    type: {
      type: String,
      default: "button"
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>
