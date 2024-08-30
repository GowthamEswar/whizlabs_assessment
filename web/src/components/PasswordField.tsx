import showIcon from '../assets/show.svg';
import hideIcon from '../assets/PasswordHideIcon.svg';
import { useState } from 'react';
import { textFieldProp } from '../utlity/interface';

function PasswordField({ name, register, error, placeholder,className }: textFieldProp) {
    const [icon, setIcon] = useState(false)

    const showHidePassword = () => {
        setIcon(!icon)
    }

    return (
        <>
            <div className='password_container'>
                <input className={className} placeholder={placeholder} type={icon ? "text" : "password"}   {...register(name)} />
                <img src={icon ? showIcon : hideIcon} className="eyeIcon" onClick={showHidePassword} alt="" />
            </div>
            {error ? <span className='field_error'>{error}</span> : null}
        </>
    )
}

export default PasswordField