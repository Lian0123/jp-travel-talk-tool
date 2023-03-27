/* React Config */
import * as React from "react";
import {useEffect, useState} from "react";

/* React i18n Config */
import { useTranslation } from "react-i18next";
import "../../i18n";

/* Mui Compoent */
import AppBar from "@mui/material/AppBar";
import Backdrop from "@mui/material/Backdrop";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

/* Components */
import AboutDialog from '../Dialog/AboutDialog';
import AddCardDialog from '../Dialog/AddCardDialog';
import AddVoiceCardDialog from '../Dialog/AddVoiceCardDialog';
import AddTagsDialog from '../Dialog/AddTagsDialog';
import ExportDialog from '../Dialog/ExportDialog';
import SearchDialog from '../Dialog/SearchDialog';
import VoiceCard from "../VoiceCard";

const ViewPage = (props: any) => {
    const {
        createCommand,
        updateCommand,
        readCommand,
        readAllCommand,
        deleteCommand,
        response,
        isConnection
    } = props;

    const { t } = useTranslation();
    const [voiceCards, setVoiceCards] = useState([]);
    const [tags,setTags] = useState([]);
    const [search, setSearch] = useState('');
    const [tag, setTag] = useState('all');

    const [isShowAboutDialog,setIsShowAboutDialog] = useState(false);
    const [isShowExportDialog, setIsShowExportDialog] = useState(false);
    const [isShowAddCardDialog,setIsShowAddCardDialog] = useState(false);
    const [isShowAddVoiceCardDialog,setIsShowAddVoiceCardDialog] = useState(false);
    const [isShowAddTagDialog,setIsShowAddTagDialog] = useState(false);
    const [isShowSearchDialog,setIsShowSearchDialog] = useState(false);

    const [isClickMenu, setIsClickMenu] = useState(false);
    const handleOpen = () => setIsClickMenu(true);
    const handleClose = () => setIsClickMenu(false);

    const initVoiceCardData = async () => {
        const data = await readAllCommand('textData');
        if(!data?.length) {
             return;
        }
        setVoiceCards(data);
    };

    const initTagData = async () => {
        const data = await readAllCommand('tagData');
        if(!data?.length) {
             return;
        }
        setTags(data);
    };

    useEffect(() => {
        if(isConnection) {
            initVoiceCardData();
            initTagData();
        }
    }, [isConnection]);
      
    return (
        <> 
            <Backdrop style={{zIndex: 1024}} open={isClickMenu} />

            <AppBar position="fixed">
                <Toolbar><b>{t('appName')}</b></Toolbar>
            </AppBar>
            <Toolbar />
            <Container style={{ paddingBottom: '10%' }}>
                {
                    voiceCards?.filter(voiceCard => tag === 'all' || voiceCard?.tag === tag)
                              ?.filter(voiceCard => voiceCard?.title?.includes(search))
                              ?.map(voiceCard => (
                    <>
                        <VoiceCard
                        uuid={voiceCard.uuid}
                        title={voiceCard.title}
                        tag={voiceCard.tag}
                        voiceText={voiceCard.text}
                        speakText={voiceCard.speakText}
                        aboutText={voiceCard.about}
                        createdTime={voiceCard.createdTime}
                        updatedTime={voiceCard.updatedTime}
                        order={voiceCard.order}
                        tags={tags}
                        createCommand={createCommand}
                        readCommand={readCommand}
                        deleteCommand={deleteCommand}
                        voiceCards={voiceCards}
                        setVoiceCards={setVoiceCards}
                        setIsShowAddTagDialog={setIsShowAddTagDialog}
                        updateCommand={updateCommand}
                        /> 
                        <br/>
                    </>
                ))}
            </Container>

            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Select
                    style={{color:"#ffffffff", paddingRight: "60px" }}
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={'all'}
                    size="medium"
                    IconComponent={() => (
                        <img src="src/public/images/white_select_icon.png" height={20} width={20} />
                    )}
                    onChange={(e) => setTag(e.target.value)}
                >
                    <MenuItem value={'all'}>{t("allTag")}</MenuItem>
                    {tags?.map(tag => (
                        <MenuItem value={tag.uuid}>{tag.name}</MenuItem>
                    ))} 
                </Select>
            </Typography>

            
            <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 0, right: 16, padding: 0 }}
                    style={{ lineHeight: "1rem", borderRadius: '0%' }}
                    onClick={ () => !isClickMenu ? handleOpen() : handleClose()} 
                    onClose={handleClose}
                    open={isClickMenu}
                    icon={
                        isClickMenu
                        ? <img src="src/public/images/page_close.png" height={40} width={40} />
                        : <img src="src/public/images/page_menu.png" height={40} width={40} />
                    }
                    >
                        <SpeedDialAction
                            key={"Setting"}
                            icon={<img src="src/public/images/setting_button.png" height={40} width={40} />}
                            tooltipTitle={"Setting"}
                            tooltipOpen
                            style={{ lineHeight: "1rem" }}
                            onClick={() => {
                                handleClose();
                                setIsShowAboutDialog(true);
                            }}
                        />
                        <SpeedDialAction
                            key={"Export"}
                            icon={<img src="src/public/images/export_button.png" height={40} width={40} />}
                            tooltipTitle={"Export"}
                            tooltipOpen
                            style={{ lineHeight: "1rem" }}
                            onClick={() => {
                                handleClose();
                                setIsShowExportDialog(true);
                            }}
                        />
                        <SpeedDialAction
                            key={"Search"}
                            icon={<img src="src/public/images/search_button.png" height={40} width={40} />}
                            tooltipTitle={"Search"}
                            tooltipOpen
                            style={{ lineHeight: "1rem" }}
                            onClick={() => {
                                handleClose();
                                setIsShowSearchDialog(true);
                            }}
                        />
                        <SpeedDialAction
                            key={"Add"}
                            icon={<img src="src/public/images/add_button.png" height={40} width={40} />}
                            tooltipTitle={"Add"}
                            tooltipOpen
                            style={{ lineHeight: "1rem" }}
                            onClick={() => {
                                handleClose();
                                setIsShowAddCardDialog(true);
                            }}
                        />
                </SpeedDial>
        </Toolbar>
      </AppBar>

      <AboutDialog
        open={isShowAboutDialog}
        setOpen={setIsShowAboutDialog}
        createCommand={createCommand}
        readCommand={readCommand}
        deleteCommand={deleteCommand}
        isConnection={isConnection}
        />
      <SearchDialog
        open={isShowSearchDialog}
        setOpen={setIsShowSearchDialog}
        setSearch={setSearch}
       />
      <AddCardDialog
        open={isShowAddCardDialog}
        setOpen={setIsShowAddCardDialog}
        setCardDialogOpen={setIsShowAddVoiceCardDialog}
        setVoiceCards={setVoiceCards}
        setTags={setTags}
        createCommand={createCommand}
        />
      <AddVoiceCardDialog
        open={isShowAddVoiceCardDialog}
        setOpen={setIsShowAddVoiceCardDialog}
        tags={tags}
        setIsShowAddTagDialogOpen={setIsShowAddTagDialog}
        createCommand={createCommand}
        readCommand={readCommand}
        deleteCommand={deleteCommand}
        response={response}
        voiceCards={voiceCards}
        setVoiceCards={setVoiceCards}
        />
       <AddTagsDialog
        open={isShowAddTagDialog}
        setOpen={setIsShowAddTagDialog}
        tags={tags}
        setTags={setTags}
        createCommand={createCommand}
        />
        <ExportDialog
         open={isShowExportDialog}
         setOpen={setIsShowExportDialog}
         tags={tags}
         voiceCards={voiceCards}
         />
        </>
    );
};

export default ViewPage;
