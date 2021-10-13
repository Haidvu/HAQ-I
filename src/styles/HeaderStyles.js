import { common } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const HeaderStyles = makeStyles((theme) => ({
  companyName: {
    fontSize: "24px",
    fontWeight: "bold",
    padding: "6px 5px",
  },
  buttonContainer: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  appBarText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: common.white,
    padding: "0px 2px"
  },
  menuMobile: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
}));

export default HeaderStyles