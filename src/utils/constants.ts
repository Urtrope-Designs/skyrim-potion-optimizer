import { IAlchemySession } from "../types/AlchemySession";
import { IAvailabilityOptionsSelection } from "../types/AvailabilityOptionsSelection";
import { IDLCInstance } from "../types/DLCInstance";
import { IIngredient } from "../types/Ingredient";
import { IMerchantAvailabilityLevel } from "../types/MerchantAvailabilityLevel";
import { IRecipe } from "../types/Recipe";

export const STORAGE_KEY_INCLUDED_DLCS = 'SPC_SK_INCLUDED_DLCS';
export const STORAGE_KEY_SELECTED_ALCHEMY_SESSION = 'SPC_SK_SELECTED_ALCHEMY_SESSION';
export const STORAGE_KEY_SELECTED_RECIPES = 'SPC_SK_SELECTED_RECIPES';
export const STORAGE_KEY_AVAILABILITY_OPTIONS = 'SPC_SK_AVAILABILITY_OPTIONS';

export const DEFAULT_AVAILABILITY_OPTIONS_SELECTION: IAvailabilityOptionsSelection = {
    noMerchants: true,
};

export const ALL_ALCHEMY_SESSIONS: IAlchemySession[] = [
    {
        filterRecipePredicate: (recipe: IRecipe) => recipe.ingredientIds.includes(84),
        id: 0,
        name: 'with Salmon Roe',
        sessionCategory: 'Best leveling potions',
    },
    {
        filterRecipePredicate: (recipe: IRecipe) => recipe.ingredientIds.includes(43),
        id: 1,
        name: 'with Giant\'s Toe',
        sessionCategory: 'Best leveling potions',
    },
    {
        filterRecipePredicate: (recipe: IRecipe) => recipe.ingredientIds.find(id => [84,43].includes(id)) === undefined,
        id: 2,
        name: 'without Salmon Roe or Giant\'s Toe',
        sessionCategory: 'Best leveling potions',
    },
];

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

