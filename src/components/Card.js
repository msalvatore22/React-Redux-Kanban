import React from 'react';

export default (
  {
    card, 
    canMoveLeft, 
    canMoveRight, 
    onMoveLeft, 
    onMoveRight, 
    onDelete
  }) => (
  <div className="card-container">
    <div className="card">
      {canMoveLeft && <button onClick={onMoveLeft}>{'<'}</button>}
        <span>{card.name}</span>
      {canMoveRight && <button onClick={onMoveRight}>{'>'}</button>}
    </div>
    <div>
      <button onClick={onDelete}>delete</button>
    </div>
  </div>
)
