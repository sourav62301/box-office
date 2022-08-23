import React, { useState, useEffect } from 'react';
import { MainPageLayout } from '../components/MainPageLayout';
import { useShows } from '../misc/custom-hook';
import {apiGet} from '../misc/config'
import ShowGrid from '../components/show/ShowGrid';

export const Starred = () => {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(starred && starred.length>0){
      const promises = starred.map(showId=> apiGet(`/shows/${showId}`))
      Promise.all(promises)
      .then(apiData => apiData.map(show=>({show})))
      .then(results=>{
        setShows(results);
        setIsLoading(false)
      })
      .catch(err=>{
        setError(err.message);
        setIsLoading(false);
      })
    }
    else{
      setIsLoading(false);
    }
  }, [starred]);

  return (
      <MainPageLayout>
      {
        isLoading && <div>Show are Loading..</div>
      }  
      {
        error && <div>Error Occured : {error}</div>
      }
      {
        !isLoading && !shows && <div>No Shows to Show..</div>
      }
      {
        !isLoading && !error && shows && <ShowGrid data={shows} />
      }
      </MainPageLayout>
  );
};



  