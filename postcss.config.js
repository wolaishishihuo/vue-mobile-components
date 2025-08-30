// 此文件不支持热更新，修改后需要重启生效

module.exports = {
  plugins: {
    autoprefixer: {},
    // https://github.com/wswmsword/postcss-mobile-forever
    'postcss-mobile-forever': {
      // UI 设计稿宽度
      viewportWidth: file => (file.includes('vant') ? 375 : 750),
      // 限制视图的最大宽度
      maxDisplayWidth: 750,
      // 页面最外层选择器
      appSelector: '#app',
      // 是否对「页面最外层选择器」对应的元素进行描边
      border: true,
      // 转换单位后保留的小数点位数
      unitPrecision: 3,
      // 转换后的单位
      mobileUnit: 'vw',
      // 需要转换的属性
      propList: ['*'],
      // 忽略的选择器
      selectorBlackList: ['.ignore', 'keep-px', 'el-'],
      // 忽略的属性
      propertyBlackList: {
        '.van-icon': 'font'
      },
      // 忽略的属性值
      valueBlackList: ['1px'],
      // 忽略的目录或文件
      exclude: [/node_modules/]
    }
  }
}
