


import "./css_select_input.css";

export default function SelectInput({ options, onChange }) {


    return (
      <div style={{marginTop:"2vh"}} >
        <select id="select_input" onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }



