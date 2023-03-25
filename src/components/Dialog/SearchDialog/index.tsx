/* React Config */
import * as React from 'react';
import { useState }from 'react';

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
import TextField from '@mui/material/TextField';


interface ISearchDialog {
    open: boolean;
    setOpen: (...dto :any) => any;
    setSearch: (...dto :any) => any;
}

const SearchDialog = (prop: ISearchDialog) => {
  const { 
    //dialog-control
    open,
    setOpen,
    setSearch,
   } = prop;

  const { t } = useTranslation();

  const [searchText, setSearchText] = useState('');

  const handleClose = () => {
    setSearch(searchText);
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
            {t('searchData')}
            <Box sx={{ height:1, border:2 }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                <TextField
                    id="standard-multiline-static"
                    label={`■ ${t("searchContent")}`}
                    value={searchText}
                    variant="standard"
                    onChange={(e) => setSearchText(e.target.value)}
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
          <Button variant="contained" color="primary" onClick={handleClose} fullWidth>
            {t("search")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SearchDialog;