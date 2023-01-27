import { IDLCInstance } from "../types/DLCInstance";
import { IRecipe } from "../types/Recipe";

export const STORAGE_KEY_INCLUDED_DLCS = 'SPO_SK_INCLUDED_DLCS';
export const STORAGE_KEY_SELECTED_RECIPES = 'SPO_SK_SELECTED_RECIPES';
export const DLC_MAPPINGS: IDLCInstance[] = [
    {
        id: 0,
        name: 'Dawnguard',
        ingredients: [],
    },
    {
        id: 1,
        name: 'Dragonborn',
        ingredients: [],
    },
    {
        id: 2,
        name: 'Hearthfire',
        ingredients: [],
    },
    {
        id: 3,
        name: 'Creation Club',
        ingredients: [],
    },
];
export const BEST_RECIPES: IRecipe[] = [
    {
        id: 0,
        ingredients: ['Garlic', 'Nordic Barnacle', 'Salmon Roe'],
        standardEffects: ['Regenerate Health', 'Regenerate Magicka', 'Waterbreathing'],
    },
    {
        id: 1,
        ingredients: ['Chicken\'s Egg', 'Nightshade', 'Salmon Roe'],
        standardEffects: ['Damage Magicka Regen', 'Lingering Damage Stamina', 'Waterbreathing'],
    },
    {
        id: 2,
        ingredients: ['Histcarp', 'Jazbay Grapes', 'Salmon Roe'],
        standardEffects: ['Fortify Magicka', 'Regenerate Magicka', 'Restore Stamina', 'Waterbreathing'],
    },
    {
        id: 5,
        ingredients: ['Bear Claws', 'Giant\'s Toe', 'Hanging Moss'],
        standardEffects: ['Damage Magicka Regen', 'Fortify Health', 'Fortify One-handed'],
    },
    {
        id: 6,
        ingredients: ['Blue Butterfly Wing', 'Blue Mountain Flower', 'Giant\'s Toe'],
        standardEffects: ['Damage Magicka Regen', 'Damage Stamina', 'Fortify Conjuration', 'Fortify Health'],
    },
    {
        id: 7,
        ingredients: ['Creep Cluster', 'Giant\'s Toe', 'Hanging Moss'],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Fortify Health'],
    },
    {
        id: 8,
        ingredients: ['Bear Claws', 'Creep Cluster', 'Giant\'s Toe'],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Fortify Health'],
    },
    {
        id: 9,
        ingredients: ['Blue Mountain Flower', 'Creep Cluster', 'Giant\'s Toe'],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Fortify Health'],
    },
    {
        id: 10,
        ingredients: ['Glow Dust', 'Glowing Mushroom', 'Hanging Moss'],
        standardEffects: ['Damage Magicka', 'Damage Magicka Regen', 'Fortify Destruction', 'Fortify Health', 'Resist Shock'],
    },
    {
        id: 11,
        ingredients: ['Creep Cluster', 'Large Antlers', 'River Better'],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
    },
    {
        id: 12,
        ingredients: ['Creep Cluster', 'Deathbell', 'River Better'],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
    },
    {
        id: 13,
        ingredients: ['Deathbell', 'River Better', 'Wisp Wrappings'],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
    },
    {
        id: 14,
        ingredients: ['Deathbell', 'River Better', 'Scaly Pholiota'],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
    },
]