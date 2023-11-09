export const CIVILITY_OPTION =
    {
        1: 'Monsieur',
        2: 'Madame',
        3: 'Autre'
    };

export const GENDERS_OPTION =
    {
        1: 'Homme',
        2: 'Femme',
        3: 'Autre'
    };

export function getGender(indice) {
    return GENDERS_OPTION[indice];
}

export function getCivility(indice) {
    return CIVILITY_OPTION[indice];
}