export const ALL_INGREDIENTS: IIngredient[] = [
    {
        dLCId: null,
        id: 5,
        merchantAvailabilityId: 5,
        name: 'Bear Claws',
        sourceDescription: 'Collect from dead Bears. Not sold by merchants unless you have the "Merchant" perk, then it is Uncommon.'
    },
    {
        dLCId: null,
        id: 11,
        merchantAvailabilityId: 2,
        name: 'Blue Butterfly Wing',
        sourceDescription: 'Collect from Blue Butterflies, often found during the day near flowering plants. Merchant availability is Uncommon.'
    },
    {
        dLCId: null,
        id: 13,
        merchantAvailabilityId: 3,
        name: 'Blue Mountain Flower',
        sourceDescription: 'Harvest from Blue Mountain Flowers, found throughout Skyrim. Merchant availability is Common. Can be grown in a garden with the Hearthfire expansion.'
    },
    {
        dLCId: null,
        id: 23,
        merchantAvailabilityId: 2,
        name: 'Chicken\'s Egg',
        sourceDescription: 'Harvest from Chicken nests, found on farms throughout Skyrim. Merchant availability is Uncommon.'
    },
    {
        dLCId: null,
        id: 24,
        merchantAvailabilityId: 2,
        name: 'Creep Cluster',
        sourceDescription: 'Harvest from Creep Cluster, found in the hot springs area of Eastmarch. Merchant availability is Uncommon. Can be grown in a garden with the Hearthfire expansion.'
    },
    {
        dLCId: null,
        id: 28,
        merchantAvailabilityId: 1,
        name: 'Deathbell',
        sourceDescription: 'Harvest from Deathbell, found in Hjaalmarch. Merchant availability is Rare. Can be grown in a garden with the Hearthfire expansion.'
    },
    {
        dLCId: null,
        id: 41,
        merchantAvailabilityId: 3,
        name: 'Garlic',
        sourceDescription: 'Harvest from Garlic braids, found in kitchens everywhere. Merchant availability is common.'
    },
    {
        dLCId: null,
        id: 43,
        merchantAvailabilityId: 1,
        name: 'Giant\'s Toe',
        sourceDescription: 'Collect from dead Giants, found in Giant Camps. Merchant availability is Rare.'
    },
    {
        dLCId: null,
        id: 45,
        merchantAvailabilityId: 2,
        name: 'Glow Dust',
        sourceDescription: 'Collect from dead Wisps and Wispmothers. Merchant availability is Uncommon.'
    },
    {
        dLCId: null,
        id: 46,
        merchantAvailabilityId: 0,
        name: 'Glowing Mushroom',
        sourceDescription: 'Harvest from Glowing Mushrooms, found in various caves. Not sold by merchants. Can be grown in a garden with the Hearthfire expansion.'
    },
    {
        dLCId: null,
        id: 50,
        merchantAvailabilityId: 2,
        name: 'Hanging Moss',
        sourceDescription: 'Harvest from Hanging Moss, found in various caves, ruins, and burial structures. Merchant availability is Uncommon.'
    },
    {
        dLCId: null,
        id: 54,
        merchantAvailabilityId: 3,
        name: 'Histcarp',
        sourceDescription: 'Collect from Histcarp fish. Merchant availability is Common.'
    },
    {
        dLCId: null,
        id: 61,
        merchantAvailabilityId: 1,
        name: 'Jazbay Grapes',
        sourceDescription: 'Harvest from Jazbay vines, found in the hot springs area of Eastmarch. Merchant availability is Rare. Can be grown in a garden with the Hearthfire expansion.'
    },
    {
        dLCId: null,
        id: 63,
        merchantAvailabilityId: 5,
        name: 'Large Antlers',
        sourceDescription: 'Collect from dead Elk. Not sold by merchants unless you have the "Merchant" perk, then it is Uncommon.'
    },
    {
        dLCId: null,
        id: 71,
        merchantAvailabilityId: 0,
        name: 'Nightshade',
        sourceDescription: 'Harvest from the Nightshade plant, found throughout Skyrim but especially near cemetaries and vampire hangouts. Not sold by merchants. Can be grown in a garden with the Hearthfire expansion.'
    },
    {
        dLCId: null,
        id: 73,
        merchantAvailabilityId: 2,
        name: 'Nordic Barnacle',
        sourceDescription: 'Harvest from Nordic Barnacle Clusters, found in or near water. Merchant availability is Uncommon.'
    },
    {
        dLCId: null,
        id: 81,
        merchantAvailabilityId: 3,
        name: 'River Betty',
        sourceDescription: 'Collect from River Betty fish. Merchant availability is Common.'
    },
    {
        dLCId: 2,
        id: 84,
        merchantAvailabilityId: 0,
        name: 'Salmon Roe',
        sourceDescription: 'Harvested from jumping Salmon, which you can harvest directly, or from Salmon in most flowing bodies of water (such as the area near the East Empire Company Warehouse near Solitude), which you can kill using arrows, magic, or shouts. Not sold by merchants.'
    },
    {
        dLCId: null,
        id: 86,
        merchantAvailabilityId: 2,
        name: 'Scaly Pholiota',
        sourceDescription: 'Harvest from the Scaly Pholiota mushrooms, found on dead trees. Merchant availability is Uncommon. Can be grown in a garden with the Hearthfire expansion.'
    },
    {
        dLCId: null,
        id: 109,
        merchantAvailabilityId: 5,
        name: 'Wisp Wrappings',
        sourceDescription: 'Collect from dead Wispmothers. Merchant availability is Uncommon. Not sold by merchants unless you have the "Merchant" perk, then it is Uncommon.'
    },
];

export const ALL_MERCHANT_AVAILABILITY_LEVELS: IMerchantAvailabilityLevel[] = [
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
