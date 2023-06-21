
// How I created the table logic:

// new Array(55).fill('').reduce((acc, _, i) => {
//     if (i >= 34 && i <= 42) {
//       acc[i] = ['S', 'L'];
//     } else if (i >= 43 && i <= 45) {
//       acc[i] = ['L', 'XL', 'XXL'];
//     } else if (i >= 46 && i <= 48) {
//       acc[i] = ['XL', 'XXL'];
//     }
//     return acc
//   }, {})

export const shirtSizes = {
    34: ["S", "L"],
    35: ["S", "L"],
    36: ["S", "L"],
    37: ["S", "L"],
    38: ["S", "L"],
    39: ["S", "L"],
    40: ["S", "L"],
    41: ["S", "L"],
    42: ["S", "L"],
    43: ["L", "XL", "XXL"],
    44: ["L", "XL", "XXL"],
    45: ["L", "XL", "XXL"],
    46: ["XL", "XXL"],
    47: ["XL", "XXL"],
    48: ["XL", "XXL"],
};
