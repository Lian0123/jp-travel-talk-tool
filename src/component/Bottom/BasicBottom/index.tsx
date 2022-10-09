// Basic Package
import PropTypes from "prop-types";

// UI Package
import Button from '@mui/material/Button';

// Component Interface
export interface IsUiButton {
    width: any,
    extra: any,
}

export const sUiButton = (props: any) => {
    const { 
        text,
        extra,
    } = props;

    return (
        <>
            <Button variant="contained" color="primary">
                {text}
            </Button>
            {extra}
       </>
    )
}

sUiButton.propTypes = {
    width: PropTypes.number.isRequired,
    chidden: PropTypes.node,
}

const v1SuiButton = () => {

}