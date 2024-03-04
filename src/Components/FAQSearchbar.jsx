
import './FAQSearchbar.css';
import { useState } from 'react';

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';


function FAQSearchBar(props) {
  const {filteredFAQ, allFaq, setFilteredFAQ, valueEntered,setValueEntered} = props;
const [noResultFound,setNoResultFound] = useState(false)


  function searchByName(nameImput) {
    if (nameImput === "") {
      setValueEntered("")
      setFilteredFAQ(allFaq);
      
    }

    let resultFiltered = allFaq.filter((eachFaq) => {
      return eachFaq.question.toLowerCase().includes(nameImput);
    });
    if (resultFiltered.length === 0) {
      setNoResultFound(true)
    }
setValueEntered(nameImput)
    setFilteredFAQ(resultFiltered);
    console.log(resultFiltered)
  }

  return (
    <div id="searchbar-container">
        <form>
        
          <div id="search-bar" >
          <SearchIcon id="search-bar-icon"></SearchIcon>
            <input
            value={valueEntered}
              id="search-bar-text"
              placeholder="Write your question"
              type="text"
              name="search"
              onChange={(e) => {
                searchByName(e.target.value);
              }}
            />
           {filteredFAQ.length <16  &&<CloseIcon onClick={()=>{ searchByName("")}}></CloseIcon>}
          </div>
        </form>
     
      </div>
  );
}

export default FAQSearchBar;
