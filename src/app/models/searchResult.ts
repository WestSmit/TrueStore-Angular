import { Product } from './product';
import { Subcategory } from './subcategory';

export class SearchResult {
    public products: Product[];
    public subcategories: Subcategory[];
}