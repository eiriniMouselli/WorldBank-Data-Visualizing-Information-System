/* Eftihia Kiafa 3003,
   Grigoria Nikita 3048,
   Eirini Mouselli 3031
*/

import './index.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));
  
  const marks = [
    {
      value: 1960,
      label: '1960',
    },
    {
      value: 1965,
      label: '1965',
    },
    {
      value: 1970,
      label: '1970',
    },
    {
      value: 1975,
      label: '1975',
    },
    {
      value: 1980,
      label: '1980',
    },
    {
      value: 1985,
      label: '1985',
    },
    {
      value: 1990,
      label: '1990',
    },
    {
      value: 1995,
      label: '1995',
    },
    {
      value: 2000,
      label: '2000',
    },
    {
      value: 2005,
      label: '2005',
    },
    {
      value: 2010,
      label: '2010',
    },
    {
      value: 2015,
      label: '2015',
    },
    {
      value: 2020,
      label: '2020',
    },

  ];
  
  function valuetext(value) {
    return `${value}`;
  }
  
  export default function DiscreteSlider() {
    const classes = useStyles();
  }