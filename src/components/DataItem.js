import React from 'react'
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import FormatColorFillRoundedIcon from '@material-ui/icons/FormatColorFillRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { SketchPicker } from 'react-color';
import MinusPlusInput from './MinusPlusInput'
import {
    IconButton,
    Typography,
    CardContent,
    withStyles ,
    makeStyles,
    CardActions,
    TextField,
    CardHeader,
    Card
} from '@material-ui/core';
import "react-color-palette/lib/css/styles.css";
import { useDataContext } from '../utils/dataContext'
import { normilizeData } from '../utils/randomizeData';

const useStyles = makeStyles({
    root: {
        minWidth: 150,
        maxHeight: 300,
        margin: 5,
        padding: 0,
        border: "solid",
        borderRadius: 5,
        borderLeftWidth: 10,
        borderWidth: 0

    },
    header: {
        padding: 0
    },
    content: {
        margin: '-10px 0 ',

        transform: 'scale(0.8)',
        padding: 0
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    input: {

    },
    inputColor: {
        position: 'relative',
        right: 7,
        visibility: 'hidden',
        height: 0,
        width: 0
    },

    icon : {
        padding : 0
    }

});

const IconButtonSmall = withStyles({
    root: {
      padding : 0 ,
      paddingRight : 4 ,
    },
})(IconButton);

const EditColorIcon = withStyles({
    root: {
       height : '20px' ,
       width : '20px'
    },
})(FormatColorFillRoundedIcon);
export default function DataItem({ item, index }) {
    const classes = useStyles();
    const [color, setColor] = React.useState(item.color);
    const [isEditing, setEditing] = React.useState(false)
    const [inputText, setInputText] = React.useState(item.label)
    const [fontSizeDiff, setFontSizeDiff] = React.useState(item.fontSize);
    const inputField = React.useRef(null)
    const { ad } = useDataContext()

    React.useEffect(() => {
        setInputText(item.label)
        setEditing(false)
        setColor(item.color)
    }, [item])

    const { addData, data } = useDataContext()
    


    const updateContext = (updatedItem) => {
        let indermidiateData = [...data]
        indermidiateData[index] = updatedItem
        addData(indermidiateData)
        console.log(data)
    }

    const handleInputText = (event) => {
        setInputText(event.target.value)
    }

    const handleSubmit = () => {
        console.log("submited !")
        handleEditing()
        console.log(item)
        updateContext({
            id: item.id,
            label: inputText,
            value: item.value,
            color: color,
            fontSize: fontSizeDiff ,
            children: item.children
        })
    }

    const handleEditing = () => {
        console.log(inputField.current)
        setEditing(!isEditing)
    }

    const handleChangeColor = (event) => {
        // setColor(event.target.value)

        updateContext({
            id: item.id,
            label: inputText,
            value: item.value,
            color: event.target.value,
            fontSize: item.fontSize,
            children: item.children
        })
    }

    const inputColor = React.useRef(null)

    const handleColorIconClicked = () => {
        inputColor.current.click();
    }
    const handleChangeComplete = (colorUpdated) => {
        setColor(colorUpdated.hex);

        updateContext({
            id : item.id ,
            label: inputText,
            value: item.value, 
            fontSize: item.fontSize,
            color: colorUpdated.hex,
            children: item.children
        })
    };

    let colorPointer

    const handleChangeFontSize  =  (newFontSize) => {
        setFontSizeDiff(newFontSize)

        updateContext({
            id: item.id,
            label: inputText,
            value: item.value,
            color: color,
            fontSize: fontSizeDiff,
            children: item.children
        })
    }
    const handleDragStart = (e) => {
          e.dataTransfer.setData("text/plain", index);
          console.log(data);
          console.log('drag');
          
        };
  
      const handleDrop = (e) => {
          e.preventDefault();
          
          const sourceIndex = e.dataTransfer.getData("text/plain");
          const targetIndex = index;
          if (sourceIndex != targetIndex){
          console.log(sourceIndex,targetIndex);
          console.log(data);
         const dataCopy = [...data]; // create a copy of the original array
  // const [draggedItem] = dataCopy.splice(sourceIndex, 1); 
    const draggedItem = dataCopy[sourceIndex];
    const targetItem = dataCopy[targetIndex];
    [dataCopy[sourceIndex], dataCopy[targetIndex]] = [dataCopy[targetIndex], dataCopy[sourceIndex]];
   dataCopy[sourceIndex].id = parseInt(sourceIndex);
    dataCopy[targetIndex].id = parseInt(targetIndex);

    console.log(draggedItem) ;console.log(targetItem);console.log(dataCopy);
    addData(normilizeData(dataCopy))// remove the dragged item
    //dataCopy.splice(targetIndex, 0, draggedItem); 
}// insert the dragged item at the target position     
      // Remove the target item from the target index
  /*const targetItem = dataCopy[targetIndex + 1];
  dataCopy.splice(targetIndex + 1, 1);
  console.log('temporaire') ;console.log(dataCopy);

  // Insert the target item at the original position of the dragged item
  dataCopy.splice(sourceIndex, 0, targetItem);

    addData(normilizeData(dataCopy))
    console.log(dataCopy);}
  
     // update the state with the new array
          // do something with sourceIndex and targetIndex*/
        };    

    if (isEditing) return (
        <Card className={classes.root} >
            <CardHeader
                className={classes.header}
                action={
                    <div>
                        <IconButton aria-label="edit text" onClick={handleEditing}>
                            <CancelRoundedIcon />
                        </IconButton>
                    </div>
                } />
            <CardContent className={classes.content}>
                <form onSubmit={handleSubmit}>
                    <TextField className={classes.input}
                        ref={inputField}
                        label="update"
                        variant="outlined"
                        onChange={handleInputText}
                        value={inputText}
                    />
                </form>


            </CardContent>
        </Card>
    )

    return (
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} >
            <Card  draggable={true} onDragStart={(e) => handleDragStart(e)}
                     className={classes.root} style={{ borderLeftColor: color }} >
                <CardHeader
                    className={classes.header}
                    action={
                        <div>
                            <IconButtonSmall aria-label="edit text" onClick={handleEditing} style={{padding : 0}}>
                                <EditRoundedIcon style={{ padding: 0 }}/>
                            </IconButtonSmall>
                            <IconButtonSmall aria-label="change color" onClick={handleColorIconClicked} >
                                <EditColorIcon />
                                <input
                                    ref={inputColor}
                                    className={classes.inputColor}
                                    type='color'
                                    value={color}
                                    onChange={handleChangeColor} />

                            </IconButtonSmall>
                            <MinusPlusInput initValue={fontSizeDiff} onChangeValue={handleChangeFontSize} />
                        </div>
                    } />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component="h2" className={classes.header}>
                        {inputText}
                    </Typography>
                    <Typography variant="h6" component="h5" className={classes.header} color="textSecondary">
                        {"" + Math.round((item.value * 100 + Number.EPSILON) * 100) / 100 + "%"}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
