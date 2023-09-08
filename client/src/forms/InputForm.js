import { TextField, Grid } from '@mui/material';
import { Controller } from 'react-hook-form';

const InputForm = ({ type, id, label, control, rules, defaultValue }) => {

    const getShrink = (type) => {
        if (type === "time" || type === "datetime") {
            return({shrink: true});
        }
    };

    return (
        <Grid container item>
            <Controller
                name={id}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({field:{onChange, value}, fieldState:{error}}) => (
                    <TextField type={type} id={id} label={label} InputLabelProps={getShrink(type)} onChange={onChange} value={value} error={!!error} helperText={error ? error.message : null} variant="outlined" size="small" fullWidth />
                )}
            />
        </Grid>
    );
}

export default InputForm;
