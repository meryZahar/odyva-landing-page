import { visage, corps, maquillage } from "../assets/pictures/categories";

const categories = [
  {
    "id": 1,
    "name": 'Visage',
    "image": visage,
    "gradient": '#F0E1D0',
    "anchor": 'category-visage'
  },
  {
    "id": 2,
    "name": 'Corps',
    "image": corps,
    "gradient": '#D3E0C3',
    "anchor": 'category-corps'
  },
  {
    "id": 3,
    "name": 'Maquillage',
    "image": maquillage,
    "anchor": 'category-maquillage'
  },
];

export default categories;