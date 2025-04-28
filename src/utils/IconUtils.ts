import type { ServerPlatform } from '@/data/ServerInfo'
import Alibaba from '@/assets/cloud/alibaba.png'
import Aws from '@/assets/cloud/aws.png'
import Azure from '@/assets/cloud/azure.png'
import Google from '@/assets/cloud/google.png'
import Huawei from '@/assets/cloud/huawei.png'
import Other from '@/assets/cloud/other.png'
import Tencent from '@/assets/cloud/tencent.png'
import TianYi from '@/assets/cloud/tianyi.png'
import Ucloud from '@/assets/cloud/ucloud.png'
import AlibabaCloudLinux from '@/assets/os/alibaba_cloud_linux.png'
import Centos from '@/assets/os/centos.png'
import Debian from '@/assets/os/debian.png'
import Linux from '@/assets/os/linux.png'
import Redhat from '@/assets/os/redhat.png'
import Suse from '@/assets/os/suse.png'
import Ubuntu from '@/assets/os/ubuntu.png'
import Windows from '@/assets/os/windows_server.png'

export class IconUtils {
  static getOsIcon(os: string) {
    if (os.toLowerCase().includes('ubuntu')) {
      return Ubuntu
    }
    else if (os.toLowerCase().includes('centos')) {
      return Centos
    }
    else if (os.toLowerCase().includes('windows')) {
      return Windows
    }
    else if (os.toLowerCase().includes('redhat')) {
      return Redhat
    }
    else if (os.toLowerCase().includes('debian')) {
      return Debian
    }
    else if (os.toLowerCase().includes('alibaba')) {
      return AlibabaCloudLinux
    }
    else if (os.toLowerCase().includes('suse')) {
      return Suse
    }
    else {
      return Linux
    }
  }

  static getPlatformIcon(platform: ServerPlatform) {
    if (platform === 'Alibaba Cloud') {
      return Alibaba
    }
    else if (platform === 'AWS') {
      return Aws
    }
    else if (platform === 'Azure') {
      return Azure
    }
    else if (platform === 'Google Cloud') {
      return Google
    }
    else if (platform === 'Huawei Cloud') {
      return Huawei
    }
    else if (platform === 'Tencent Cloud') {
      return Tencent
    }
    else if (platform === 'UCloud') {
      return Ucloud
    }
    else if (platform === '天翼云') {
      return TianYi
    }
    else {
      return Other
    }
  }
}
