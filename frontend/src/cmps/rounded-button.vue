<template>
  <button class="primary-button rounded-button" :type="type">
    {{ text }}<font-awesome-icon :icon="['fas', faIcon]" />
  </button>
</template>
<script>
export default {
  name: "rounded-button",
  props: {
    type: {
      type: String,
      default: "button"
    },
    text: {
      type: String
    },
    faIcon: {
      type: String
    }
  }
};
</script>
