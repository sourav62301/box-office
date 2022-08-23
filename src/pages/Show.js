import React from 'react';
import { useParams } from 'react-router';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import { InfoBlock, ShowPageWrapper } from '../components/show/Show.styled';
import ShowMainData from '../components/show/ShowMainData';
import {useShow} from '../misc/custom-hook'







export const Show = () => {
  const {id} = useParams();

  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState(null);

  // console.log(show)

  const {show, isLoading, error} = useShow(id);

  if(isLoading){
    return (
      <div>
        Data is being Loading..
      </div>
    )
  }

  if(error){
    return (
      <div>
        Error Occured : {error}
      </div>
    )
  }
  
  return <ShowPageWrapper>
    <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres} />
    <InfoBlock>
      <h2>Details</h2>
      <Details status={show.status} network={show.network} premiered={show.premiered} />
    </InfoBlock>
    <InfoBlock>
      <h2>Seasons</h2>
      <Seasons seasons={show._embedded.seasons} />
    </InfoBlock>
    <InfoBlock>
      <h2>Cast</h2>
      <Cast cast = {show._embedded.cast}/>
    </InfoBlock>
  </ShowPageWrapper>;
};

