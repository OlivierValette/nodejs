// converter.js
module.exports = {
    temperature: (temp, from, to) => {

        const units = ['c', 'f', 'k'];
        if (!units.includes(from) || !units.includes(to)) {
            throw new Error('Invalid unit');
        }

        let result = null;
        if (from === to) {
            result = temp;
        } else if (from === "c") {
            if (to === "f") {
                result =  (temp * 9/5) + 32;
            } else {
                result =  temp + 273.15;
            }
        } else if (from === "f") {
            if (to === "c") {
                result =  (temp - 32) * 5/9;
            } else {
                result =  (temp - 32) * 5/9 + 273.15;
            }
        } else {
            if (to === "c") {
                result =  temp - 273.15;
            } else {
                result =  (temp - 273.15) * 9/5 + 32;
            }
        }
        return Number(result.toFixed(2));
    }
};