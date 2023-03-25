/* React Config */
import * as React from 'react';
import {useState} from "react";

/* React i18n Config */
import "../../../i18n";
import { useTranslation } from "react-i18next";

/* Other Package */
import * as dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

/* Mui Compoent */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

interface IAddTagsDialog {
    open: boolean;
    setOpen: (...dto :any) => any;
    tags: any[];
    setTags: (...dto :any) => any;
    createCommand: (...dto :any) => any;
}

const DEFAULT_VOICE_CARD_DATA = {
  name: '',
  order: 0
};

const AddTagsDialog = (prop: IAddTagsDialog) => {
  const { 
    //dialog-control
    open,
    setOpen,
    tags,
    setTags,
    // db-control
    createCommand,
   } = prop;

  const { t } = useTranslation();
  const [ tagsData, setTagsData ] = useState(DEFAULT_VOICE_CARD_DATA) ;

  const handleAdd = async () => {
    const { name } = tagsData;
    if(!name?.trim().length) {
      alert("name not found");
      return;
    }
    const tagData = {
      uuid: uuidv4(),
      name: name.trim(),
      order: 0,
      createdTime: dayjs().toISOString(),
      updatedTime: dayjs().toISOString(),
    };
    createCommand('tagData',tagData);
    setTags((previousData :any) => ([
      ...previousData, tagData
    ]));
    await setTagsData(DEFAULT_VOICE_CARD_DATA);
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
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
            {t('addAndEditTag')}
            <Box sx={{ height:1, border:2 }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                <TextField
                    id="standard-multiline-static"
                    label={`■ ${t("addTag")}`}
                    value={tagsData.name}
                    onChange={(event) => {
                      const { value } = event.target;
                      setTagsData(previousData => ({ 
                        ...previousData,
                        name: value
                      }));
                    }}
                    variant="standard"
                    style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleAdd} fullWidth>
                  ADD
                </Button>
                <Box sx={{ height:1, border:0 }} />
                <br/>
                <p>■ {t("editTag")}</p>
                <List sx={{ bgcolor: 'background.paper' }}>
                  {tags?.map((value: any) => (
                    <ListItem
                      key={value.uuid}
                      disableGutters
                      secondaryAction={
                        <IconButton style={{backgroundColor: '#280b0bff', borderRadius: '0%'}}>
                          <img src="src/public/images/trash_icon.png" height={20} width={20} />
                        </IconButton>
                      }
                    >
                      <ListItemText style={{ width: '100%' }} primary={value?.name||''} />
                    </ListItem>
                  ))}
                </List>
                <br/>
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                   APPROVE
                </Button>
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

export default AddTagsDialog;