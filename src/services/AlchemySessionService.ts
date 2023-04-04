import { IAlchemySession } from "../types/AlchemySession";
import { INavigationListGroupingViewmodel } from "../types/NavigationListGroupingViewmodel";
import { INavigationListItemViewmodel } from "../types/NavigationListItemViewmodel";
import { dataManager } from "./DataManager";

export const alchemySessionService = {
    getById: (id: number, availableAlchemySessions: IAlchemySession[]): IAlchemySession => {
        const session = availableAlchemySessions.find(session => session.id === id);
        if (session === undefined) {
            throw new Error('Invalid alchemySessionId provided: ' + id);
        }

        return session;
    },
    getNavListViewmodels: (alchemySessions: IAlchemySession[]): INavigationListGroupingViewmodel[] => {
        const viewmodel: INavigationListGroupingViewmodel[] = alchemySessions.reduce((groupings: INavigationListGroupingViewmodel[], curSession: IAlchemySession) => {
            const alchemySessionViewmodel = getNavListItemViewmodel(curSession);
            const existingGrouping = groupings.find(grouping => grouping.groupingLabel.localeCompare(curSession.sessionCategory) === 0);
            if (existingGrouping) {
                existingGrouping.items.push(alchemySessionViewmodel);
            } else {
                const newGrouping: INavigationListGroupingViewmodel = {
                    groupingLabel: curSession.sessionCategory,
                    items: [alchemySessionViewmodel],
                }
                groupings.push(newGrouping);
            }

            return groupings;
        }, [] as INavigationListGroupingViewmodel[]);

        return viewmodel;

        function getNavListItemViewmodel(alchemySession: IAlchemySession): INavigationListItemViewmodel {
            const viewmodel: INavigationListItemViewmodel = {
                labelText: alchemySession.name,
                clickHandler: () => dataManager.updateAlchemySessionSelection(alchemySession.id),
            }

            return viewmodel;
        }
    },
}