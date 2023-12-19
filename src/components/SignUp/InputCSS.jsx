import React from "react";

const InputCSS = React.forwardRef((props, ref) => {
  const { name, tag, type, value, onChange, disabled } = props;

  return (
    <div className="field field_v2">
      <label htmlFor={tag} className="ha-screen-reader">
        {name}
      </label>
      <input
        ref={ref}
        id={tag}
        className="field__input"
        type={type}
        placeholder=""
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete="off"
      />
      <span className="field__label-wrap" aria-hidden="true">
        <span className="field__label">{name}</span>
      </span>
    </div>
  );
});

export default InputCSS;
