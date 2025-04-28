export class IpUtils {
  static ipv4Regex = /^(25[0-5]|2[0-4]\d|[01]?\d{1,2})\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})$/
  static checkIpV4(ip: string): boolean {
    return this.ipv4Regex.test(ip)
  }

  static checkIpV6(ip: string): boolean {
    if (ip === '::1') {
      return true
    }
    else if (ip === '::') {
      return true
    }
    const ipV6Pattern = /^(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$/i
    return ipV6Pattern.test(ip)
  }

  /**
   * 给ip加上*** 掩码
   * @param ip
   */
  static mask(ip: string): string {
    if (this.checkIpV4(ip)) {
      const parts = ip.split('.')
      return `${parts[0]}.**.**.**`
    }
    return ip
  }
}
