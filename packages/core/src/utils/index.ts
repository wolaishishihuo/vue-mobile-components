// Re-export utility categories
export * from './dom';
export * from './format';
export * from './validate';

// Legacy utilities (deprecated - use category exports instead)
/**
 * 防抖函数
 * @param fn 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (..._args: any[]) => any>(
  fn: T,
  delay: number
): (..._args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (..._args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(..._args), delay);
  };
}

/**
 * 节流函数
 * @param fn 要节流的函数
 * @param delay 间隔时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (..._args: any[]) => any>(
  fn: T,
  delay: number
): (..._args: Parameters<T>) => void {
  let lastTime = 0;
  return (..._args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn(..._args);
    }
  };
}

/**
 * 深度克隆对象
 * @param obj 要克隆的对象
 * @returns 克隆后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
}

/**
 * 生成唯一ID
 * @returns 唯一ID字符串
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * 检查是否为空值
 * @param value 要检查的值
 * @returns 是否为空
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * 获取文件扩展名
 * @param filename 文件名
 * @returns 文件扩展名
 */
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}
