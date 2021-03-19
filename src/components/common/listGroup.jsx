import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, selectedItem, onItemSelect }) => {
    return (
        <React.Fragment>
            <h5 style={{ marginBottom: '1rem' }}>Category</h5>
            <ul className="list-group">
                {items.map(item => (
                    <li
                        key={item[valueProperty]}
                        onClick={() => onItemSelect(item)}
                        style={{ padding: '0.40rem 0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}
                        className={item === selectedItem ? "list-group-item active" : "list-group-item"}>
                        {item[textProperty]}
                    </li>
                ))}
            </ul>
        </React.Fragment>
    )
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup;