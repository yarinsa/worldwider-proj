<template>
  <section>
    <div class="block">
      <span class="demonstration">Book a tour</span>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="Pick a day"
      ></el-date-picker>
      <el-select v-model="value" placeholder="Attendees">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <primary-button
        class="tourGuide-details-actions-item"
        :text="'Book'"
        @click.native="book"
      />
    </div>
  </section>
</template>

<script>
import primaryButton from "@/cmps/primary-button.vue";

export default {
  name: "booking",
  components: {
    primaryButton
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "Today",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "Yesterday",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "A week ago",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      date: "",
      options: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "4"
        },
        {
          value: "5",
          label: "5"
        }
      ],
      value: ""
    };
  },
  methods: {
    book() {
      const tourDate = this.date;
      const attendees = this.value;
      const price = 17;
      const bookingDetails = {
        tourDate,
        attendees,
        price
      };
      this.$emit("book", bookingDetails);
    }
  }
};
</script>
<style></style>
