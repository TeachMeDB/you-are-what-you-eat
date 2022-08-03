export interface IngredientRecord {
  record_id: number;
  ingr_id: number;
  ingr_name: string;
  purchasing_date: string;
  measure_unit: string;
  shelf_life: number;
  produced_date: string;
  price: string;
  director_id: number;
  director_name?: string;
}
