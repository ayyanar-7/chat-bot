<template>
    <div ref="chart"></div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  
  export default {
    name: 'PieChart',
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    mounted() {
      this.createChart(this.data);
    },
    watch: {
        data(newData) {
            this.updateChart(newData);
        }
    },
    methods: {
        updateChart(newData){
            d3.select(this.$refs.chart).select("svg").remove();
            this.createChart(newData);
        },
      createChart(data) {
        // const data = this.data;
  
        const width = 928;
        const height = Math.min(width, 500);
  
        const color = d3.scaleOrdinal()
          .domain(data.map(d => d.name))
          .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());
  
        const pie = d3.pie()
          .sort(null)
          .value(d => d.value);
  
        const arc = d3.arc()
          .innerRadius(0)
          .outerRadius(Math.min(width, height) / 2 - 1);
  
        const labelRadius = arc.outerRadius()() * 0.8;
  
        const arcLabel = d3.arc()
          .innerRadius(labelRadius)
          .outerRadius(labelRadius);
  
        const arcs = pie(data);
        const that = this;
        const svg = d3.select(this.$refs.chart)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-width / 2, -height / 2, width, height])
          .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;")
          .on("click", function (event) {
                console.log(that,'heeeeeeeeeeeeeeeee',event);
                that.$emit('drillData', event.target.__data__?.data?.name);
                // const currentOpacity = d3.select(event.target).style("opacity");
                
                console.log(d3.select(event.target)
                .style("opacity"),'ttttttttttttttttttt');
                d3.selectAll('path')
                        .transition()
                        .duration(100)
                        .style("opacity", 0.3);
                    d3.select(event.target).transition()
                        .duration(100)
                        .style("opacity", 1);
                // if (d3.select(event.target)
                //         .style("opacity") == 1) {
                //     d3.selectAll('path')
                //         .transition()
                //         .duration(100)
                //         .style("opacity", 0.3);
                //     d3.select(event.target).transition()
                //         .duration(100)
                //         .style("opacity", 1);
                // } else {
                //     d3.selectAll('path')
                //         .transition()
                //         .duration(100)
                //         .style("opacity", 1);
                // }
          })
  
        svg.append("g")
          .attr("stroke", "white")
          .selectAll("path")
          .data(arcs)
          .join("path")
          .attr("fill", d => color(d.data.name))
          .attr("d", arc)
          .append("title")
          .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);
  
        svg.append("g")
          .attr("text-anchor", "middle")
          .selectAll("text")
          .data(arcs)
          .join("text")
          .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
          
          .call(text => text.append("tspan")
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .text(d => d.data.name))
          .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text(d => d.data.value.toLocaleString("en-US")))
      }
    }
  };
  </script>
  
  <style scoped>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  </style>
  