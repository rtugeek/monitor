import { showNotify, showToast } from '@nutui/nutui'
import '@nutui/nutui/dist/packages/notify/style'
import '@nutui/nutui/dist/packages/toast/style'

export class NotificationUtils {
  static error(message: string): void {
  }

  static success(message: string): void {
    showNotify.success(message)
  }

  static warn(message: string): void {
    showNotify.warn(message)
  }

  static toastError(message: string): void {
    showToast.fail(message)
  }

  static toastSuccess(message: string): void {
    showToast.success(message)
  }

  static loading(message: string = 'Loading'): void {
    showToast.loading(message)
  }

  static hide(id?: string): void {
    showToast.hide(id)
  }
}
