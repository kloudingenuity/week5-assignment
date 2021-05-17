import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Avatar, Typography, Divider, CircularProgress } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 800,
      marginLeft:100,
      marginTop: 20,
      marginBottom: 20
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

export default function DetailsCard() {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const fetchFilms = (result) => {
        result.forEach(e => {
            fetch(e)
            .then(response => response.json())
            .then(data => {                 
                setFilms(prev => [...prev, data]);
            })
            .catch(() => {
                
            });
        });
    }

    useEffect(() => {
        setLoading(true);
        fetch(`https://swapi.dev/api/people/${id}/`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                fetchFilms(data.films);  
                setLoading(false);
            })
            .catch(() => {
                
            });              
    }, [id]);

    const sortByProperty = (property) => {  
        return function(a,b){  
           if(a[property] > b[property])  
              return 1;  
           else if(a[property] < b[property])  
              return -1;  
       
           return 0;  
        }  
     }

    const cardContent = films
                        .sort(sortByProperty("release_date"))
                        .map((item, index) => {
                            return(
                                <CardContent key={index}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Title: </b>{item.title} - <b>Episode: </b> {item.episode_id}
                                        <br/ >
                                        <b>Director: </b>{item.director}
                                        <br/ >
                                        <b>Producer: </b>{item.producer}
                                        <br/ >
                                        <b>Release Date: </b>{item.release_date}
                                        <br/ >
                                        {item.opening_crawl}
                                    </Typography>
                                    <Divider light />
                                </CardContent>
                            );
                        });
    
    return (
    <div>        
        {loading && <CircularProgress />}
        <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {data.name ? data.name[0] : ''}
                </Avatar>
                }
                title={data.name}
                subheader={`Height: ${data.height} - Mass: ${data.mass}`}
            />            
            <Divider light />
            <CardContent>
                <Typography variant="h5" component="h2">
                    Films:
                </Typography>
            </CardContent>
            {cardContent}
        </Card>
    </div>
    )
}
