import { sum } from "./test.js";

describe('Testing!', () => {
    let total = sum(2, 2);
    
    test('2+2 equal to 4', () => {
        expect(total).toBe(4);
    });
});
