/* React Config */
import * as React from 'react';
import {useEffect, useState} from 'react';

/* React i18n Config */
import "../../../i18n";
import { useTranslation } from "react-i18next";

/* Mui Compoent */
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

interface IAboutDialog {
    open: boolean;
    setOpen: Function;
    createCommand: Function;
    readCommand: Function;
    deleteCommand: Function;
    isConnection: boolean;
}

const DEFAULT_CONFIG = {
  language: 'zh-TW',
  mode: 'right'
};

const AboutDialog = (prop: IAboutDialog) => {
  const { 
    //dialog-control
    open,
    setOpen,
    // db-control
    createCommand,
    readCommand,
    deleteCommand,
    isConnection,
   } = prop;

   const { t, i18n } = useTranslation();
  const [ configData, setConfigData ] = useState(DEFAULT_CONFIG) 


  const initChangeLanguage = async () => {
    const data = await readCommand('configData','language')
    const { value } = data;
    if(!value) {
      i18n.changeLanguage(DEFAULT_CONFIG.language);
      return
    }

    i18n.changeLanguage(value || DEFAULT_CONFIG.language);
    setConfigData(previousData => ({ 
      ...previousData,
      language: value || DEFAULT_CONFIG.language
    }))
    
  }
  const initChangeMode = async () => {
    const data = await readCommand('configData','mode')
    const { value } = data?.value;
    if(!value) {
      return
    }

    setConfigData(previousData => ({ 
      ...previousData,
      mode: value || DEFAULT_CONFIG.mode
    }))
  }
  useEffect(() => {
    if(isConnection) {
      initChangeLanguage()
      initChangeMode()
    }
  }, [isConnection])
  
  useEffect(() => {
    deleteCommand('configData', 'language')
    createCommand('configData', { key: "language", value: configData.language })
    i18n.changeLanguage(configData.language);
  }, [configData.language])
  
  useEffect(() => {
    deleteCommand('configData', 'mode')
    createCommand('configData', { key: "mode", value: configData.mode })
  }, [configData.mode])

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
            {t('about')}
            <Box sx={{ height:1, border:2 }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                <p>{t("aboutContent")}</p>
                <p>github: <Link href="https://github.com/Lian0123/jp-travel-talk-tool">{t("projectLink")}</Link></p>
                <TextField
                    id="standard-select-currency"
                    select
                    label={`■ ${t("changeLanguage")}`}
                    value={configData.language}
                    onChange={(event) => {
                      const { value } = event.target;
                      setConfigData(previousData => ({ 
                        ...previousData,
                        language: value
                      }))
                    }}
                    variant="standard"
                    style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    fullWidth
                >
                    <MenuItem value={'en'}>English</MenuItem>
                    <MenuItem value={'zh-TW'}>中文(繁體)</MenuItem>
                </TextField>
                <TextField
                    id="standard-select-currency"
                    select
                    label={`■ ${t("handMode")}`}
                    value={configData.mode}
                    onChange={(event) => {
                      const { value } = event.target;
                      setConfigData(previousData => ({ 
                        ...previousData,
                        mode: value
                      }))
                    }}
                    variant="standard"
                    style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    fullWidth
                    disabled
                >
                    <MenuItem value={'right'}>{t("rightHandMode")}</MenuItem>
                    <MenuItem value={'left'}>{t("leftHandMode")}</MenuItem>
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
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AboutDialog