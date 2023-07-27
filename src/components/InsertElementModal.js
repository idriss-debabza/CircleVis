import React ,{ useState } from 'react';
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
export default function InsertElementModal() {

    const { data, addData } = useDataContext()
    const [inputList, setinputList]= useState([{label:'', value:'',color:'#eeeeee'}])
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const handleClickOpen = () => {
        console.log("opening",inputList)
        setOpen(true);
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClose = () => {
        console.log('before closing',inputList)
        setinputList([{label:'', value:'',color:'#eeeeee'}])
        setColor('#eeeeee')
        setLabel('')
        setValue('')
        setOpen(false);
    };
    const [color, setColor] = React.useState('#eeeeee')
    const [label, setLabel] = React.useState('')
    const [value, setValue] = React.useState('')

   // const inputColor = React.useRef(null)
    

    const handleColorChange = (event) => {
        setColor(event.target.value)
        
    }
   /* const onColorIconClick = () => {
      //  console.log(i)
      console.log(inputColor.current);
        inputColor.current.click();
    };*/
    const handleInsert = () => {
        let dataList = [...data]
        let maxId = 0
        console.log('hello')
        inputList.forEach(input =>{
            maxId=0;
            dataList.forEach(item => {
                if (item.id > maxId) {
                    maxId = item.id;
                }
            })
            dataList.push({
                id: maxId + 1,
                label: input.label,
                value: input.value / 100,
                color: input.color,
                fontSize : 0,
                children: null
            })
        } )
        
        dataList.forEach(item => {
            console.log('chichichichic',item.value)
        })
        addData(normilizeData(dataList))
        let sum = 0
        data.forEach(e => {
            sum += e.value
        })
        console.log(sum)
       handleClose()
      
    }  
    const handleinputchange=(e, index)=>{
        console.log('voila ',e.target)
        const {name, value}= e.target;
        const list= [...inputList];
        list[index][name]= value;
       
        setinputList(list);
        console.log(inputList);
      }
      const handleremove= index=>{
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
      }
  
        
  
        const handleaddclick=()=>{  
            setinputList([...inputList, { label:'', value:'',color:'#eeeeee'}]);
            console.log(inputList);

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
            
             { inputList.map( (x,i)=>{
             return (<div className={classes.inputContainer}>
                        <TextField
                            onChange={(event) => {
                                handleinputchange(event,i)
                                setLabel(event.target.value)
                                console.log(inputList[i].label )
                            }}
                            value={inputList[i].label}
                            autoFocus
                            margin="dense"
                            id="label"
                            label="label"
                            type="text"
                            name="label"
                            required

                        />
                        <TextField
                            onChange={(event) => {
                                handleinputchange(event,i)
                                setValue(event.target.value)
                            }}
                            value={inputList[i].value}
                            autoFocus
                            margin="dense"
                            id="value"
                            label="value "
                            type="number"
                            name="value"
                        />
                        <input
    
                           
                            type='color'
                            name="color"
                            value={inputList[i].color}
                            onChange={
                                (event ) => {
                                    handleinputchange(event,i)}
                            
                               }
                        />
                     
                        {
                  inputList.length!==1 &&
                  <Button   onClick={()=> handleremove(i)}>
               <DeleteOutlineIcon/>
               </Button>
             }
                        { inputList.length-1===i &&
                         <Button onClick={handleaddclick} color="primary">
                        <AddIcon />
                </Button>
             }   
               </div>  
             );  }  ) }
             
               
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