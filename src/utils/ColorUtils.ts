export class ColorUtils {
  static getProcessColor(percentage: number) {
    if (percentage > 90) { return '#ff4d4f' } // danger (red)
    if (percentage > 60) { return '#ffa940' } // warning (orange)
    if (percentage < 20) { return '#52c41a' } // success (green)
    return '#1890ff' // info (blue)
  }
}
