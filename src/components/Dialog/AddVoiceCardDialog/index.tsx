/* React Config */
import * as React from 'react';
import { useState } from "react";

/* React i18n Config */
import "../../../i18n";
import { useTranslation } from "react-i18next";

/* Other Package */
import * as dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
const Kuroshiro = require("kuroshiro").default;
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji").default;

/* Mui Compoent */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

/* Utils */
import { transform } from '../../../utils';


interface IAddVoiceCardDialog {
    open: boolean;
    setOpen: (...dto :any) => any;
    tags: any[];
    setIsShowAddTagDialogOpen: (...dto :any) => any;
    voiceCards: any[];
    setVoiceCards: (...dto :any) => any;
    createCommand: (...dto :any) => any;
    [key: string]: any;
}

interface ITableData {
  uuid?: string;
  title: string;
  tag :string;
  text: string;
  speakText: string;
  about: string;
  order?: number;
  createdTime?: string;
  updatedTime?: string;
}

const DEFAULT_VOICE_CARD_DATA :ITableData = {
  title: '',
  tag: '',
  about: '',
  text: '',
  speakText: ''
};

const AddVoiceCardDialog = (prop: IAddVoiceCardDialog) => {
  const { 
    //dialog-control
    open,
    setOpen,
    tags,
    setIsShowAddTagDialogOpen,
    voiceCards,
    setVoiceCards,
    // db-control
    createCommand,
   } = prop;

  const { t } = useTranslation();
  const [ voiceCard, setVoiceCard ] = useState(DEFAULT_VOICE_CARD_DATA);

  const handleSubmit = async () => {
    const { title, tag, about, text } = voiceCard;

    if(!title?.trim()?.length) {
      alert("title not found");
      return;
    }

    const kuroshiro = new Kuroshiro();
    const analyzer = new KuromojiAnalyzer({ dictPath: `/jp-web-app//src/public/kuromoji`});

    await kuroshiro.init(analyzer);

    const parseText = await kuroshiro.convert(Kuroshiro.Util.kanaToHiragna(text), { to: "hiragana" });
    if(!parseText?.trim()?.length) {
      alert("about not found");
      return;
    }

    const textData = {
      uuid: uuidv4(),
      title: title.trim(),
      tag,
      about: about.trim(),
      text: text.trim(),
      speakText: transform(parseText.trim()),
      order: voiceCards.length + 1,
      createdTime: dayjs().toISOString(),
      updatedTime: dayjs().toISOString(),
    };
  
    await createCommand('textData', textData);
    setVoiceCards((previousData :any) => ([
      ...previousData, textData
    ]));
    setVoiceCard(DEFAULT_VOICE_CARD_DATA);
    setOpen(false);
  };
  
  const handleAddTag = () => {
    setIsShowAddTagDialogOpen(true);
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
        PaperProps={{ style: { overflowY: 'unset' } }}
      >
        <DialogTitle id="responsive-dialog-title" style={{ textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>
            {t('addVoiceData')}
            <Box sx={{ height:1, border:2 }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                <TextField
                    id="standard-multiline-static"
                    label={`■ ${t("title")}`}
                    value={voiceCard.title}
                    onChange={(event) => {
                      const { value } = event.target;
                      setVoiceCard(previousData => ({ 
                        ...previousData,
                        title: value
                      }));
                    }}
                    variant="standard"
                    style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    fullWidth
                />
                  <TextField
                      id="standard-select-curreawaitncy"
                      select
                      label={`■ ${t("tag")}`}
                      value={voiceCard.tag}
                      onChange={(event) => {
                        const { value } = event.target;
                        setVoiceCard(previousData => ({ 
                          ...previousData,
                          tag: value
                        }));
                      }}
                      variant="standard"
                      style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button variant="contained" color="primary" onClick={handleAddTag} fullWidth>
                              NEW
                            </Button>
                          </InputAdornment>
                        )
                      }}
                  >
                    <MenuItem value={''}>{t("notTag")}</MenuItem>
                    {tags?.map((tag: any) => (
                      <MenuItem value={tag.uuid}>{tag.name}</MenuItem>
                    ))} 
                  </TextField>
                <TextField
                    id="standard-multiline-static"
                    label={`■ ${t("voiceText")}`}
                    value={voiceCard.text}
                    onChange={(event) => {
                      const { value } = event.target;
                      setVoiceCard(previousData => ({ 
                        ...previousData,
                        text: value
                      }));
                    }}
                    multiline
                    rows={3}
                    defaultValue=""
                    variant="standard"
                    style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    fullWidth
                />
                <TextField
                    id="standard-multiline-static"
                    label={`■ ${t("voiceAbout")}`}
                    value={voiceCard.about}
                    onChange={(event) => {
                      const { value } = event.target;
                      setVoiceCard(previousData => ({ 
                        ...previousData,
                        about: value
                      }));
                    }}
                    multiline
                    rows={3}
                    defaultValue=""
                    variant="standard"
                    style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    fullWidth
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
            <img src="src/public/images/dialog_close_button.png" height={20} width={20} />
          </IconButton>
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddVoiceCardDialog;