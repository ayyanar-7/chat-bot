<template>
    <div class="card">
        <div>
            <pie-chart :data="chartData" @drillData="drillData"></pie-chart>
        </div>
        <div>
        <a-button @click="clear">Clear</a-button>
        </div>
        <div v-if="isSingle">
            <a-table :columns="innerColumns" :data-source="singleData">
            </a-table>
        </div>
        <a-table :columns="columns" :data-source="data" 
        class="components-table-demo-nested" :expandedRowRender="expandedRowRender"
        >
      <a slot="operation" >Publish</a>
      <a-table
        slot="expandedRowRender"
        :columns="innerColumns"
        :data-source="innerData"
        :pagination="false"
      >
        <span slot="status" > <a-badge status="success" />Finished </span>
        <span slot="operation"  class="table-operation">
          <a>Pause</a>
          <a>Stop</a>
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item>
                Action 1
              </a-menu-item>
              <a-menu-item>
                Action 2
              </a-menu-item>
            </a-menu>
            <a> More <a-icon type="down" /> </a>
          </a-dropdown>
        </span>
      </a-table>
    </a-table>
    </div>
  </template>


<script>
import pieChart from './pieChart.vue';
// import * as d3 from 'd3';
import axios from 'axios';
export default {
  components: { pieChart },
    data(){
        return{
            previous: '',
            tableInner: [],
            singleData: [],
            isSingle: false,
            chartData: [],
            columns : [
  { title: 'Category', dataIndex: 'Category', key: 'Category' },
  { title: 'QuizCount', dataIndex: 'QuizCount', key: 'QuizCount' },
  { title: 'mostLanguage', dataIndex: 'mostLanguage', key: 'mostLanguage' },
  { title: 'User', dataIndex: 'User', key: 'User' },
  { title: 'Date', dataIndex: 'Date', key: 'Date' },
  { title: 'Action', key: 'operation', scopedSlots: { customRender: 'operation' } },
],
data : [],
innerColumns : [
  { title: 'Question', dataIndex: 'question', key: 'question' },
  { title: 'Answer', dataIndex: 'answer', key: 'answer' },
  { title: 'DangerLevel', key: 'danger_level', scopedSlots: { customRender: 'danger_level' } },
  { title: 'DifficultyLevel', dataIndex: 'difficulty_level', key: 'difficulty_level' },
  {
    title: 'Action',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
],
innerData : [],

        }
    },
    async mounted(){
        this.reload();
    },
    methods:{
        async clear(){
            window.location.reload()
        },
        async reload(){
            this.data = [];
            this.singleData = [];
            this.innerData = [];
            const response = await axios.get('/chat-bot/getPieData', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const tableOuter = await axios.get('/chat-bot/getTableOuter', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.data = tableOuter.data.data;
        console.log('eeeeeeeeeeeeeee',tableOuter);
        let result = response.data.data;
        result.forEach((item)=>{
            this.chartData.push({name: item.name, value: parseInt(item.value)});
        })
        console.log('vvvvvvvvvvvvvvvvvvvvvvvvv', this.chartData);
        this.tableInner = await axios.get('/chat-bot/getTableInner', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.innerData = this.tableInner.data.data.flatMap(item => item.questions);
        console.log('iiiiiiiiiiiiiiiiiiiiiiiii', this.innerData);
        },
        drillData(category){
            if(this.previous == category){
                this.isSingle = false;
                return;
            }
            console.log('ddddddddddddddddddddddd',category);
            this.isSingle = true;
            this.previous = category;
            this.singleData = this.tableInner.data.data.find(item=>item.category == category)['questions'];
        }

    }
}
</script>

<style lang="sass" scoped>

.card{
    border-radius: 6px;
    border: 1px solid #CBD4DB;
    background: #FFF;
    line-height: 20px;
    font-style: normal;
    text-align: center;
    color: #000;
    justify-content: center;
    
    .title{
      font-size: 14px;
      font-weight: 400;
    }
    .count{
      font-size: 32px;
      font-weight: 500;
    }
    .duration-wrapper{
      display: flex;
      justify-content: center;
      gap: 60px;
      .period{
        color: var(--gray-3, #828282);
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        margin: 0px;
      }
      .line{
        border-right: 1px solid  rgba(5, 5, 5, 0.15);
        width: 1px;
      }
      .count{
        color: #050505;
        text-align: center;
        font-feature-settings: 'clig' off, 'liga' off;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 37.502px;
        letter-spacing: -0.344px;
        margin: 0px;
      }
    }
}
</style>