export type AndroidApiType =
  'AndroidPomodoroSceneRepository'
  | 'AndroidApi'
  | 'AndroidUserApi'
  | 'AndroidMomentRepository'
  | 'AndroidAppSettingApi'
  | 'AndroidClipboardApi'
  | 'AndroidPomodoroHistoryRepository'

export class AndroidApi {
  static hasApi() {
    return this.getApi() != undefined
  }

  private static getApi(): any {
    return window.AndroidApi
  }

  static back() {
    this.getApi().back()
  }

  static request<T>(api: AndroidApiType, method: string, ...params: string[]): T | null {
    const nativeApi = window[api] as any
    if (nativeApi) {
      const data = nativeApi[method](...params)
      if (data) {
        return JSON.parse(data) as T
      }
      else {
        return null
      }
    }
    else {
      throw new Error(`Android Api ${api} not found`)
    }
  }

  static requestString<T>(api: AndroidApiType, method: string, ...params: string[]): T | null {
    const nativeApi = window[api] as any
    if (nativeApi) {
      const data = nativeApi[method](...params)
      if (data) {
        return data
      }
      else {
        return null
      }
    }
    else {
      throw new Error(`Android Api ${api} not found`)
    }
  }

  static getLanguage() {
    return this.requestString<string>('AndroidApi', 'getLanguage')
  }

  static getAccessToken() {
    return this.requestString<string>('AndroidApi', 'getAccessToken')
  }

  static getDebugInfo() {
    return this.request<DebugInfo>('AndroidApi', 'getDebugInfo')
  }
}

export interface DebugInfo {
  systemVersion: string
  brand: string
  device: string
  manufacture: string
  product: string
  appVersionName: string
  appVersionCode: number
  screenSize: string
  userId?: number // 可为空，表示用户未登录
  premium: boolean
}
