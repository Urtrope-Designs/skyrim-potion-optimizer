import { IDLCInstance } from "../types/DLCInstance";
import { IIngredient } from "../types/Ingredient";
import { IRecipe } from "../types/Recipe";

export const STORAGE_KEY_INCLUDED_DLCS = 'SPO_SK_INCLUDED_DLCS';
export const STORAGE_KEY_SELECTED_RECIPES = 'SPO_SK_SELECTED_RECIPES';
export const ALL_DLC_INSTANCES: IDLCInstance[] = [
    {
        id: 0,
        name: 'Dawnguard',
    },
    {
        id: 1,
        name: 'Dragonborn',
    },
    {
        id: 2,
        name: 'Hearthfire',
    },
    {
        id: 3,
        name: 'Creation Club',
    },
];
export const ALL_RECIPES: IRecipe[] = [
    {
        id: 0,
        ingredientIds: [41, 73, 84],
        standardEffects: ['Regenerate Health', 'Regenerate Magicka', 'Waterbreathing'],
    },
    {
        id: 1,
        ingredientIds: [23, 71, 84],
        standardEffects: ['Damage Magicka Regen', 'Lingering Damage Stamina', 'Waterbreathing'],
    },
    {
        id: 2,
        ingredientIds: [54, 61, 84],
        standardEffects: ['Fortify Magicka', 'Regenerate Magicka', 'Restore Stamina', 'Waterbreathing'],
    },
    {
        id: 5,
        ingredientIds: [5, 43, 50],
        standardEffects: ['Damage Magicka Regen', 'Fortify Health', 'Fortify One-handed'],
    },
    {
        id: 6,
        ingredientIds: [11, 13, 43],
        standardEffects: ['Damage Magicka Regen', 'Damage Stamina', 'Fortify Conjuration', 'Fortify Health'],
    },
    {
        id: 7,
        ingredientIds: [24, 43, 50],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Fortify Health'],
    },
    {
        id: 8,
        ingredientIds: [5, 24, 43],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Fortify Health'],
    },
    {
        id: 9,
        ingredientIds: [13, 24, 43],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Fortify Health'],
    },
    {
        id: 10,
        ingredientIds: [45, 46, 50],
        standardEffects: ['Damage Magicka', 'Damage Magicka Regen', 'Fortify Destruction', 'Fortify Health', 'Resist Shock'],
    },
    {
        id: 11,
        ingredientIds: [24, 63, 81],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
    },
    {
        id: 12,
        ingredientIds: [24, 28, 81],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
    },
    {
        id: 13,
        ingredientIds: [28, 81, 109],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
    },
    {
        id: 14,
        ingredientIds: [28, 81, 86],
        standardEffects: ['Damage Stamina Regen', 'Fortify Carry Weight', 'Slow'],
    },
];

export const ALL_INGREDIENTS: IIngredient[] = [
    {
        id: 5,
        name: 'Bear Claws',
        dLCId: null,
    },
    {
        id: 11,
        name: 'Blue Butterfly Wing',
        dLCId: null,
    },
    {
        id: 13,
        name: 'Blue Mountain Flower',
        dLCId: null,
    },
    {
        id: 23,
        name: 'Chicken\'s Egg',
        dLCId: null,
    },
    {
        id: 24,
        name: 'Creep Cluster',
        dLCId: null,
    },
    {
        id: 28,
        name: 'Deathbell',
        dLCId: null,
    },
    {
        id: 41,
        name: 'Garlic',
        dLCId: null,
    },
    {
        id: 43,
        name: 'Giant\'s Toe',
        dLCId: null,
    },
    {
        id: 45,
        name: 'Glow Dust',
        dLCId: null,
    },
    {
        id: 46,
        name: 'Glowing Mushroom',
        dLCId: null,
    },
    {
        id: 50,
        name: 'Hanging Moss',
        dLCId: null,
    },
    {
        id: 54,
        name: 'Histcarp',
        dLCId: null,
    },
    {
        id: 61,
        name: 'Jazbay Grapes',
        dLCId: null,
    },
    {
        id: 63,
        name: 'Large Antlers',
        dLCId: null,
    },
    {
        id: 71,
        name: 'Nightshade',
        dLCId: null,
    },
    {
        id: 73,
        name: 'Nordic Barnacle',
        dLCId: null,
    },
    {
        id: 81,
        name: 'River Better',
        dLCId: null,
    },
    {
        id: 84,
        name: 'Salmon Roe',
        dLCId: 2,
    },
    {
        id: 86,
        name: 'Scaly Pholiota',
        dLCId: null,
    },
    {
        id: 109,
        name: 'Wisp Wrappings',
        dLCId: null,
    },
]