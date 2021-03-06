import { emailSchema, nameSchema, passwordSchema } from '../../../utils/validation'

export const initialState = {
    name: { value: '', touched: false, valid: false, message: null },
    email: { value: '', touched: false, valid: false, message: null },
    password: { value: '', touched: false, valid: false, message: null },
    confirm: { value: '', touched: false, valid: false, message: null },
    form: { valid: false }
}

export const reducer = (state, action) => {
    if(action.type === 'NAME'){
        const { name } = state;
        name.touched = true;
        name.value = action.value;
        const { error } = nameSchema.validate(action.value);
        error ? name.valid = false : name.valid = true;
        error ? name.message = error.message : name.message = null;
        return { ...state, name }
    }
    if(action.type === 'EMAIL'){
        const { email } = state;
        email.touched = true;
        email.value = action.value;
        const { error } = emailSchema.validate(action.value);
        error ? email.valid = false : email.valid = true;
        error ? email.message = error.message : email.message = null;
        return { ...state, email }
    }
    else if(action.type === 'PASSWORD'){
        const { password } = state;
        password.touched = true;
        password.value = action.value;
        const { error } = passwordSchema.validate(action.value);
        error ? password.valid = false : password.valid = true;
        error ? password.message = error.message : password.message = null;
        return { ...state, password }

    }
    else if(action.type === 'CONFIRM'){
        const { password, confirm } = state;
        confirm.touched = true;
        confirm.value = action.value;
        confirm.value === password.value ? confirm.valid = true : confirm.valid = false;
        confirm.value !== password.value ? confirm.message = 'Passwords do not match' : confirm.message = null;
        return { ...state, confirm }
    }
    else if(action.type === 'FORM'){
        const { name, email, password, confirm, form } = state;
        if(name.valid && email.valid && password.valid && confirm.valid){
            form.valid = true;
        }else{
            form.valid = false;
        }
        return { ...state, form }
    }
    else if(action.type === 'SUCCESS'){
        return initialState;
    }
    else{
        return state;
    }
}
