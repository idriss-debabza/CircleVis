import React from 'react'
import {
    Fab,
    TextField,
} from '@material-ui/core';
import FormatColorFillRoundedIcon from '@material-ui/icons/FormatColorFillRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: ' center ',

    },
    inputColor: {
        position: 'relative',
        left: 78,
        visibility: 'hidden',
        top: 12,
        height: 0,
        width: 0
    } ,
   
}))

export default function InserElementInputs() {
    const [inputs, setInputs] = React.useState([{color: '#eeeeee',label: '',value: '',},]);
    
    const handleAddInput = () => {
        setInputs([...inputs,{color: '#eeeeee',label: '',value: '',},]);
    };
    
    const handleInputChange = (index, field, value) => {
        setInputs(
            inputs.map((input, i) => {
                if (i === index) {
                    return {
                        ...input,
                        [field]: value,
                    };
                }
                return input;
            })
        );
    };
    
    const handleColorChange = (index, event) => {
        handleInputChange(index, 'color', event.target.value);
    };

    const classes = useStyles();
    return (
        <div>
            {inputs.map((input, index) => (
                <div key={index} className={classes.inputContainer}>
                    <TextField
                        onChange={(event) => {
                            handleInputChange(index, 'label', event.target.value);
                        }}
                        value={input.label}
                        autoFocus
                        margin="dense"
                        id={`label-${index}`}
                        label="label"
                        type="text"
                        required
                    />

                    <TextField
                        onChange={(event) => {
                            handleInputChange(index, 'value', event.target.value);
                        }}
                        value={input.value}
                        autoFocus
                        margin="dense"
                        id={`value-${index}`}
                        label="value "
                        type="number"
                    />
                    <Fab aria-label="add" onClick={onColorIconClick} style={{ background: input.color }}>
                        <FormatColorFillRoundedIcon />
                    </Fab>

                    <input
                        ref={inputColor}
                        className={classes.inputColor}
                        type='color'
                        value={input.color}
/>

</div>
))
}
</div>
    )}
