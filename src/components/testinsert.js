import React from 'react';
import {
    Fab,
    DialogTitle,
    DialogActions,
    Button,
    Dialog,
    ListItemIcon,
    ListItemText,
    ListItem,
    Paper,
    TextField,
    DialogContent,
    DialogContentText
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import FormatColorFillRoundedIcon from '@material-ui/icons/FormatColorFillRounded';
import { makeStyles } from '@material-ui/core/styles';
import { useDataContext } from '../utils/dataContext'
import { normilizeData } from '../utils/randomizeData';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    inputColor: {
        position: 'relative',
        left: 78,
        visibility: 'hidden',
        top: 12,
        height: 0,
        width: 0
    }
}))

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}
export default function InsertElementModal() {
    const { data, addData } = useDataContext()

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClose = () => {
        setColor('#eeeeee')
        setLabel('')
        setValue('')
        setOpen(false);
    };
    const [color, setColor] = React.useState('#eeeeee')
    const [items, setItems] = React.useState([{ label: '', value: '' }])

    const inputColor = React.useRef(null)

    const handleColorChange = (event) => {
        setColor(event.target.value)
    }
    const onColorIconClick = () => {
        inputColor.current.click();
    };
    const handleInsert = () => {
        let dataList = [...data]
        let maxId = 0
        dataList.forEach(item => {
            if (item.id > maxId) {
                maxId = item.id;
            }
        })
        items.forEach((item) => {
            if (item.label && item.value) {
                dataList.push({
                    id: maxId + 1,
                    label: item.label,
                    value: item.value / 100,
                    color: color,
                    fontSize: 0,
                    children: null
                })
                maxId += 1
            }
        })
        addData(normilizeData(dataList))
        let sum = 0
        data.forEach(e => {
            sum += e.value
        })
        console.log(sum)
        handleClose()
    }

    const handleAddItem = () => {
        setItems([...items, { label: '', value: '' }])
    }

    const handleItemChange = (index, key, value) => {
        const newItems = [...items]
        newItems[index][key] = value
        setItems(newItems)
    }


    return (
        <div>
            <ListItem button={true} key={'Add Items'} onClick={handleClickOpen} >
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary={'Add Items'} />
                </ListItem>
            <Dialog open={open} onClose={handleClose}
                fullScreen={fullScreen}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title">

                <DialogTitle id="draggable-dialog-title">Insert Items</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To insert items, please fill out the form and don't forget to put the color by clicking on the icon below.
                    </DialogContentText>
                    <div className={classes.inputContainer}>
                        <TextField
                            onChange={(event) => {
                                setLabel(event.target.value)
                            }}
                            value={label}
                            autoFocus
                            margin="dense"
                            id="label"
                            label="label"
                            type="text"
                            required
                        />
                        <TextField
                            onChange={(event) => {
                                setValue(event.target.value)
                            }}
                            value={value}
                            autoFocus
                            margin="dense"
                            id="value"
                            label="value "
                            type="number"
                        />
                        <input
                            ref={inputColor}
                            className={classes.inputColor}
                            type='color'
                            value={color}
                            onChange={handleColorChange}
                        />
                        <Fab aria-label="add" onClick={onColorIconClick} style={{ background: color, zIndex: 10, }}>
                            <FormatColorFillRoundedIcon />
                        </Fab>
                    </div>
                    {newElements.map((el, index) => {
                        return (
                            <div key={index}>
                                <TextField
                                    onChange={(event) => {
                                        setLabelNew(event.target.value)
                                    }}
                                    value={el.label}
                                    autoFocus
                                    margin="dense"
                                    id="labelNew"
                                    label="label"
                                    type="text"
                                    required
                                />
                                <TextField
                                    onChange={(event) => {
                                        setValueNew(event.target.value)
                                    }}
                                    value={el.value}
                                    autoFocus
                                    margin="dense"
                                    id="valueNew"
                                    label="value"
                                    type="number"
                                />
                                <input
                                    ref={inputColor}
                                    className={classes.inputColor}
                                    type='color'
                                    value={el.color}
                                    onChange={(event) => handleColorChangeNew(event, index)}
                                />
                                <Fab aria-label="add" onClick={(event) => onColorIconClickNew(event, index)} style={{ background: el.color, zIndex: 10, }}>
                                    <FormatColorFillRoundedIcon />
                                </Fab>
                                <Button variant="contained" color="secondary" onClick={() => removeNewElement(index)}>
                                    Remove
                                </Button>
                            </div>
                        )
                    })}
                    <Button variant="contained" color="primary" onClick={addNewElement}>
                        Add Element
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleInsert} color="primary">
                        Insert
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
// insert data 
// save data 
// change size for every size 
// delete node 
// matrice arengement 