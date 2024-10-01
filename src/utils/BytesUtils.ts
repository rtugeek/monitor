export class BytesUtils {
    /**
     * kilobyte to human-readable string
     * @param num
     */
    static prettyKilobyte(num: number): string {
        const sizes = ['KB', 'MB', 'GB', 'TB'];
        let index = 0;

        while (num >= 1024 && index < sizes.length - 1) {
            num /= 1024;
            index++;
        }
        return `${num.toFixed(2).replace('.00', '')} ${sizes[index]}`;
    }

    /**
     * human-readable string to kilobyte
     * @param text
     */
    static parseKilobyte(text: string): number {
        let speed = 0
        let str = text.replace('/s','')
        if (str.includes('KB')) {
            speed = Number.parseInt(str.replace('KB', ''));
        } else if (str.includes('MB')) {
            speed = Number.parseInt(str.replace('MB', '')) * 1024;
        } else if (str.includes('GB')) {
            speed = Number.parseInt(str.replace('GB', '')) * 1024 * 1024;
        }else if (str.includes('TB')) {
            speed = Number.parseInt(str.replace('TB', '')) * 1024 * 1024 * 1024;
        }
        return speed;
    }
}