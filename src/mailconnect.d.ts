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

/**
 * kintone api から取得したアプリ情報
 * id === appId
 */
export interface KintoneApp {
  id: string;
  appId: string;
  name: string;
  spaceId: string;
  threadId: string;
}

/**
 * kintone api から取得した項目情報
 * id === code
 * name === label
 */
export interface KintoneProperty {
  id: string;
  name: string;
  code: string;
  expression: string;
  hideExpression: boolean;
  label: string;
  maxLength: string;
  minLength: string;
  noLabel: boolean;
  required: boolean;
  type: string;
  unique: boolean;
}