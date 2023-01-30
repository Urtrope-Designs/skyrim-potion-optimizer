import { IDLCInstance } from "../types/DLCInstance";
import { IIngredient } from "../types/Ingredient";
import { IRecipe } from "../types/Recipe";

export const TEST_RECIPES: IRecipe[] = [
    {
        id: 0,
        ingredientIds: [0,1],
        standardEffects: ['eff1', 'eff2'],
    },
    {
        id: 1,
        ingredientIds: [1,2],
        standardEffects: ['eff3', 'eff4'],
    },
    {
        id: 2,
        ingredientIds: [1,2,3],
        standardEffects: ['eff3', 'eff4'],
    }
];
export const TEST_INGREDIENTS: IIngredient[] = [
    {
        id: 0,
        name: 'ing1',
        dLCId: null,
    },
    {
        id: 1,
        name: 'ing2',
        dLCId: null,
    },
    {
        id: 2,
        name: 'ing3',
        dLCId: 0,
    },
    {
        id: 3,
        name: 'ing4',
        dLCId: 1,
    },
];
export const TEST_DLCS: IDLCInstance[] = [
    {
        id: 0,
        name: 'DLC1',
    },
    {
        id: 1,
        name: 'DLC2',
    },
]