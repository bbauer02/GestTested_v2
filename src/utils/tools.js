export default function calculTTC(prixHT, TVA) {
    return prixHT * TVA / 100 + prixHT;
}