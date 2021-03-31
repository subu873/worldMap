export const getFlagByCountryName = (countryName) => {
    return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryName}.svg`
}

export const rounded = num => {
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
        return Math.round(num / 100000) / 10 + "M";
    } else {
        return Math.round(num / 100) / 10 + "K";
    }
};

export const RAPID_API_KEY = '03ffc4caf9msh5a10387f22c0892p1fbff3jsnf0d37d402624'
