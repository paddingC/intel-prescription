/**
 * option 秒--折线图数据
 *
 */
export default {
  state: {
    //秒
    option: {
      title: {
        text: '每秒',
      },
      calculable: true,
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['jvm内存使用率', '物理内存使用率', 'cpu使用率']
      },
      grid: {
        x: 40,
        y: 30,
        x2: 10,
        y2: 35,
        borderWidth: 0,
        borderColor: "#FFFFFF"
      },
      toolbox: {
        show: true,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      xAxis: [{
        axisLabel: {
          rotate: 20,
        },
        type: 'category',// 坐标轴类型，横轴默认为类目型'category'，纵轴默认为数值型'value'
        data: []
      }],
      yAxis: [{
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      }],
      series: [
        {
          name: 'jvm内存使用率',
          type: 'line',
          data: []
        },
        {
          name: '物理内存使用率',
          type: 'line',
          data: []
        },
        {
          name: 'cpu使用率',
          type: 'line',
          data: []
        }]
    },
    //分钟
    optionMin: {
      title: {
        text: '每分钟',
        //subtext: ''
      },
      legend: {
        data: ['最高', '最低']
      },
      calculable: true,
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['jvm内存使用率', '物理内存使用率', 'cpu使用率']
      },
      grid: {
        x: 40,
        y: 30,
        x2: 10,
        y2: 35,
        borderWidth: 0,
        borderColor: "#FFFFFF"
      },
      toolbox: {
        show: true,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      xAxis: [{
        axisLabel: {
          rotate: 20,
        },
        type: 'category',// 坐标轴类型，横轴默认为类目型'category'，纵轴默认为数值型'value'
        data: []
      }],
      yAxis: [{
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      }],
      series: [
        {
          name: 'jvm内存使用率',
          type: 'line',
          data: []
        },
        {
          name: '物理内存使用率',
          type: 'line',
          data: []
        },
        {
          name: 'cpu使用率',
          type: 'line',
          data: []
        }]
    },
    //小时
    optionHour: {
      title: {
        text: '每小时',
        //subtext: '每小时'
      },
      legend: {
        data: ['最高', '最低']
      },
      calculable: true,
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['jvm内存使用率', '物理内存使用率', 'cpu使用率']
      },
      grid: {
        x: 40,
        y: 30,
        x2: 10,
        y2: 35,
        borderWidth: 0,
        borderColor: "#FFFFFF"
      },
      toolbox: {
        show: true,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      xAxis: [{
        axisLabel: {
          rotate: 20,
        },
        type: 'category',// 坐标轴类型，横轴默认为类目型'category'，纵轴默认为数值型'value'
        data: []
      }],
      yAxis: [{
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      }],
      series: [
        {
          name: 'jvm内存使用率',
          type: 'line',
          data: [],
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          }
        },
        {
          name: '物理内存使用率',
          type: 'line',
          data: [],
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          }
        },
        {
          name: 'cpu使用率',
          type: 'line',
          data: [],
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          }
        }]
    },
  },
  // getters: {
  //   getOption(state) {// 对应着上面state
  //     return state.option
  //   }
  // },
  mutations: {
    setOptions(state, option) {
      state.option = option
    },
    setOptionMin(state, optionMin) {
      state.optionMin = optionMin
    },
    setOptionHour(state, optionHour) {
      state.optionHour = optionHour
    }
  },
  actions: {}
}
