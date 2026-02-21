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
    setOpen: (...dto :any) => any;
    createCommand: (...dto :any) => any;
    readCommand: (...dto :any) => any;
    deleteCommand: (...dto :any) => any;
    isConnection: boolean;
}

const DEFAULT_CONFIG = {
  language: 'zh-TW',
  mode: 'right',
  ttsEngine: 'browser',
  ttsEndpoint: ''
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
  const [ configData, setConfigData ] = useState(DEFAULT_CONFIG); 


  const initChangeLanguage = async () => {
    const data = await readCommand('configData','language');
    const { value } = data;
    if(!value) {
      i18n.changeLanguage(DEFAULT_CONFIG.language);
      return;
    }

    i18n.changeLanguage(value || DEFAULT_CONFIG.language);
    setConfigData(previousData => ({ 
      ...previousData,
      language: value || DEFAULT_CONFIG.language
    }));
    
  };
  const initChangeMode = async () => {
    const data = await readCommand('configData','mode');
    const value = data?.value;
    if(!value) {
      localStorage.setItem('jp_hand_mode', DEFAULT_CONFIG.mode);
      return;
    }

    setConfigData(previousData => ({ 
      ...previousData,
      mode: value || DEFAULT_CONFIG.mode
    }));
    localStorage.setItem('jp_hand_mode', value || DEFAULT_CONFIG.mode);
  };

  const initTTSConfig = async () => {
    const ttsEngineData = await readCommand('configData', 'ttsEngine');
    const ttsEndpointData = await readCommand('configData', 'ttsEndpoint');

    const ttsEngine = ttsEngineData?.value || DEFAULT_CONFIG.ttsEngine;
    const ttsEndpoint = ttsEndpointData?.value || DEFAULT_CONFIG.ttsEndpoint;

    localStorage.setItem('jp_tts_engine', ttsEngine);
    localStorage.setItem('jp_tts_endpoint', ttsEndpoint);

    setConfigData((previousData) => ({
      ...previousData,
      ttsEngine,
      ttsEndpoint
    }));
  };

  useEffect(() => {
    if(isConnection) {
      initChangeLanguage();
      initChangeMode();
      initTTSConfig();
    }
  }, [isConnection]);
  
  useEffect(() => {
    deleteCommand('configData', 'language');
    createCommand('configData', { key: "language", value: configData.language });
    i18n.changeLanguage(configData.language);
  }, [configData.language]);
  
  useEffect(() => {
    deleteCommand('configData', 'mode');
    createCommand('configData', { key: "mode", value: configData.mode });
    localStorage.setItem('jp_hand_mode', configData.mode);
    window.dispatchEvent(new CustomEvent('jp-config-updated'));
  }, [configData.mode]);

  useEffect(() => {
    deleteCommand('configData', 'ttsEngine');
    createCommand('configData', { key: 'ttsEngine', value: configData.ttsEngine });
    localStorage.setItem('jp_tts_engine', configData.ttsEngine);
  }, [configData.ttsEngine]);

  useEffect(() => {
    deleteCommand('configData', 'ttsEndpoint');
    createCommand('configData', { key: 'ttsEndpoint', value: configData.ttsEndpoint });
    localStorage.setItem('jp_tts_endpoint', configData.ttsEndpoint);
  }, [configData.ttsEndpoint]);

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
                      }));
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
                      }));
                    }}
                    variant="standard"
                    style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    fullWidth
                >
                    <MenuItem value={'right'}>{t("rightHandMode")}</MenuItem>
                    <MenuItem value={'left'}>{t("leftHandMode")}</MenuItem>
                </TextField>
                <TextField
                    id="standard-select-tts-engine"
                    select
                    label={`■ ${t("ttsEngine")}`}
                    value={configData.ttsEngine}
                    onChange={(event) => {
                      const { value } = event.target;
                      if (value === 'cloud') {
                        return;
                      }
                      setConfigData((previousData) => ({
                        ...previousData,
                        ttsEngine: value
                      }));
                    }}
                    variant="standard"
                    disabled={true}
                    style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    fullWidth
                >
                    <MenuItem value={'browser'}>{t("ttsBrowser")}</MenuItem>
                    <MenuItem value={'cloud'}>{t("ttsCloud")}</MenuItem>
                </TextField>
                <TextField
                    id="standard-tts-endpoint"
                    label={`■ ${t("ttsEndpoint")}`}
                    value={configData.ttsEndpoint}
                    onChange={(event) => {
                      const { value } = event.target;
                      setConfigData((previousData) => ({
                        ...previousData,
                        ttsEndpoint: value
                      }));
                    }}
                    variant="standard"
                    style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    placeholder="https://your-tts-api.example.com/speak"
                    fullWidth
                    disabled={configData.ttsEngine !== 'cloud'}
                />
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
            <img src="public/images/dialog_close_button.png" height={20} width={20} />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AboutDialog;