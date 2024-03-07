
import './FAQSearchbar.css';

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';


function FAQSearchBar(props) {
  const {filteredFAQ, allFaq, setFilteredFAQ, valueEntered,setValueEntered} = props;
 


  function searchByName(nameImput) {
    if (nameImput === "") {
      setValueEntered("")
      setFilteredFAQ(allFaq);
      
    }

    let resultFiltered = allFaq.filter((eachFaq) => {
      return eachFaq.question.toLowerCase().includes(nameImput);
    });
  
setValueEntered(nameImput)
    setFilteredFAQ(resultFiltered);
    console.log(resultFiltered)
  }

  return (
    <div id="FAQ-searchbar-container">
        <form>
        
          <div id="FAQ-search-bar" >
          <SearchIcon id="FAQ-search-bar-icon"></SearchIcon>
            <input
            value={valueEntered}
              id="FAQ-search-bar-text"
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
