/* React Config */
import * as React from 'react';
import {useState} from "react";

/* React i18n Config */
import "../../../i18n";
import { useTranslation } from "react-i18next";

/* Other Package */
import * as dayjs from 'dayjs';

/* Mui Compoent */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

/* Constants */
import { APP_NAME_SPACE, VERSION } from '../../../constants/common';

interface IExportVoiceCardDialog {
    open: boolean;
    setOpen: Function;
    tags: any[];
    voiceCards: any[];
}

const AddVoiceCardDialog = (prop: IExportVoiceCardDialog) => {
  const { 
    //dialog-control
    open,
    setOpen,
    tags,
    voiceCards,
   } = prop;

  const { t } = useTranslation();
  const [ selectTag, setSelectTag ] = useState('all') ;
  const handleSubmit = () => {
    const matchVoiceCards = selectTag !== 'all' ? voiceCards?.filter((e: any) => e?.tag === selectTag) : voiceCards;
    if (!voiceCards.length) {
      alert(t('notFetchVoiceCard'));
      return;
    }

    const exportjson = {
      appName: APP_NAME_SPACE,
      version: VERSION,
      data: voiceCards
    } 
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(exportjson, null, 4)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download =  `exportJP_${dayjs().format('YYYY-MM-DD_HH_mm_ss')}.json`;
    document.body.appendChild(element);
    element.click();
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
            {t('exportFile')}
            <Box sx={{ height:1, border:2 }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                  <TextField
                      id="standard-select-curreawaitncy"
                      select
                      label={`■ ${t("tag")}`}
                      value={selectTag}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSelectTag(value)
                      }}
                      variant="standard"
                      style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                      fullWidth
                  >
                    <MenuItem value={'all'}>{t("allTag")}</MenuItem>
                    {tags?.map((tag: any) => (
                      <MenuItem value={tag.uuid}>{tag.name}</MenuItem>
                    ))} 
                  </TextField>
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
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            EXPORT JSON
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddVoiceCardDialog