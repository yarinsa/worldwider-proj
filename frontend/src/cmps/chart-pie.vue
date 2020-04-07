<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  data() {
    return {
      chartdata: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [
          "Walks in Manhatten",
          "Night tour in Harlem",
          "Golden Gardens"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [720, 260, 403]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },

  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>

