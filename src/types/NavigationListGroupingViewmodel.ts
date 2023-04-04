import { INavigationListItemViewmodel } from "./NavigationListItemViewmodel";

export interface INavigationListGroupingViewmodel {
    groupingLabel: string;
    items: INavigationListItemViewmodel[];
}