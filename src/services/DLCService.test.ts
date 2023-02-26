import { IDLCInstance } from "../types/DLCInstance";
import { IDLCViewmodel } from "../types/DLCViewmodel";
import { TEST_DLCS } from "../utils/TestUtils";
import { dLCService } from "./DLCService";

describe('DLCService', () => {
    describe('#getDLCInstancesById', () => {
        test('returns a DLCInstance with a valid id', () => {
            const testId = 0;
            const expectedRecipes = [TEST_DLCS[testId]];

            const result = dLCService.getDLCInstancesById([testId], TEST_DLCS);

            expect(result).toEqual(expectedRecipes);
        });

        test('throws error if dLCId is not found in allDLCs', () => {
            const testId = TEST_DLCS.length;
            expect(() => dLCService.getDLCInstancesById([testId], TEST_DLCS)).toThrow();
        });
    });
    
    describe('getDLCViewmodels', () => {
        test('builds DLC viewmodel', () => {
            const testDLCs: IDLCInstance[] = TEST_DLCS.slice(0,2);
            const expectedVM: IDLCViewmodel[] = [
                {
                    dLCId: testDLCs[0].id,
                    dLCName: testDLCs[0].name,
                    isSelected: true,
                },
                {
                    dLCId: testDLCs[1].id,
                    dLCName: testDLCs[1].name,
                    isSelected: false,
                },
            ];

            const result = dLCService.getDLCViewmodels(testDLCs, [0]);

            expect(result).toEqual(expectedVM);
        });
    });
})