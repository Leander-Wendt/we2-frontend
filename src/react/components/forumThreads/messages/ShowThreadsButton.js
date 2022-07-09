import React from 'react'
import Card from 'react-bootstrap/Card'

export default function ShowThreadsButton(props) {
  return (
    <Card id="OpenCreateForumMessageDialogButton" style={{ backgroundColor: "lightgray", cursor: "pointer", width: '18rem', minWidth: 150 }} onClick={() => props && props.onClick()}>
        <Card.Body  style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card.Title>Zurück</Card.Title>
        </Card.Body>
    </Card>
  )
}
