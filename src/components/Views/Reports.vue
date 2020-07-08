<template>
  <div class="small">
    <line-chart :options="options" :chart-data="fillData()"></line-chart>
  </div>
</template>

<script>
import { db } from "../../main";
import LineChart from "../../chart";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      plugins: [ChartDataLabels],
      options: {
        title: {
          display: true,
          text: "Задачи: по приоритету"
        },
        tooltips: {
          enabled: false
        },
        scales: {
          yAxes: [
            {
              barPercentage: 0.5
            }
          ]
        },

        plugins: {
          datalabels: {
            color: "#000",
            anchor: "end",
            align: "end",
            offset: 1,
            font: {
              lineHeight: 1.6
            },
            formatter: function(value) {
              return value;
            }
          }
        }
      },
      datacollection: {},
      highest: [],
      high: [],
      medium: [],
      low: [],
      lowest: []
    };
  },
  firestore() {
    return {
      highest: db.collection("tasks").where("priority", "==", "highest"),
      high: db.collection("tasks").where("priority", "==", "high"),
      medium: db.collection("tasks").where("priority", "==", "medium"),
      low: db.collection("tasks").where("priority", "==", "low"),
      lowest: db.collection("tasks").where("priority", "==", "lowest")
    };
  },
  methods: {
    fillData() {
      return {
        labels: ["Highest", "High", "Medium", "Low", "Lowest"],
        datasets: [
          {
            label: "Задачи",
            backgroundColor: "#3c78b5",
            data: [
              this.highest.length,
              this.high.length,
              this.medium.length,
              this.low.length,
              this.lowest.length
            ]
          }
        ]
      };
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${this.height}px`,
        position: "relative"
      };
    }
  }
};
</script>

<style>
.small {
  max-width: 600px;
}
</style>