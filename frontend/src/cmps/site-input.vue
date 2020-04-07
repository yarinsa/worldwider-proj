<!-- SITE INPUT COMPONENT -->
<!--MULTISELECT -->
<template>
  <span class="site-input-container">
    <span class="input input-container" :class="{ stretch: stretch }">
      <!-- required -->
      <span v-if="required" class="site-input-required">Required</span>
      <!-- password reveal -->
      <span v-if="type === 'password'" @click="reveal" class="site-input-suffix">
        <font-awesome-icon :icon="['far', passwordSuffix]" />
      </span>
      <!-- suffix icon -->
      <span v-if="faSuffix" class="site-input-suffix">
        <font-awesome-icon :icon="['far', faSuffix]" />
      </span>
      <!-- prefix icon -->
      <span v-if="faPrefix" class="site-input-prefix">
        <font-awesome-icon :icon="['far', faPrefix]" />
      </span>

      <!-- prepand MUST BE BEFORE INPUT ELEMENT -->
      <input
        v-if="prepand"
        class="input input-prepand"
        :style="
          `border-radius: 4px 0 0 4px; width: ${this.prepand.length + 2}ch;`
        "
        type="text"
        disabled
        :value="prepand"
      />

      <!-- select -->
      <popper
        v-if="type === 'select'"
        class="site-input-popper"
        @input="handleSelect"
        :active="isPopperActive"
        :query="value"
        :options="options"
      />
      <input
        v-if="type === 'select'"
        type="text"
        class="input"
        :style="textInputStyle"
        :value="value"
        @input="onInput"
        @click="isPopperActive = true"
        @blur="isPopperActive = false"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="{ stretch: stretch }"
      />

      <!-- multiselect -->
      <popper
        v-if="type === 'multiselect'"
        class="site-input-popper"
        :active="isPopperActive"
        :query="selectedValue"
        :options="options"
        @input="addSelected"
      />
      <input
        v-if="type === 'multiselect'"
        type="text"
        class="input"
        v-model="selectedValue"
        :style="textInputStyle"
        @input="onInput"
        @click="isPopperActive = true"
        @blur="isPopperActive = false"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="{ stretch: stretch }"
      />

      <!-- file upload -->
      <input v-if="type === 'file'" type="file" class="input" @change="uploadImg" />

      <!-- text / password -->
      <input
        v-if="type === 'text' || type === 'password'"
        :type="computedType"
        class="input"
        :style="textInputStyle"
        :value="value"
        @input="onInput"
        @keydown.enter="onEnter"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="{ stretch: stretch }"
      />
      <!-- append -->
      <input
        v-if="append"
        class="input input-append"
        :style="
          `border-radius: 0 4px 4px 0; width: ${this.append.length * 2}ch;`
        "
        type="text"
        disabled
        :value="append"
      />
    </span>

    <div class="site-input-selected-list" v-if="type === 'multiselect'">
      <cube-textbox
        v-for="(value, idx) in selected"
        :text="value"
        :key="idx"
        mono-color-blue
        removeable
        @remove="removeSelected(idx)"
      />
    </div>
    <!-- textarea -->
    <textarea
      v-if="type === 'textarea'"
      class="input input-textarea"
      @input="onInput"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </span>
</template>
<script>
import popper from "@/cmps/popper.vue";
import cubeTextbox from "@/cmps/cube-textbox.vue";
export default {
  name: "site-input",
  components: {
    popper,
    cubeTextbox
  },
  props: {
    value: {
      type: [String, Boolean, Number, Array],
      default: ""
    },
    //Supports: text,password,textarea,select,multiselect, file
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    prepand: {
      type: String
    },
    append: {
      type: String
    },

    faSuffix: {
      type: String
    },
    faPrefix: {
      type: String
    },
    stretch: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array
    }
  },
  data() {
    return {
      passwordSuffix: "eye",
      isPopperActive: false,
      selected: [],
      selectedValue: ""
    };
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
    },
    onEnter(event) {
      this.$emit("enter", event.target.value);
    },
    reveal() {
      if (this.disabled) return;
      if (this.passwordSuffix === "eye") {
        // console.log(this.passwordSuffix);
        this.passwordSuffix = "eye-slash";
      } else {
        this.passwordSuffix = "eye";
      }
      // console.log(this.passwordSuffix);
    },
    async uploadImg(ev) {
      var imgUrl = await this.$store.dispatch({
        type: "uploadImg",
        ev
      });
      this.$emit("input", imgUrl[0]);
    },
    addSelected(value) {
      let isExist = this.selected.find(item => value === item);

      if (!isExist) {
        this.selected.unshift(value);
        this.$emit("input", this.selected);
      }
    },
    removeSelected(idx) {
      this.selected.splice(idx, 1);
      this.$emit("input", this.selected);
    },
    handleSelect(value) {
      this.selectedValue = value;
      this.$emit("input", value);
    }
  },
  computed: {
    textInputStyle() {
      let style = {};
      if (this.prepand) {
        style.borderRadius = "0 4px 4px 0";
      }
      if (this.append) {
        style.borderRadius = "4px 0 0 4px";
      }
      if (this.prepand && this.append) {
        style.borderRadius = " 0 0 0 0 ";
      }
      return style;
    },
    computedType() {
      if (this.passwordSuffix === "eye" && this.type === "password") {
        return "password";
      }
      if (this.passwordSuffix === "eye-slash" && this.type === "password") {
        return "text";
      }
      return this.newType;
    }
  },
  created() {
    if (this.type === "multiselect") {
      this.selected = [...this.value];
    }
  }
};
</script>
