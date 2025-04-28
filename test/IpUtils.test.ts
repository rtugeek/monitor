import { describe, expect, it } from 'vitest'
import { IpUtils } from '../src/utils/IpUtils'

describe('ipUtils', () => {
  describe('checkIpV4', () => {
    it('should return true for valid IPv4 addresses', () => {
      expect(IpUtils.checkIpV4('192.168.1.1')).toBe(true)
      expect(IpUtils.checkIpV4('255.255.255.255')).toBe(true)
      expect(IpUtils.checkIpV4('0.0.0.0')).toBe(true)
    })

    it('should return false for invalid IPv4 addresses', () => {
      expect(IpUtils.checkIpV4('256.256.256.256')).toBe(false)
      expect(IpUtils.checkIpV4('192.168.1')).toBe(false)
      expect(IpUtils.checkIpV4('192.168.1.256')).toBe(false)
      expect(IpUtils.checkIpV4('abc.def.gha.bcd')).toBe(false)
    })
  })

  // describe('checkIpV6', () => {
  //   it('should return true for valid IPv6 addresses', () => {
  //     expect(IpUtils.checkIpV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true)
  //     expect(IpUtils.checkIpV6('::1')).toBe(true)
  //     expect(IpUtils.checkIpV6('fe80::1ff:fe23:4567:890a')).toBe(true)
  //   })
  //
  //   it('should return false for invalid IPv6 addresses', () => {
  //     expect(IpUtils.checkIpV6('2001:db8:85a3::8a2e:370g:7334')).toBe(false)
  //     expect(IpUtils.checkIpV6('2001:db8:85a3::8a2e:370:7334:')).toBe(false)
  //     expect(IpUtils.checkIpV6('::g')).toBe(false)
  //     expect(IpUtils.checkIpV6('192.168.1.1')).toBe(false) // IPv4 address
  //   })
  // })
})
