import { BrowserWindowApi } from '@widget-js/core'

export class WindowUtils {
  static open(url: string) {
    BrowserWindowApi.openUrl(`${url}`, { width: 400, height: 700, frame: true, transparent: false })
  }
}
