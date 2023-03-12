import { Select, MenuItem, FormControl, Grid, InputLabel, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const DropDownForm = ({ id, label, options, control, rules }) => {
    return (
        <Grid container item>
            <Controller
                name={id}
                control={control}
                rules={rules}
                defaultValue=""
                render={({field:{onChange, value}, fieldState:{error}}) => (
                    <FormControl fullWidth size="small">
                        <InputLabel htmlFor={id+"Label"}>{label}</InputLabel>
                        <Select id={id} labelId={id+"Label"} label={label} onChange={onChange} value={value} error={!!error} sx={{".css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":{whiteSpace:"normal"}}}>
                            {options.map((option) => (
                                <MenuItem key={option + id} value={option} sx={{whiteSpace:"normal"}}>{option}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error>{error ? error.message : null}</FormHelperText>
                    </FormControl>
                )}
                />
        </Grid>
    );
}

export default DropDownForm;
