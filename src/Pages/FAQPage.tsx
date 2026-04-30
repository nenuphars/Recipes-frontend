import { Button, Container, IconButton, Typography } from '@mui/material';
import FAQSearchBar from '../Components/FAQSearchBar';
import { useState, type Dispatch, type SetStateAction } from 'react';
import './FAQPage.css';
import type { FAQpair } from '../types/faq.types';

const faq: FAQpair[] = [
  //cuestions and answers
  {
    question: `What is Karela Created for?`,
    answer: `Karela is created for showing you many recipes, all of then
        easy to cook and with different tastes for different people.`,
  },
  {
    question: `How do I search for specific recipes on your website?`,
    answer: `You can go to All recipes and from there search by name or ingredient.
        So easy is it!.`,
  },

  {
    question: 'Can I submit my own recipes to be featured on your site?',
    answer:
      'We love to recieve your own recipes! At the moment , we only accept nwew recipes from registered users. But if you have an account this will not be a problem.',
  },
  {
    question: 'Do you provide nutritional information for your recipes?',
    answer: `Currently, we do not provide nutritional information. However, 
    we do display the ingredients and quantities in our recipes, allowing interested individuals to calculate it themselves.`,
  },
  {
    question: 'Are there vegetarian or vegan recipes available?',
    answer:
      'Yes, we have both of them. You can see the tags that we add in all our recipes. There you will find both vegeratian and vegan.',
  },
  {
    question: 'Can I adjust the serving sizes in your recipes?',
    answer:
      ' Sure. You could double it, just the half, or adapt it to your own necesity.',
  },
  {
    question: 'How do I save my favorite recipes for future reference?',
    answer:
      'You could add the recipes to favourites in your browser. We are working in adding this functionality fot a next future.',
  },
  {
    question: 'Are there video tutorials for any of the recipes?',
    answer:
      'Not yet. We are working in adding this functionality fot a next future.',
  },
  {
    question: 'Can I print a recipe for offline use?',
    answer: 'Sure! you could do this doing a screenshot on your computer.',
  },
  {
    question: 'Are there recipes suitable for specific dietary restrictions?',
    answer: `We have vegetarian options, vegan, and other types of recipes for specifcic groups. 
    Just go over the tags of each recipe in order to rech them.`,
  },
  {
    question: 'Are ingredients listed by weight or volume in your recipes?',
    answer: 'Yes, all of them are listed by weight or volume in your recipes.',
  },
  {
    question: 'Are there seasonal or holiday-specific recipe collections?',
    answer: 'Not yet.',
  },
];

function FAQPage() {
  const [showAnswer, setShowAnswer] = useState<number>(); //for opening the question
  const [plusOrLess, setPlusOrLess] = useState<number>(); //for opening the + and -
  const [filteredFAQ, setFilteredFAQ] = useState<FAQpair[]>(faq);
  const [allFAQ, setAllFAQ] = useState<FAQpair[]>(faq);
  const [valueEntered, setValueEntered] = useState('');

  function ShowResponseFunction(index: number) {
    if (showAnswer !== index) {
      // if the one we click is not equal to the index ,makes it hidden and -
      setShowAnswer(index);
      setPlusOrLess(index);
    } else {
      // else makes the if in the return false, so classmame stays like response hidden and not response
      setShowAnswer(undefined);
      setPlusOrLess(undefined);
    }
  }

  return (
    <Container id="general-container-faq">
      <Typography variant="h3" id="title-faq">
        Frequently Asked Questions
      </Typography>
      <FAQSearchBar
        filteredFAQ={filteredFAQ}
        allFAQ={allFAQ}
        setFilteredFAQ={setFilteredFAQ}
        valueEntered={valueEntered}
        setValueEntered={setValueEntered}
      ></FAQSearchBar>
      {filteredFAQ.length === 0 && (
        <Typography variant="h4" id="no-result">
          No result matches your search{' '}
          <Button
            id="no-result-button"
            onClick={() => {
              setFilteredFAQ(allFAQ);
              setValueEntered('');
            }}
          >
            See all questions
          </Button>
        </Typography>
      )}
      <Container
        id={
          filteredFAQ.length > 0
            ? 'questions-container'
            : 'questions-container-hidden'
        }
      >
        {filteredFAQ.length > 0 &&
          filteredFAQ.map((eachFaq, i) => (
            <Container className="eachQuestion" key={i}>
              {/* Onclick h2 gives both useStates the actual i value. then conditions will run as false and will be - and classname=hidden */}
              <Typography
                variant="h4"
                onClick={() => ShowResponseFunction(i)}
                className="question"
              >
                {eachFaq.question}{' '}
                {plusOrLess !== i ? (
                  <IconButton id="expandSymbol">+</IconButton>
                ) : (
                  <IconButton id="expandSymbol">-</IconButton>
                )}{' '}
              </Typography>

              <Container>
                <Typography
                  variant="body1"
                  className={`response ${
                    showAnswer !== i && 'response-hidden'
                  }`}
                >
                  {eachFaq.answer}
                </Typography>
              </Container>
            </Container>
          ))}
      </Container>
    </Container>
  );
}

export default FAQPage;
