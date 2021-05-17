import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { Button, LinearProgress } from '@material-ui/core';;

export default function CharacterList() {
    //const { id } = useParams();
    const [page, setPage] = useState(0);
    const [totalCount, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const handlePageChange = (params) => {
        setPage(params.page);
    };

    useEffect(() => {
        setLoading(true);
        fetch(`https://swapi.dev/api/people/?page=${page + 1}`)
            .then(response => response.json())
            .then(data => {
                setCount(data.count);
                setData(data.results.map((item, index) => {
                    return {...item, id: index};
                }));
                setLoading(false);
            })
            .catch(() => {
                
            });
    }, [page]);

  
    const onCharacterSelectHandler = (id) => {
        history.push(`/details/${id}`);
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'height', headerName: 'Height', width: 150 },
        { field: 'mass', headerName: 'Mass', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'birth_year', headerName: 'Birth Year', width: 150 },
        {
            field: 'id',
            headerName: ' ',
            width: 150,
            renderCell: (params) => (
              <strong>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginLeft: 16 }} onClick={() => onCharacterSelectHandler(params.value + 1)}
                >
                  Details
                </Button>
              </strong>
            ),
          }
    ];

    const CustomLoadingOverlay = () => {
        return (
          <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
              <LinearProgress />
            </div>
          </GridOverlay>
        );
      }

    return (
        <div style={{ height: 700, width: '100%' }}>            
            <DataGrid
                components={{
                    LoadingOverlay: CustomLoadingOverlay,
                }}
                loading = {loading}
                columns={columns}
                rows={data}                
                pagination
                pageSize={10}
                rowCount={totalCount}
                paginationMode="server"
                onPageChange={handlePageChange}
            />
        </div>
    )
}
