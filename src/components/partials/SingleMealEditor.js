import React from 'react';


const SingleMealEditor = (props) =>
    (
        <div>
            {props.meal.map((product, key)=>(
                <div>{key} : {product.productName}</div>
            ))}
        </div>
    );

export default SingleMealEditor;