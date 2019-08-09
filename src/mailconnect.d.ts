/**
 * TEMPLATE MODEL
 */
export interface Template {
  id: string;
  name: string;
  address: string;
}

/**
 * TEMPLATE KEY MODEL
 */
export interface TemplateKey { 
  id: string;
  template_id: string;
  key: string;
  sort_number: number;
  a_row_below: boolean;
}