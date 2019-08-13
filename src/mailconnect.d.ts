/**
 * template
 */
export interface Template {
  id: string;
  name: string;
  address: string;
}

/**
 *  template key
 */
export interface TemplateKey { 
  id: string;
  template_id: string;
  key: string;
  sort_number: number;
  a_row_below: boolean;
}

/**
 * auth info
 */
export interface AuthInfo {
  id: string;
  token: string;
  refresh_token: string;
  type: string;
  base_url: string;
}