import { IRecipe } from "../types/Recipe";

export const STORAGE_KEY_SELECTED_RECIPES = 'SPO_SK_SELECTED_RECIPES';
export const BEST_RECIPES: IRecipe[] = [
    {
        id: 0,
        standardEffects: ['Damage Magicka Regen', 'Fortify Health', 'Fortify One-handed'],
        ingredients: ['Bear Claws', 'Giant\'s Toe', 'Hanging Moss'],
    },
    {
        id: 1,
        standardEffects: ['Damage Magicka Regen', 'Damage Stamina', 'Fortify Conjuration', 'Fortify Health'],
        ingredients: ['Blue Butterfly Wing', 'Blue Mountain Flower', 'Giant\'s Toe'],
    },
    {
        id: 2,
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Fortify Health'],
        ingredients: ['Creep Cluster', 'Giant\'s Toe', 'Hanging Moss'],
    },
    {
        id: 3,
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Fortify Health'],
        ingredients: ['Bear Claws', 'Creep Cluster', 'Giant\'s Toe'],
    },
    {
        id: 4,
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Fortify Health'],
        ingredients: ['Blue Mountain Flower', 'Creep Cluster', 'Giant\'s Toe'],
    },
    {
        id: 5,
        standardEffects: [],
        ingredients: ['Garlic', 'Nordic Barnacle', 'Salmon Roe'],
    },
    {
        id: 6,
        standardEffects: [],
        ingredients: ['Chicken\'s Egg', 'Nightshade', 'Salmon Roe'],
    },
    {
        id: 7,
        standardEffects: [],
        ingredients: ['Histcarp', 'Jazbay Grapes', 'Salmon Roe'],
    },
    {
        id: 10,
        standardEffects: ['Damage Magicka', 'Damage Magicka Regen', 'Fortify Destruction', 'Fortify Health', 'Resist Shock'],
        ingredients: ['Glow Dust', 'Glowing Mushroom', 'Hanging Moss'],
    },
    {
        id: 11,
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
        ingredients: ['Creep Cluster', 'Large Antlers', 'River Better'],
    },
    {
        id: 12,
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
        ingredients: ['Creep Cluster', 'Deathbell', 'River Better'],
    },
    {
        id: 13,
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
        ingredients: ['Deathbell', 'River Better', 'Wisp Wrappings'],
    },
    {
        id: 14,
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
        ingredients: ['Deathbell', 'River Better', 'Scaly Pholiota'],
    },
]