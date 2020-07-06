<template>

  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>

  </div>
  
</template>

<script>
import { db } from '../main'
  import LineChart from '../chart'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: {} ,
        highest: [],
        high: [],
        medium: [],
        low: [],
        lowest: []
      }
    },
    firestore () {
      return {
        highest: db.collection('tasks').where('priority', '==', 'highest'),
        high: db.collection('tasks').where('priority', '==', 'high'),
        medium: db.collection('tasks').where('priority', '==', 'medium'),
        low: db.collection('tasks').where('priority', '==', 'low'),
        lowest: db.collection('tasks').where('priority', '==', 'lowest')
        }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['Highest', "High", "Medium", "Low", "Lowest"],
          datasets: [
            {
              label: 'this.',
              backgroundColor: '#f87979',
              data: [this.highest.length, this.high.length, this.medium.length, this.low.length, this.lowest.length]
            }
          ]
        },
        console.log(this.highest.length)
      },
  }
}
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>