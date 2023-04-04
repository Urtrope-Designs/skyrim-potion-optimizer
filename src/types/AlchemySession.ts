import { IRecipe } from "./Recipe";

export type AlchemySessionCategory = 'Best leveling potions';

export interface IAlchemySession {
    filterRecipePredicate: (recipe: IRecipe) => boolean;
    id: number;
    name: string;
    sessionCategory: AlchemySessionCategory; 
}
