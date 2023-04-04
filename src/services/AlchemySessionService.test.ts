import { INavigationListGroupingViewmodel } from "../types/NavigationListGroupingViewmodel";
import { TEST_ALCHEMY_SESSIONS } from "../utils/TestUtils";
import { alchemySessionService } from "./AlchemySessionService";
import { dataManager } from "./DataManager";

describe('alchemySessionService', () => {
    describe('#getByIds', () => {
        test('returns an alchemySession with a valid id', () => {
            const testId = 0;
            const expectedAlchemySession = TEST_ALCHEMY_SESSIONS[testId];

            const result = alchemySessionService.getById(testId, TEST_ALCHEMY_SESSIONS);

            expect(result).toEqual(expectedAlchemySession);
        });

        test('throws error if alchemySessionId is not found in availableAlchemySessions', () => {
            const testId = TEST_ALCHEMY_SESSIONS.length;

            expect(() => alchemySessionService.getById(testId, TEST_ALCHEMY_SESSIONS)).toThrow();
        });
    });

    describe('#getNavListViewmodels', () => {
        const testAlchemySessions = TEST_ALCHEMY_SESSIONS.slice(0,1);

        test('builds AlchemySession viewmodels', () => {
            const expectedVM: INavigationListGroupingViewmodel[] = [
                {
                    groupingLabel: 'Best leveling potions',
                    items: [expect.objectContaining({labelText: TEST_ALCHEMY_SESSIONS[0].name})],
                },
            ]
            const result = alchemySessionService.getNavListViewmodels(testAlchemySessions);
    
            expect(result).toEqual(expectedVM);
        });

        test('groups together multiple AlchemySessions with the same category name', () => {
            const testAlchemySessions = TEST_ALCHEMY_SESSIONS;

            const expectedVM: INavigationListGroupingViewmodel[] = [
                {
                    groupingLabel: 'Best leveling potions',
                    items: testAlchemySessions.map(s => expect.objectContaining({labelText: s.name})),
                }
            ];
            const result = alchemySessionService.getNavListViewmodels(testAlchemySessions);
        
            expect(result).toEqual(expectedVM);
        });

        test('click handler updates selected alchemySessionId with dataManager', () => {
            const updateAlchemySessionSelectionMock = jest.spyOn(dataManager, 'updateAlchemySessionSelection');
            updateAlchemySessionSelectionMock.mockImplementation(() => Promise.resolve());
            const result = alchemySessionService.getNavListViewmodels(testAlchemySessions);

            result[0].items[0].clickHandler();

            expect(updateAlchemySessionSelectionMock.mock.calls.length).toBe(1);
            expect(updateAlchemySessionSelectionMock).toHaveBeenCalledWith(testAlchemySessions[0].id);

            updateAlchemySessionSelectionMock.mockRestore();
        });
    });
});