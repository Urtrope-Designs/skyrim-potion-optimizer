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
        dLCId: null,
        id: 0,
        merchantAvailabilityId: 0,
        name: 'ing1',
        sourceDescription: 'Collect from things',
    },
    {
        dLCId: null,
        id: 1,
        merchantAvailabilityId: 1,
        name: 'ing2',
        sourceDescription: 'Collect from dead things',
    },
    {
        dLCId: 0,
        id: 2,
        merchantAvailabilityId: 3,
        name: 'ing3',
        sourceDescription: 'Harvest from plants',
    },
    {
        dLCId: 1,
        id: 3,
        merchantAvailabilityId: 4,
        name: 'ing4',
        sourceDescription: 'Buy from merchants',
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