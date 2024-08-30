import { textFieldProp } from "../utlity/interface"

function TextField({ name, register, error, placeholder, className, disable }: textFieldProp) {
    return (
        <div className={(className === "update_input" || className === "update_input_address") ? "update_input_container" : "input_container"}>
            <input className={className} placeholder={placeholder}  {...register(name)} disabled={disable ? true : false} />
            {error ? <span className='field_error'>{error}</span> : null}
        </div>
    )
}

export default TextField

