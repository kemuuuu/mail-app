/**
 * TEMPLATE MODEL
 */
export interface Template {
  id: string;
  name: string;
  address: string;
  createdAt: any;
  updatedAt: any;
}

/**
 * TEMPLATE KEY MODEL
 */
export interface TemplateKey { 
  id: string;
  template_id: string;
  key: string;
  a_row_below: boolean;
  createdAt: any;
  updatedAt: any;
}