import {describe, expect, it} from "vitest";
import {BytesUtils} from "../src/utils/BytesUtils";

describe('BytesUtils', () => {
    it('prettyKilobyte', async () => {
        const mb = BytesUtils.prettyKilobyte(1024)
        const mb2 = BytesUtils.prettyKilobyte(1024 + 124)
        const gb = BytesUtils.prettyKilobyte(1024 * 1024)
        const tb = BytesUtils.prettyKilobyte(1024 * 1024 * 1024)
        expect(mb).toBe('1 MB')
        expect(mb2).toBe('1.12 MB')
        expect(gb).toBe('1 GB')
        expect(tb).toBe('1 TB')
    })
});