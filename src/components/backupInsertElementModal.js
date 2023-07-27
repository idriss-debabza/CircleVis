import React , { useState } from 'react';
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
    DialogContentText,
    Input
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import FormatColorFillRoundedIcon from '@material-ui/icons/FormatColorFillRounded';
import { makeStyles } from '@material-ui/core/styles';
import { useDataContext } from '../utils/dataContext'
import { normilizeData } from '../utils/randomizeData';
import AddIcon from '@material-ui/icons/Add';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: ' center ',

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

/*const handleMore = () => {
    // create a copy of the existing label, value, and color
    const newLabel = label;
    const newValue = value;
    const newColor = color;

    // create a new input container with the same label, value, and color
    const newInputContainer = (
        <div className={classes.inputContainer}>
            <TextField
                onChange={(event) => {
                    setLabel(event.target.value)
                }}
                value={newLabel}
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
                value={newValue}
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
                value={newColor}
                onChange={handleColorChange}
            />
            <Fab aria-label="add" onClick={onColorIconClick} style={{ background: newColor, zIndex: 10, }}>
                <FormatColorFillRoundedIcon />
            </Fab>
        </div>
    );

    // add the new input container to the list of items
    setItems([...items, newInputContainer]);
}*/

export default function InsertElementModal() {
    const [showInputModel, setShowInputModel] = useState(false);
  const [InputModelCount, setInputModelCount] = useState(0);
  const inputs = new Array(InputModelCount).fill(<InputModel/>)
  const [inputsData, setInputsData] = useState([]);
    const { data, addData } = useDataContext()
    let dataCopy =  [...data];
    

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
   
   
      
    const handleMore = () => {
        let maxId = 0
        dataCopy.forEach(item => {
            if (item.id > maxId) {
                maxId = item.id;
            }              })
        dataCopy.push({
            id: maxId + 1,
            label: '',
            value: '',
            color: '#eeeeee',
            fontSize : 0,
            children: null
        })
        setShowInputModel(true);
        setInputModelCount(count => count + 1);
        console.log(InputModelCount);
        for (let i = 0; i < InputModelCount; i++) {
            inputs.push(<InputModel key={i} index={i} />);
          }
          console.log(inputs);
    };
/*  const handleLess = () => {
        console.log('heydeded');
       // inputs.slice(index,1);
    }*/
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
        setInputModelCount(0);
        setShowInputModel(false);
        console.log('merhba',dataCopy);
    //    dataCopy = [...data]
    };

    const [color, setColor] = React.useState('#eeeeee')
    const [label, setLabel] = React.useState('')
    const [value, setValue] = React.useState('')

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
        dataList.push({
            id: maxId + 1,
            label: label,
            value: value / 100,
            color: color,
            fontSize : 0,
            children: null
        })
        dataList.forEach(item => {
            console.log(item.value)
        })
        addData(normilizeData(dataList))
        let sum = 0
        data.forEach(e => {
            sum += e.value
        })
        
        console.log('hello',dataList)
        console.log(sum)
        handleClose()
    }
    function InputModel({ index }){
        
        const [open, setOpen] = React.useState(false);
        const classes = useStyles();
       
        
    
       
       
        const [color, setColor] = React.useState('#eeeeee')
        const [label, setLabel] = React.useState('')
        const [value, setValue] = React.useState('')
    
        const inputColor = React.useRef(null)
    
        const handleColorChange = (event) => {
            setColor(event.target.value)
            console.log(event.target.value)
            
        
        }
        const onColorIconClick = () => {
            inputColor.current.click();
             
        };
       
    
        return (  <div className={classes.inputContainer}>
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
            console.log(dataCopy)
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
    
   
    
    </div>);
    
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
                aria-labelledby="draggable-dialog-title" >

                <DialogTitle id="form-dialog-title">Insert Items</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To insert an item , please fill out the form and don't forget to put the color by clicking on the icon below.
          </DialogContentText>
          {showInputModel && [...Array(InputModelCount)].map((_, i) => (
      <InputModel key={i} index ={i} />))}

         
              
              
                </DialogContent>
                <Button onClick={handleMore} color="primary">
                        <AddIcon />
          </Button>
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