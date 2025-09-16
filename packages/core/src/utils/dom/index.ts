// DOM utilities
export function hasClass(el: Element, className: string): boolean {
  return el.classList.contains(className);
}

export function addClass(el: Element, className: string): void {
  el.classList.add(className);
}

export function removeClass(el: Element, className: string): void {
  el.classList.remove(className);
}

export function toggleClass(el: Element, className: string): void {
  el.classList.toggle(className);
}

export function getScrollTop(): number {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function setScrollTop(value: number): void {
  document.documentElement.scrollTop = value;
  document.body.scrollTop = value;
}
