import type { ImagePreviewOptions, UploaderFileListItem } from 'vant';

// 定义组件属性
export interface UploaderProps {
  /**
   * 已上传的文件列表
   * 支持字符串数组 ['url1', 'url2'] 或对象数组 [{url: 'url1'}, {url: 'url2'}]
   */
  modelValue: (string | UploaderFileListItem)[];

  /**
   * 是否多选图片
   * @default false
   */
  multiple?: boolean;

  /**
   * 最大上传数量
   * @default Infinity
   */
  maxCount?: number;

  /**
   * 文件大小限制，单位为字节
   * @default Infinity
   */
  maxSize?: number;

  /**
   * 允许的文件格式扩展名数组，不带点，如 ['jpg', 'jpeg', 'png']
   * @default ['jpg', 'jpeg', 'png', 'gif', 'webp']
   */
  formats?: string[];

  /**
   * 是否显示删除按钮
   * @default true
   */
  deletable?: boolean;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否只读状态
   * @default false
   */
  readonly?: boolean;

  /**
   * 是否开启图片预览
   * @default true
   */
  preview?: boolean;

  /**
   * 上传区域的文字
   * @default "上传图片"
   */
  uploadText?: string;

  /**
   * 图片预览配置
   */
  previewOptions?: Partial<ImagePreviewOptions>;

  /**
   * 格式错误提示文本
   * @default "文件格式不正确，请上传{formats}格式的图片"
   */
  formatErrorMsg?: string;
}
