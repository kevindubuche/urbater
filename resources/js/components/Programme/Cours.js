import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Base de donnees', 159, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'),
  createData('Base de donnees', 159, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'),
  createData('Base de donnees', 159, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'),
  createData('Base de donnees', 159, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'),
  createData('Base de donnees', 159, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'),
  createData('Base de donnees', 159, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'),
  createData('Base de donnees', 159, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'),
  createData('Base de donnees', 159, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'),
  createData('Base de donnees', 159, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'),
  createData('Base de donnees', 159, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'),
];

export default function Cours() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Titre du cours</TableCell>
            <TableCell align="right">Nombre de crédits</TableCell>
            <TableCell align="right">Nombre de semestre</TableCell>
            <TableCell align="right">Description</TableCell>
   </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
