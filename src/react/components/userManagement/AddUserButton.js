import React from 'react'
import Card from 'react-bootstrap/Card'

export default function AddUserButton(props) {
  return (
    <Card id={"OpenCreateUserDialogButton"} style={{ backgroundColor: "lightgray", cursor: "pointer", width: '18rem', minWidth: 150 }} onClick={() => props && props.onClick()}>
        <Card.Body  style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card.Title>Add new User</Card.Title>
        </Card.Body>
    </Card>
  )
}
