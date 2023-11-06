export function CalculPrixTTC(prix_base, tva) {
    if(!tva) {
        tva = 22;
    }
    const prix_ttc = prix_base + prix_base*tva/100;
    return prix_ttc;
}
export const PAYMENT_OPTION = {
    1: 'Carte Bancaire',
    2: 'PayPal',
    3: 'Virement bancaire',
    4: 'Chèque'
};

export function GetInvoiceStatus(status) {
    let status_label;
    switch (status) {
        case 0:
            status_label="Non payé";
            break;
        case 1:
            status_label="Payé";
            break;
        case 2:
            status_label="Retard";
            break;
        case 3:
            status_label="Brouillon";
            break;
        default:
            status_label="Brouillon";
    }
    return status_label;
}

export function getPaymentMethod(indice) {
    return PAYMENT_OPTION[indice];
}

export function getPaymentIcon(indice) {
    let icon = "";
    switch (indice) {
        case 1:
            icon=  "majesticons:creditcard"
            break;
        case 2 :
            icon="logos:paypal";
            break;
        case 3 :
            icon= "noto-v1:bank"
            break;
        case 4:
            icon="material-symbols:money";
            break;
        default:
            icon=  "majesticons:creditcard";
            break;
    }
    return icon;
}