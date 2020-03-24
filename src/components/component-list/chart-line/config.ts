// tslint:disable
export default  {
  name: '基本折线图',
  componentName: 'ChartLine',
  panelName: 'ChartLinePanel',
  width: 300,
  height: 300,
  x: 100,
  y: 100,
  option: {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      bottom: 35,
      top: 20,
      left: 50,
      right: 20
    },
    xAxis: [
      {
        type: 'category',
        data: ['x1', 'x2', 'x3', 'x4'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          textStyle: {
            color: 'rgba(255,255,255,0.58)'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.22)'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.22)'
          }
        },
        axisLabel: {
          textStyle: {
            color: 'rgba(255,255,255,0.58)'
          }
        }
      }
    ],
    series: [
      {
        name: 'x-value',
        type: 'line',
        barWidth: '60%',
        data: [20, 30, 50, 60]
      }
    ]
  }
}
