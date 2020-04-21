import { Product } from './product';
import { Subcategory } from './subcategory';
import { Brand } from './brand';

export class SearchResult {
    public products: Product[];
    public subcategories: Subcategory[];
    public brands: Brand[];
}