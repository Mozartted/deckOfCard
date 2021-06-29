import React from "react"
import {Card, Col} from "react-bootstrap"
import PropTypes from "prop-types"

const DeckCard = ({cardImage}) => {
    return (
        <Col md={3} sm={12} className="mt-3 px-2">
            <Card className="border-0">
                <Card.Body>
                    <img src={cardImage.default} style={style.cardStyle}/>
                </Card.Body>
            </Card>
        </Col>
    )
}

DeckCard.propTypes = {
    cardImage: PropTypes.object.isRequired
}

const style = {
   cardStyle: {
        width: "100%"
   }
}

export default DeckCard