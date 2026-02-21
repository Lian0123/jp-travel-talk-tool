/* React Config */
import * as React from "react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

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
    const [mode, setMode] = useState('right');
    const deferredSearch = useDeferredValue(search);

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

    const initMode = async () => {
        const data = await readCommand('configData', 'mode');
        const modeValue = data?.value || localStorage.getItem('jp_hand_mode') || 'right';
        setMode(modeValue);
    };

    useEffect(() => {
        if(isConnection) {
            initVoiceCardData();
            initTagData();
            initMode();
        }
    }, [isConnection]);

    useEffect(() => {
        const refreshConfig = () => {
            initMode();
        };

        window.addEventListener('jp-config-updated', refreshConfig as EventListener);
        return () => {
            window.removeEventListener('jp-config-updated', refreshConfig as EventListener);
        };
    }, [isConnection]);

    const filteredVoiceCards = useMemo(() => {
        const keyword = deferredSearch.trim().toLowerCase();

        return voiceCards
            ?.filter((voiceCard: any) => tag === 'all' || voiceCard?.tag === tag)
            ?.filter((voiceCard: any) => {
                if (!keyword.length) {
                    return true;
                }

                const title = voiceCard?.title?.toLowerCase?.() || '';
                const text = voiceCard?.text?.toLowerCase?.() || '';
                const about = voiceCard?.about?.toLowerCase?.() || '';

                return title.includes(keyword) || text.includes(keyword) || about.includes(keyword);
            });
    }, [voiceCards, tag, deferredSearch]);
      
    const isRightHandMode = mode !== 'left';
    const menuTooltipPlacement = isRightHandMode ? 'left' : 'right';

    return (
        <> 
            <Backdrop style={{zIndex: 1024}} open={isClickMenu} />

            <AppBar position="fixed">
                <Toolbar><b>{t('appName')}</b></Toolbar>
            </AppBar>
            <Toolbar />
            <Container style={{ paddingBottom: '10%' }}>
                {
                    filteredVoiceCards?.map((voiceCard: any) => (
                    <React.Fragment key={voiceCard.uuid}>
                        <VoiceCard
                        uuid={voiceCard.uuid}
                        title={voiceCard.title}
                        tag={voiceCard.tag}
                        voiceText={voiceCard.text}
                        speakText={voiceCard.speakText}
                        romaText={voiceCard.romaText}
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
                        mode={mode}
                        updateCommand={updateCommand}
                        /> 
                        <br/>
                    </React.Fragment>
                ))}
            </Container>

            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            
            <Toolbar sx={{ flexDirection: isRightHandMode ? 'row' : 'row-reverse' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Select
                    style={{
                        color:"#ffffffff",
                        paddingRight: isRightHandMode ? "60px" : 0,
                        paddingLeft: isRightHandMode ? 0 : "60px"
                    }}
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tag}
                    size="medium"
                    IconComponent={() => (
                        <img src="public/images/white_select_icon.png" height={20} width={20} />
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
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: isRightHandMode ? 16 : 'auto',
                        left: isRightHandMode ? 'auto' : 16,
                        padding: 0
                    }}
                    style={{ lineHeight: "1rem", borderRadius: '0%' }}
                    onClick={ () => !isClickMenu ? handleOpen() : handleClose()} 
                    onClose={handleClose}
                    open={isClickMenu}
                    icon={
                        isClickMenu
                        ? <img src="public/images/page_close.png" height={40} width={40} />
                        : <img src="public/images/page_menu.png" height={40} width={40} />
                    }
                    >
                        <SpeedDialAction
                            key={"Setting"}
                            icon={<img src="public/images/setting_button.png" height={40} width={40} />}
                            tooltipTitle={"Setting"}
                            tooltipPlacement={menuTooltipPlacement}
                            tooltipOpen
                            style={{ lineHeight: "1rem" }}
                            onClick={() => {
                                handleClose();
                                setIsShowAboutDialog(true);
                            }}
                        />
                        <SpeedDialAction
                            key={"Export"}
                            icon={<img src="public/images/export_button.png" height={40} width={40} />}
                            tooltipTitle={"Export"}
                            tooltipPlacement={menuTooltipPlacement}
                            tooltipOpen
                            style={{ lineHeight: "1rem" }}
                            onClick={() => {
                                handleClose();
                                setIsShowExportDialog(true);
                            }}
                        />
                        <SpeedDialAction
                            key={"Search"}
                            icon={<img src="public/images/search_button.png" height={40} width={40} />}
                            tooltipTitle={"Search"}
                            tooltipPlacement={menuTooltipPlacement}
                            tooltipOpen
                            style={{ lineHeight: "1rem" }}
                            onClick={() => {
                                handleClose();
                                setIsShowSearchDialog(true);
                            }}
                        />
                        <SpeedDialAction
                            key={"Add"}
                            icon={<img src="public/images/add_button.png" height={40} width={40} />}
                            tooltipTitle={"Add"}
                            tooltipPlacement={menuTooltipPlacement}
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
        deleteCommand={deleteCommand}
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
