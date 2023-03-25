/* React Config */
import * as React from "react";
import {useState} from "react";

/* React i18n Config */
import { useTranslation } from "react-i18next";
import "../../i18n";

/* Mui Compoent */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

/* Components */
import VoicePlayer from "../Common/VoicePlayer";
import EditVoiceCardDialog from '../Dialog/EditVoiceCardDialog';

interface IVoiceCard {
    tag: string,
    title: string,
    voiceText: string,
    speakText: string,
    aboutText: string,
    [key: string]: any;
}

const VoiceCard = (props: IVoiceCard) => {
    const { 
    //dialog-control
        uuid,
        tags,
        tag,
        title,
        voiceText,
        speakText,
        aboutText,
        setIsShowAddTagDialog,
        createdTime,
        voiceCards,
        setVoiceCards,
        order,
        // db-control
        createCommand,
        readCommand,
        updateCommand,
        deleteCommand,
    } = props;

    const { t } = useTranslation();
    const [isClickMenu, setIsClickMenu] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    
    const [isShowEditVoiceCardDialog,setIsShowEditVoiceCardDialog] = useState(false);
    // const [isShowOrderCardDialog, setIsShowOrderCardDialog] = useState(false);
    
    
    const [isClickPlaying, setIsClickPlaying] = useState(false);
    const handleOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
        setIsClickMenu(true);
    };
    const handleClose = () => {
        setIsClickMenu(false);
        setAnchorEl(null);
    };
    const handelEdit = () => {
        setIsShowEditVoiceCardDialog(true);
    };
    const handelDelete = async () => {
        await deleteCommand('textData',uuid);
        setVoiceCards((previousData :any) => previousData?.filter((data: any) => data.uuid !== uuid));
    };
    
    return (
        <>
            <Box sx={{ backgroundColor: "#ffffffff", border:5, borderColor:"#280b0bff" }}>
                <Container>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                    >
                        <Box width="30%">
                            <Box 
                                m={1}
                                style={{ 
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    backgroundColor: "#000000ff",
                                    color: "#ffffffff",
                                    textAlign: "center"
                                }}>
                                <span><b>{tags?.find((tagData:any) => tagData?.uuid === tag)?.name || t("notTag")}</b></span>
                            </Box>
                        </Box>
                        <Box width="50%">
                            <Box m={1}>
                            <span ><b>{title}</b></span>
                            </Box>
                        </Box>
                        <Box width="20%" style={{ textAlign: "right"}}>
                            <Button
                                onClick={handleOpen}
                                style={{
                                     zIndex: 5, 
                                     minWidth: "32px", 
                                     textAlign: "right", 
                                     lineHeight: "1rem", 
                                     padding: 0, 
                                     marginRight: '1rem', 
                                     marginLeft: '1rem'
                                }}
                                id="card-menu-button"
                                aria-controls={'card-menu'}
                                aria-haspopup={isClickMenu ? 'true' : undefined}
                                aria-expanded={isClickMenu ? 'true' : undefined}
                            >
                                <img src="src/public/images/card_menu.png" height={20} width={20} />
                            </Button>
                        </Box>
                        <Menu
                            id="card-menu"
                            aria-labelledby="card-menu-button"
                            anchorEl={anchorEl}
                            open={isClickMenu}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => handelEdit()}>{t("edit")}</MenuItem>
                            <MenuItem onClick={() => handelDelete()}>{t("delete")}</MenuItem>
                            <MenuItem disabled>{t("setOrder")}</MenuItem>
                        </Menu>
                    </Grid>
                    <Box sx={{ height:1, border:1,}} />
                    <Box m={1}>
                        <b>{t("voiceText")}</b>
                        <p>{voiceText||"not Text"}</p>
                    </Box>
                    <Box m={1}>
                        <b>{t("voiceAbout")}</b>
                        <p>{aboutText||"not Text"}</p>
                    </Box>
                    <Box m={1}>
                       <Button
                        fullWidth
                        onClick={() => setIsClickPlaying(!isClickPlaying)}
                        style={{border: 2, lineHeight: "1rem" }}
                        variant="contained"
                        color="primary"
                        endIcon={
                            <img src="src/public/images/play_icon.png" height={20} width={20} />
                        }
                        >
                            {t("playAudio")}
                        </Button> 
                    </Box>
                </Container>
            </Box>
            <VoicePlayer
                text={speakText}
                isClickPlaying={isClickPlaying}
                setIsClickPlaying={setIsClickPlaying}
            />

         <EditVoiceCardDialog
           open={isShowEditVoiceCardDialog}
           setOpen={setIsShowEditVoiceCardDialog}
           tags={tags}
           uuid={uuid}
           title={title}
           tag={tag}
           text={voiceText}
           about={aboutText}
           order={order}
           createdTime={createdTime}
           setIsShowAddTagDialogOpen={setIsShowAddTagDialog}
           createCommand={createCommand}
           readCommand={readCommand}
           deleteCommand={deleteCommand}
           voiceCards={voiceCards}
           setVoiceCards={setVoiceCards}
           updateCommand={updateCommand}
           />

       
        {/* chek set order */}
        </>
    );
};

export default VoiceCard;