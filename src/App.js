import React, {useEffect, useState} from "react"
import './App.css';
import {Container, Row, Col, Button} from "react-bootstrap"
import {importAll} from "./utils"
import {Card} from "./components"


const deck = importAll(require.context('./assets/deckOfCards', false, /\.(png|jpe?g|svg)$/));
const deckObjects = Object.values(deck)


function App() {

  const [deckOfCards, updateDeckOfCards] = useState(deckObjects)
  const [pickedDeck, updatePickedDeck] = useState([])

  const resetDeck = () => {
    updateDeckOfCards(deckObjects)
    updatePickedDeck([])
  }

  const pickFiveRandomCards = () => {
    if(deckOfCards.length >= 5){
      let items = [...deckOfCards];
      let pluckedList = [...pickedDeck];
      for(let i = 0; i< 5; i++){
        let randomIndex = Math.floor(Math.random()*items.length);
        pluckedList.push(items[randomIndex])
        // remove item at index from a list.
        items.splice(randomIndex, 1)
      }
      updateDeckOfCards(items)
      updatePickedDeck(pluckedList)
    }else{
      alert(`There are only ${deckOfCards.length} items left on the list, please reset`)
    }
  }
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={5} className="text-center mt-4">
          <h2>Deck of Cards</h2>
          <p>Pick some random cards</p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={5} className="text-center">
          <Row>
            <Col col={6}>
              <Button size="sm" className="mr-2" onClick={pickFiveRandomCards}>
                Pick 5 random cards
              </Button>
            </Col>
            <Col col={6}>
              <Button size="sm" variant="secondary" onClick={resetDeck}>
                Reset the deck
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={6}>
          <h3>Original Deck</h3>
          <Row>
            {
              deckOfCards.map((card, index) => {
                return <Card cardImage={card}/>
              })
            }
          </Row>
        </Col>
        <Col md={6}>
          <h3>Picked Cards</h3>
          <Row>
            <>
              {
                pickedDeck.length > 0? 
                <>
                    {
                      pickedDeck.map((card, index) => {
                        return <Card cardImage={card}/>
                      })
                    }
                </>:
                <Col className="text-center">
                  <h4>No cards picked </h4>
                </Col>
              }
            </>

          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default App;
