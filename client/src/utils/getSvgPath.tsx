import { Clothing } from "@/types";

export function getSvgPath(itemType: Clothing): string {
  switch (itemType) {
    case 'shirt':
      return '/shirt-svg.svg';
    case 'pants':
      return '/pants-svg.svg';
    case 'shoes':
      return '/shoes-svg.svg';
    default:
      return '/default-svg.svg'; //need to return a default path or it will throw an ts error
  }
}
