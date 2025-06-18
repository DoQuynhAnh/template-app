import { CategoryLevel1, CategoryLevel2 } from '@model/category';

const dataLevel2: Array<CategoryLevel2> = [
  {
    id: '1',
    text: 'Máy bơm',
    parentId: '1',
  },
  {
    id: '2',
    text: 'Máy cắt gỗ công nghiệp',
    parentId: '1',
  },
  {
    id: '3',
    text: 'Máy cắt gỗ công nghiệp',
    parentId: '1',
  },
  {
    id: '4',
    text: 'Máy cắt gỗ công nghiệp',
    parentId: '1',
  },
  {
    id: '5',
    text: 'Máy cắt gỗ công nghiệp',
    parentId: '1',
  },
  {
    id: '6',
    text: 'Máy cắt gỗ công nghiệp',
    parentId: '1',
  },
];
const dataLevel22: Array<CategoryLevel2> = [
  {
    id: '1',
    text: 'Máy bơm 1',
    parentId: '1',
  },
  {
    id: '2',
    text: 'Máy cắt gỗ công nghiệp 2',
    parentId: '1',
  },
  {
    id: '3',
    text: 'Máy cắt gỗ công nghiệp',
    parentId: '1',
  },
  {
    id: '4',
    text: 'Máy cắt gỗ công nghiệp',
    parentId: '1',
  },
  {
    id: '5',
    text: 'Máy cắt gỗ công nghiệp',
    parentId: '1',
  },
  {
    id: '6',
    text: 'Máy cắt gỗ công nghiệp',
    parentId: '1',
  },
];
export const DATA_CATEGORY: Array<CategoryLevel1> = [
  {
    id: '1',
    text: 'Máy cắt gỗ công nghiệp 1',
    level2: dataLevel2,
    icon: 'https://img.icons8.com/ios-glyphs/344/robot--v1.png',
  },
  {
    id: '2',
    text: 'Máy cắt gỗ công nghiệp 2',
    level2: dataLevel22,
    icon: 'https://img.icons8.com/ios-glyphs/344/drill.png',
  },
  {
    id: '3',
    text: 'Máy cắt gỗ công nghiệp 3',
    level2: dataLevel2,
    icon: 'https://img.icons8.com/fluency-systems-filled/344/overlock-machine.png',
  },
  {
    id: '4',
    text: 'Máy cắt gỗ công nghiệp 4',
    level2: dataLevel2,
    icon: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/344/external-drill-building-and-construction-flatart-icons-outline-flatarticons-1.png',
  },
  {
    id: '5',
    text: 'Máy cắt gỗ công nghiệp 5',
    level2: dataLevel2,
    icon: 'https://img.icons8.com/material/344/iron.png',
  },
  {
    id: '6',
    text: 'Máy cắt gỗ công nghiệp 6',
    level2: dataLevel2,
    icon: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/344/external-drill-building-and-construction-flatart-icons-outline-flatarticons-1.png',
  },
  {
    id: '7',
    text: 'Máy cắt gỗ công nghiệp 7',
    level2: dataLevel2,
    icon: 'https://img.icons8.com/material/344/gas-stove.png',
  },
];
