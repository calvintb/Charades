import { Text, View } from "react-native-web"
import React, { useState } from 'react';
import "../App.css"


export const Card = props => {
    return (
        <div className="card-container">
            <h1>{props.name}</h1>
            <h2>{props.category}</h2>
            <p>{props.description}</p>
        </div>
    );
};

// const styles = StyleSheet.create({
//     justifyContent: 


// });