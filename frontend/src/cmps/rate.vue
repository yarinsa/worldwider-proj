<!-- Rate component -->
<!-- Gets value as a prop and render rating stars accordingly -->
<!-- SHOW-ONLY attribue to make the component display only -->
<!-- SINGLE, to make the rate one star and a number display -->
<!-- TOTAL shows the total number of ratings -->

<template>
  <span>
    <span v-if="!single">
      <span
        class="rating-star"
        v-for="idx in 5"
        :key="idx"
        :class="style(idx)"
        @click="handleClick(idx)"
        @mouseover="handleHover(idx)"
        @mouseout="handleHover()"
        >★</span
      >
    </span>
    <span class="rating-star" v-if="single" :class="style(value)">
      ★
      <span class="rating-star-value" :class="style(value)">{{ value }}</span>
      <span
        class="rating-star-total"
        v-if="total || total === 0"
        :class="style(value)"
        >&nbsp;({{ total }})</span
      >
    </span>
  </span>
</template>
<script>
export default {
  name: "rating",
  props: {
    value: {
      type: [String, Number],
      default: 0.0
    },
    showOnly: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number
    }
  },
  data() {
    return {
      coloredStars: 0
    };
  },
  methods: {
    handleHover(idx) {
      if (this.showOnly) return;
      if (!idx) this.coloredStars = Math.floor(this.value);
      this.coloredStars = idx;
    },
    handleClick(idx) {
      if (this.showOnly) return;

      this.$emit("input", idx);
    },
    style(idx) {
      let classObject = {
        active: !this.showOnly
      };
      idx = parseInt(idx);
      if (idx <= this.coloredStars) {
        classObject.colored = true;
      } else {
        classObject.colored = false;
      }
      if (idx <= this.value) {
        classObject.colored = true;
      }
      if (classObject.colored) {
        if (idx <= 2.0) {
          classObject.min = true;
        }
        if (idx > 2.0 && idx <= 4.0) {
          classObject.mid = true;
        }
        if (idx === 5.0) {
          classObject.max = true;
        }
      }
      return classObject;
    }
  }
};
</script>
