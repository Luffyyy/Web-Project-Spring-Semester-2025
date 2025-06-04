import { useId, useRef } from "react";

/**
 * This component is basically an input element but shortens a lot of code
 */
export default function Input({ name, value, label, required, type, onChange, validity, disabled, placeholder }) {
    const id = useId();
    const element = useRef();

    function handleChange(e) {
        onChange(type == 'checkbox' ? e.target.checked : e.target.value);
    }

    return <div className="flex flex-col gap-2">
        <label htmlFor={id}>{label}</label>
        {type == 'textarea' ? (
            <textarea
                id={id}
                name={name}
                value={value}
                disabled={disabled}
                required={required}
                onChange={handleChange}
                placeholder={placeholder}
                ref={element}
                className="input"
            /> 
        ) : (
            <input 
                id={id}
                className="input"
                required={required}
                value={value}
                disabled={disabled}
                name={name}
                type={type}
                ref={element}
                placeholder={placeholder}
                onChange={handleChange}
            />
        )}
        
        <span className="text-red-400">{validity}</span>
    </div>;
}