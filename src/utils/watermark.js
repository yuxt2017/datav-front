let watermark = {}

let setWatermark = (str,str2) => {
  let id = '1.23452384164.123412415'

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  let can = document.createElement('canvas')
  can.width = 120
  can.height = 70

  let cans = can.getContext('2d')
  cans.rotate(30* Math.PI / 360)
  cans.font = '16px Avenir'
  cans.fillStyle = 'rgba(200, 200, 200, 0.60)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(str, 20, 20)
  cans.fillText(str2, 40, 40)

  let div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '0'
  div.style.left = '0'
  div.style.position = 'fixed'
  div.style.zIndex = '998'
  div.style.width = document.documentElement.clientWidth + 'px'
  div.style.height = document.documentElement.clientHeight + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return id
}

// 该方法只允许调用一次
watermark.set = (str, str2) => {
  let id = setWatermark(str, str2)
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(str, str2)
    }
  }, 500)
  window.onresize = () => {
    setWatermark(str, str2)
  }
}

// 添加水印
// const watermark = (setting) => {
//   let autoWidth = (document.body.clientWidth / 4 === 80) ? 73 : document.body.clientWidth / 4 - 10
//   // 默认设置
//   var defaultSettings = {
//     watermark_txt: 'text',
//     watermark_x: 15, // 水印起始位置x轴坐标
//     watermark_y: 15, // 水印起始位置Y轴坐标
//     watermark_rows: 7, // 水印行数
//     watermark_cols: 3, // 水印列数
//     watermark_x_space: 5, // 水印x轴间隔
//     watermark_y_space: 10, // 水印y轴间隔
//     watermark_color: '#aaa', // 水印字体颜色
//     watermark_alpha: 0.4, // 水印透明度
//     watermark_fontsize: '12px', // 水印字体大小
//     watermark_font: '微软雅黑', // 水印字体
//     //                watermark_width:90,    //水印宽度
//     watermark_width: autoWidth, // 水印宽度
//     watermark_height: 40, // 水印长度
//     watermark_angle: 15 // 水印倾斜度数
//   }
//   // 采用配置项替换默认值
//   if (arguments.length === 1 && typeof arguments[0] === 'object') {
//     var src = arguments[0] || {}
//     for (let key in src) {
//       for (let keyD in defaultSettings) {
//         if (key === keyD) {
//           defaultSettings[keyD] = src[key]
//         }
//       }
//     }
//   }

//   var oTemp = document.createDocumentFragment()

//   // 获取页面最大宽度
//   var page_width = Math.max(document.body.scrollWidth, document.body.clientWidth)
//   var cutWidth = page_width * 0.0150
//   var page_width = page_width - cutWidth
//   // 获取页面最大高度
//   //            var page_height = Math.max(document.body.scrollHeight,document.body.clientHeight)+450
//   var page_height = parseInt(window.getComputedStyle(document.getElementsByClassName('stepTwoContentTouch')[0]).height.slice(0, -2))

//   // var page_height = document.body.scrollHeight+document.body.scrollTop
//   // 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
//   if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
//     defaultSettings.watermark_cols = parseInt((page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space))

//     // 如果列数超标，最好不要重新计算x间距
//     defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1))
//   }
//   // 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔

//   // 自适应行数
//   defaultSettings.watermark_rows = parseInt((page_height - defaultSettings.watermark_y + defaultSettings.watermark_y_space) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space))

//   console.log(defaultSettings.watermark_rows)

//   if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
//     defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space))

//     console.log(defaultSettings.watermark_rows)

//     defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1))
//   }

//   var x
//   var y
//   for (var i = 0; i < defaultSettings.watermark_rows; i++) {
//     y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i

//     var mask_div_outer = document.createElement('div')

//     for (var j = 0; j < defaultSettings.watermark_cols + 1; j++) {
//       //                    x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j
//       x = defaultSettings.watermark_x + (document.body.clientWidth / defaultSettings.watermark_cols - defaultSettings.watermark_width - defaultSettings.watermark_x_space) * j

//       var mask_div = document.createElement('div')
//       mask_div.id = 'mask_div' + i + j
//       mask_div.className = 'mask_div'
//       mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt))
//       // 设置水印div倾斜显示
//       mask_div.style.webkitTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
//       mask_div.style.MozTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
//       mask_div.style.msTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
//       mask_div.style.OTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
//       mask_div.style.transform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
//       mask_div.style.visibility = ''
//       //                    mask_div.style.position = "absolute"
//       mask_div.style.position = 'relative'
//       //                    mask_div.style.left = x + 'px'
//       //                    mask_div.style.top = y + 'px'
//       mask_div.style.overflow = 'hidden'
//       mask_div.style.zIndex = '9999'
//       //                    mask_div.style.zIndex = "0"
//       mask_div.style.pointerEvents = 'none'; // pointer-events:none  让水印不遮挡页面的点击事件
//       // mask_div.style.border="solid #eee 1px"
//       mask_div.style.opacity = defaultSettings.watermark_alpha
//       mask_div.style.fontSize = defaultSettings.watermark_fontsize
//       //                    mask_div.style.fontSize = '12px'
//       mask_div.style.fontFamily = defaultSettings.watermark_font
//       mask_div.style.color = defaultSettings.watermark_color
//       mask_div.style.textAlign = 'center'
//       mask_div.style.width = defaultSettings.watermark_width + 'px'
//       mask_div.style.height = defaultSettings.watermark_height + 'px'
//       //                    mask_div.style.display = "block"
//       mask_div.style.display = 'inline-block'

//       mask_div_outer.id = 'mask_div_outer' + i
//       mask_div_outer.style.width = '100%'
//       //                    mask_div_outer.style.position = "relative"
//       mask_div_outer.style.position = 'absolute'
//       //                    mask_div_outer.style.display = 'inline-block'
//       mask_div_outer.style.display = 'flex'
//       mask_div_outer.style.justifyContent = 'space-around'
//       //                    mask_div_outer.style.justifyContent = 'center'
//       mask_div_outer.style.alignItems = 'center'
//       mask_div_outer.style.top = y + 'px'

//       mask_div_outer.appendChild(mask_div)

//     //                    oTemp.appendChild(mask_div)
//     }
//     oTemp.appendChild(mask_div_outer)
//   }
//   //            document.body.appendChild(oTemp)
//   //            document.getElementsByClassName('stepTwoContentTouch')[0].appendChild(oTemp)
//   let watermarkDiv = document.createElement('div')
//   watermarkDiv.id = 'watermarkDiv'
//   watermarkDiv.style.position = 'absolute'
//   watermarkDiv.style.top = 0
//   watermarkDiv.style.width = '100%'
//   //            watermarkDiv.style.overflow = 'hidden'

//   document.getElementsByClassName('stepTwoContentTouch')[0].appendChild(watermarkDiv)

//   document.getElementById('watermarkDiv').appendChild(oTemp)
// }

export default watermark
