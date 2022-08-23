import React, { useState, useCallback } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import { MainPageLayout } from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import {useLastQuery, useWhyDidYouUpdate} from '../misc/custom-hook';
import {SearchInput, RadioInputsWrapper, SearchButtonWrapper} from './Home.styled'
import CustomRadio from '../components/CustomRadio'

export const Home = () => {
  
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';



  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result =>
      setResults(result)
    );
  };

  const onInputChange = useCallback(
    event => {
      setInput(event.target.value);
    }, [setInput]
  )

  

  const onKeyDown = 
    e => {
      if (e.keyCode === 13) {
        onSearch();
      }
    }
 

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Results to show</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  const onRadioChange = useCallback(
    event => {
      setSearchOption(event.target.value);
    }, []
  )

  // console.log(searchOption);


  useWhyDidYouUpdate('Home', {
    onInputChange, onKeyDown
  })

  return (
    <div>
      <MainPageLayout>
        <SearchInput
          type="text"
          placeholder="Search for any movie or actor"
          onKeyDown={onKeyDown}
          onChange={onInputChange}
          value={input}
        />
        <RadioInputsWrapper>
          <div>
            <CustomRadio
              label = 'Shows'
              id="shows-search"
              value="shows"
              onChange={onRadioChange}
              checked={isShowsSearch}
            
            />
            
          </div>
          <div>
            <CustomRadio
                label = 'Actors'
                id="actors-search"
                value="people"
                onChange={onRadioChange}
                checked={!isShowsSearch}
              
              />
          </div>
        </RadioInputsWrapper>
        <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
        </SearchButtonWrapper>
        {renderResults()}
      </MainPageLayout>
    </div>
  );
};
