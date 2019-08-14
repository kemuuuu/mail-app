import * as React from 'react';

interface OnChangeEvent extends React.ChangeEvent<HTMLSelectElement> {
  target: HTMLSelectElement;
}

interface SelectBoxCreaterProps {
  trg: Array<any>;
  onSelectChange: (OnChangeEvent) => void;
}

/**
 * Select box 作成
 * @param props 
 */
export const SelectBoxCreater: React.FC<SelectBoxCreaterProps> = (props) => {
  if (!props.trg) return;
  const options = props.trg.map((e,i) => {
    if (e) {
      return (<option key={i} value={e.id}>{e.name}</option>);
    }
  });
  options.unshift(<option key="-" value="-">-</option>);
  return (
    <div className="cp_ipselect cp_sl01">
      <select defaultValue="-" onChange={(e: OnChangeEvent) => {props.onSelectChange(e)}}> {options} </select>
    </div>
  );
}

interface KeyListCreaterProps {
  trg: Array<any>;
  onSelectChange: (OnChangeEvent) => void;
}
/**
 * ファンクション作成画面のTemplate_keyリストを作成する
 */
export const KeyListCreater: React.FC<KeyListCreaterProps> = (props) => {
  if (!props.trg) return <div></div>;
  const keys = props.trg.map((e,i) => {
    if (e.key !== '') {
      return (
        <tr key={e.id}>
          <td key={e.id}>{e.key}</td>
          <td>
            
          </td>
        </tr>
      );
    }
  })
  return(
    <tbody> {keys} </tbody>
  );
}