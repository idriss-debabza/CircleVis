import React from 'react'
import {
    Fab,
    DialogTitle,
    DialogActions,
    Button,
    Dialog,
    Paper,
    TextField,
    DialogContent,
    DialogContentText
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
    const [elements, setElements] = React.useState([{
        label: '',
        value: '',
        color: '#eeeeee',
    }]);

    const handleAddElement = () => {
        setElements([...elements, {
            label: '',
            value: '',
            color: '#eeeeee',
        }]);
    }

    const handleDeleteElement = (index) => {
        setElements(elements.filter((_, i) => i !== index));
    }

    const handleColorChange = (event, index) => {
        const newElements = [...elements];
        newElements[index].color = event.target.value;
        setElements(newElements);
    }

    const handleLabelChange = (event, index) => {
        const newElements = [...elements];
        newElements[index].label = event.target.value;
        setElements(newElements);
    }

    const handleValueChange = (event, index) => {
        const newElements = [...elements];
        newElements[index].value = event.target.value;
        setElements(newElements);
    }

    const classes = useStyles();
    return (
        <div>
            {elements.map((element, index) => (
                <div key={index} className={classes.inputContainer}>
                    <TextField
                        onChange={(event) => handleLabelChange(event, index)}
                        value={element.label}
                        autoFocus
                        margin="dense"
                        id="label"
                        label="label"
                        type="text"
                        required
                    />

                    <TextField
                        onChange={(event) => handleValueChange(event, index)}
                        value={element.value}
                        autoFocus
                        margin="dense"
                        id="value"
                        label="value "
                        type="number"
                    />

                    <Fab aria-label="add" onClick={() => handleColorChange(event, index)} style={{ background: element.color }}>
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
                    <DialogActions>
                    <Button onClick={handleAddElement} color="primary">
                        Add Element
                    </Button>
                    </DialogActions>
</div>
    )}
