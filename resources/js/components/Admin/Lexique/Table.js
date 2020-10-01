import React, {useEffect} from 'react';
import MaterialTable from 'material-table';

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { useSelector } from 'react-redux';
import { deleteMot, addMot, editMot } from '../../../actions/lexiqueActions';
import axios from 'axios';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };



export default function Table() {

  const store = useSelector(store => store);


  const [state, setState] = React.useState({
    columns: [
      { title: 'Creole', field: 'creole' },
      { title: 'Francais', field: 'francais' },
      { title: 'Explication', field: 'explication' }
      // ,
      // {
      //   title: 'Birth Place',
      //   field: 'birthCity',
      //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      // },
    ],
    data:[]
    //  store.lexique.items
    //  [
    //   { id:1, creole: 'bonjou1', francais: 'bonjour1', explication: 'salutation1' ,created_at:"2020-05-13 00:00:00",updated_at:"2020-05-20 00:00:00"},
    //   {id:1, creole: 'bonjou2', francais: 'bonjour2', explication: 'salutation2',created_at:"2020-05-13 00:00:00",updated_at:"2020-05-20 00:00:00" },
    //   {id:1, creole: 'bonjou3', francais: 'bonjour3', explication: 'salutation3',created_at:"2020-05-13 00:00:00",updated_at:"2020-05-20 00:00:00" },
    // ],
  });
  useEffect(()=>{
    axios.get('/api/lexique')
      .then(res =>{
        console.log(res.data.data);
         setState({
           ...state,
          data: res.data.data})
      })
      .catch(err => {
        console.log(err);
      })
      },[])

  return (
    <MaterialTable
    icons={tableIcons}
      title="Lexique"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              
              setState((prevState) => {
                const data = [...prevState.data];
                addMot(newData);
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
           
                setState((prevState) => {
                  const data = [...prevState.data];  
                   editMot(newData);
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
        
              setState((prevState) => {
                const data = [...prevState.data]; 
                deleteMot(oldData.id);
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
