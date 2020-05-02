import { Product } from './product';
import { Subcategory } from './subcategory';
import { Brand } from './brand';

export class SearchResult {
  public products= new Array<Product>();
  public subcategories= new Array<Subcategory>();
  public brands= new Array<Brand>();
  public selectedBrands= new Array<number>();
  public minPrice: number;
  public maxPrice: number;
  public setMinPrice: number;
  public setMaxPrice: number;
  public page: number;
  public totalPages: number;    
  public totalItems: number;    
}