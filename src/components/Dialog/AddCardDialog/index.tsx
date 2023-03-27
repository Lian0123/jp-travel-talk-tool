/* React Config */
import * as React from 'react';
import { useRef } from "react";

/* React i18n Config */
import "../../../i18n";
import { useTranslation } from "react-i18next";

/* Mui Compoent */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

/* Constants */
import { APP_NAME_SPACE } from '../../../constants/common';

interface IAddCardDialog {
    open: boolean;
    setOpen: (...dto :any) => any;
    setCardDialogOpen: (...dto :any) => any;
    setVoiceCards: (...dto :any) => any;
    setTags: (...dto :any) => any;
    createCommand: (...dto :any) => any;
}

const AddCardDialog = (prop: IAddCardDialog) => {
  const {
    //dialog-control
    open,
    setOpen,
    setCardDialogOpen,
    setVoiceCards,
    setTags,
    // db-control
    createCommand,
  } = prop;

  const { t } = useTranslation();

  const uploadFile = useRef(null);

  const handleAddByDialog = () => {
    setCardDialogOpen(true); 
    setOpen(false);
  };

  const handleChange = (event:any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    console.log(reader);

    reader.readAsText(file, "UTF-8");
    reader.onload = async (evt) => {
      console.log(evt.target.result);
      let jsonfile;
  
      // check is json
      try {
        jsonfile = JSON.parse(evt.target.result as string);
      } catch (err) {
        alert("only update json file");
        return;
      }
 
      // check format
      if(jsonfile?.appName!== APP_NAME_SPACE){
        alert("update json file format error");
        return;
      }
      if(!Array.isArray(jsonfile?.data) || !jsonfile?.data?.length){
        alert("update json file format error");
        return;
      }
 
      for (const textData of jsonfile.data) {
        await createCommand('textData', textData);
        setVoiceCards((previousData :any) => ([
          ...previousData, textData
        ]));
      }
      for (const tagData of jsonfile.tags) {
        createCommand('tagData',tagData);
        setTags((previousData :any) => ([
          ...previousData, tagData
        ]));
      }
    };
    setOpen(false);
  };

  const handleImportJson = () => {
    uploadFile.current.click();
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xs"
        PaperProps={{ style: { overflowY: 'unset', width: '150%' } }}
      >
        <DialogTitle id="responsive-dialog-title" style={{ textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>
            {t('addVoiceData')}
          <Box sx={{ height:1, border:2 }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box style={{ paddingTop: '1rem' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddByDialog}
              fullWidth
            >
                {t('addNewVoiceCard')}
            </Button>
            </Box>
            <Box style={{ paddingTop: '1rem' }}>
            {/* // upload */}
            <Button 
              variant="contained"
              color="primary"
              onClick={handleImportJson}
              fullWidth
            >
                {t('importVoiceCard')}
            </Button>
            </Box>
            <input type='file' ref={uploadFile} onChange={handleChange} style={{display: 'none'}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton
            style={{
                position: 'absolute',
                left: '95%',
                top: '-5%',
                backgroundColor: '#280b0bff'
            }}
            onClick={handleClose}
          >
            <img src="src/public/images/dialog_close_button.png" height={20} width={20} />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCardDialog;