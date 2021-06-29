import React, {useEffect, useState} from "react"
import './App.css';
import {Container, Row, Col, Button} from "react-bootstrap"
import {importAll} from "./utils"
import {Card} from "./components"
import {PenTool} from "react-feather"

const logo = require("./assets/logo.png").default
const deck = importAll(require.context('./assets/deckOfCards', false, /\.(png|jpe?g|svg)$/))
const deckObjects = Object.values(deck)


function App() {

  const [deckOfCards, updateDeckOfCards] = useState(deckObjects)
  const [pickedDeck, updatePickedDeck] = useState([])

  useEffect(() => {
    resetDeck()
  }, [])

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
          <h2>Deck of Cards</h2> <img src={logo} width="30"/>
          <p className="">Pick random cards</p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={4} className="text-center">
          <Row>
              <Button block className="mb-2 mx-2" onClick={pickFiveRandomCards}>
                Pick 5 random cards <PenTool/>
              </Button>
              <Button block variant="outline-primary" className="mx-2" onClick={resetDeck}>
                Reset the deck
              </Button>
            {/* <Col md={6}>
             
            </Col> */}
          </Row>
        </Col>
      </Row>
      <hr/>
      <Row className="mt-5">
        <Col md={6} sm={12}>
          <h4>Original Deck</h4>
          <hr/>
          <Row>
            {
              deckOfCards.map((card, index) => {
                return <Card cardImage={card}/>
              })
            }
          </Row>
        </Col>
        <Col md={6} sm={12}>
          <h4>Randomly Picked Cards</h4>
          <hr/>
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
                  <p>No cards picked </p>
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
