import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

function FAQSearchBar(props) {
  const { filteredFAQ, allFaq, setFilteredFAQ, valueEntered, setValueEntered } =
    props;

  function searchByName(nameImput) {
    if (nameImput === '') {
      setValueEntered('');
      setFilteredFAQ(allFaq);
    }

    let resultFiltered = allFaq.filter((eachFaq) => {
      return eachFaq.question.toLowerCase().includes(nameImput);
    });

    setValueEntered(nameImput);
    setFilteredFAQ(resultFiltered);
    console.log(resultFiltered);
  }

  return (
    <div
      id="FAQ-searchbar-container"
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '2%',
        marginLeft: '8%',
      }}
    >
      <form>
        <div
          id="FAQ-search-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            border: '1px solid black',
            borderRadius: '5px',
            overflow: 'hidden',
            width: '210%',
            padding: '5px',
          }}
        >
          <SearchIcon id="FAQ-search-bar-icon"></SearchIcon>
          <input
            value={valueEntered}
            id="FAQ-search-bar-text"
            style={{
              backgroundColor: '#fff',
              width: '96%',
              border: 'none',
              fontSize: '18px',
              outline: 'none',
            }}
            placeholder="Write your question"
            type="text"
            name="search"
            onChange={(e) => {
              searchByName(e.target.value);
            }}
          />
          {filteredFAQ.length < 16 && (
            <CloseIcon
              onClick={() => {
                searchByName('');
              }}
            ></CloseIcon>
          )}
        </div>
      </form>
    </div>
  );
}

export default FAQSearchBar;
