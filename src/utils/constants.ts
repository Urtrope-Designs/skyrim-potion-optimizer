import { IAvailabilityOptionsSelection } from "../types/AvailabilityOptionsSelection";
import { IDLCInstance } from "../types/DLCInstance";
import { IIngredient } from "../types/Ingredient";
import { IMerchantAvailabilityLevel } from "../types/MerchantAvailabilityLevel";
import { IRecipe } from "../types/Recipe";

export const STORAGE_KEY_INCLUDED_DLCS = 'SPO_SK_INCLUDED_DLCS';
export const STORAGE_KEY_SELECTED_RECIPES = 'SPO_SK_SELECTED_RECIPES';

export const DEFAULT_AVAILABILITY_OPTIONS_SELECTION: IAvailabilityOptionsSelection = {
    noMerchants: true,
};

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
        //1761
    },
    {
        id: 1,
        ingredientIds: [23, 71, 84],
        standardEffects: ['Damage Magicka Regen', 'Lingering Damage Stamina', 'Waterbreathing'],
        //1691
    },
    {
        id: 2,
        ingredientIds: [54, 61, 84],
        standardEffects: ['Fortify Magicka', 'Regenerate Magicka', 'Restore Stamina', 'Waterbreathing'],
        //1689
    },
    {
        id: 5,
        ingredientIds: [5, 43, 50],
        standardEffects: ['Damage Magicka Regen', 'Fortify Health', 'Fortify One-handed'],
        //795
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
// SR, fungus stalk, garlic (2091: waterbreathing, fortify stamina, magicka regen)
// try salmon roe, histcarp, salt pile (1689); also combinations of 
// chicken's egg, SR, garlic (1597)
// chix egg, sr, salt pile (1597)
// chix egg, sr, nordic barnacle (1597: waterbreathing, magicka regen)
// chix egg, sr, nordic barnacle (1432)

//sr, salt, garlic (164)

export const ALL_INGREDIENTS: IIngredient[] = [
    {
        dLCId: null,
        id: 5,
        merchantAvailabilityId: 5,
        name: 'Bear Claws',
    },
    {
        dLCId: null,
        id: 11,
        merchantAvailabilityId: 2,
        name: 'Blue Butterfly Wing',
    },
    {
        dLCId: null,
        id: 13,
        merchantAvailabilityId: 3,
        name: 'Blue Mountain Flower',
    },
    {
        dLCId: null,
        id: 23,
        merchantAvailabilityId: 2,
        name: 'Chicken\'s Egg',
    },
    {
        dLCId: null,
        id: 24,
        merchantAvailabilityId: 2,
        name: 'Creep Cluster',
    },
    {
        dLCId: null,
        id: 28,
        merchantAvailabilityId: 1,
        name: 'Deathbell',
    },
    {
        dLCId: null,
        id: 41,
        merchantAvailabilityId: 3,
        name: 'Garlic',
    },
    {
        dLCId: null,
        id: 43,
        merchantAvailabilityId: 1,
        name: 'Giant\'s Toe',
    },
    {
        dLCId: null,
        id: 45,
        merchantAvailabilityId: 2,
        name: 'Glow Dust',
    },
    {
        dLCId: null,
        id: 46,
        merchantAvailabilityId: 0,
        name: 'Glowing Mushroom',
    },
    {
        dLCId: null,
        id: 50,
        merchantAvailabilityId: 2,
        name: 'Hanging Moss',
    },
    {
        dLCId: null,
        id: 54,
        merchantAvailabilityId: 3,
        name: 'Histcarp',
    },
    {
        dLCId: null,
        id: 61,
        merchantAvailabilityId: 1,
        name: 'Jazbay Grapes',
    },
    {
        dLCId: null,
        id: 63,
        merchantAvailabilityId: 5,
        name: 'Large Antlers',
    },
    {
        dLCId: null,
        id: 71,
        merchantAvailabilityId: 0,
        name: 'Nightshade',
    },
    {
        dLCId: null,
        id: 73,
        merchantAvailabilityId: 2,
        name: 'Nordic Barnacle',
    },
    {
        dLCId: null,
        id: 81,
        merchantAvailabilityId: 3,
        name: 'River Betty',
    },
    {
        dLCId: 2,
        id: 84,
        merchantAvailabilityId: 0,
        name: 'Salmon Roe',
    },
    {
        dLCId: null,
        id: 86,
        merchantAvailabilityId: 2,
        name: 'Scaly Pholiota',
    },
    {
        dLCId: null,
        id: 109,
        merchantAvailabilityId: 5,
        name: 'Wisp Wrappings',
    },
]

const ALL_MERCHANT_AVAILABILITY_LEVELS: IMerchantAvailabilityLevel[] = [
    {
        id: 0,
        name: 'None',
    },
    {
        id: 1,
        name: 'Rare',
    },
    {
        id: 2,
        name: 'Uncommon',
    },
    {
        id: 3,
        name: 'Common',
    },
    {
        id: 4,
        name: 'Rare with Merchant perk',
    },
    {
        id: 5,
        name: 'Uncommon with Merchant perk',
    },
    {
        id: 6,
        name: 'Common with Merchant perk',
    },
];