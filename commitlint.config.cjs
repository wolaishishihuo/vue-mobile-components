module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型定义
    'type-enum': [
      2,
      'always',
      [
        'feat',      // 新功能 feature
        'fix',       // 修复 bug
        'docs',      // 文档注释
        'style',     // 代码格式(不影响代码运行的变动)
        'refactor',  // 重构、优化(既不增加新功能，也不是修复bug)
        'perf',      // 性能优化
        'test',      // 增加测试
        'chore',     // 构建过程或辅助工具的变动
        'revert',    // 回退
        'build'      // 打包
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0],
    // subject 不允许为空
    'subject-empty': [2, 'never'],
    // subject 以什么为结束标志，禁用
    'subject-full-stop': [0, 'never'],
    // type 必须小写
    'type-case': [2, 'always', 'lower-case'],
    // type 不能为空
    'type-empty': [2, 'never']
  }
}
