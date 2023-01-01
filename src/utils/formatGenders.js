export const CIVILITY_OPTION =
    {
        1: 'Mr',
        2: 'Mme',
        3: 'Autre'
    };

export const GENDERS_OPTION =
    {
        1: 'Homme',
        2: 'Femme',
        3: 'Autre'
    };

export function getGender(indice) {
    return GENDERS_OPTION[indice-1];
}

export function getCivility(indice) {
    return CIVILITY_OPTION[indice-1];
}