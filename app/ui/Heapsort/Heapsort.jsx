import styles from './Heapsort.module.css';
import jsonResponse from 'main/page.jsx';
import { useState, useEffect } from 'react';

// handle reading in the json results from api calls
// storing them into an array data structure
// sorting them with heapsort
export default function Heapsort({apiResultList}) {

    // store results in array
    const results = [{
        "rating": "",
        "recipeName": "",
        "diet": [],
        "health": []
    }];

    // heapify down function
    // takes in the root index of the heap and heapifies it down
    const heapifyDown = (root, n) => {
        index = root;
        // while the index is not a leaf
        while (index) {
            // check if left child exists and is greater, if so, swap
            if (2(index) + 1 < n && results[2(index) + 1].rating > results[index]) {
                // swap
                temp = results[index];
                results[index] = results[2(index) + 1];
                results[2(index) + 1] = temp;
                // update index
                index = 2(index) + 1;
            }
            // check if right childexists and is greater, if so, swap
            else if (2(index) + 2 < n && results[2(index) + 2].rating > results[index]) {
                // swap
                temp = results[index];
                results[index] = results[2(index) + 2];
                results[2(index) + 2] = temp;
                // update index
                index = 2(index) + 2;
            }
            // if children do not exist or neither are greater, heapify down complete
            else {
                break;
            }
        }
    }

    // heapify function
    // takes in an array and turns it into a max heap
    // by calling heapify down on all internal nodes (floor(n/2) to n-1) in reverse level order
    const heapify = (n) => {
        // call heapify down on all internal nodes in reverse level order
        for (i = floor(n/2) - 1; i >=0; i--) {
            heapifyDown(i,n);
        }
    }

    // extract max function
    // pops the max (root) of the heap
    // by swaping it with the last element, decreasing size of heap, and then heapifing down
    const extractMax = (n) => {
        // swap top and last
        temp = results[0];
        results[0] = results[n-1];
        results[n-1] = temp;
        // heapify the new top down (with n-1 elements now)
        heapifyDown(0, n-1);
    }

    // heapsort function
    // first heapify the array
    // then extract max on all elements
    // the array is then sorted in place
    const heapsort = () => {
        n = results.length();   // how many recipes in results
        heapify(n);
        // extract max on all elements, update n during process
        for (i = 0; i < results.length(); i++) {
            extractMax(n);
            n--;    //decrement n
        }
        
    }

    // set rating function
    // determine the rating for each recipe
    // this is the criteria for which the recipes will be sorted
    const setRating = (root, n) => {
        // TODO
        // calculate rating based on how many profiles' criteria it's compatible with
    }

    // handle reading apiResultList into results
    for (const recipe of Object.values(apiResultList)) {
        results.rating.push(setRating);
        results.recipeName.push(recipe["name"]);
        results.diet.push(recipe["diet"]);
        results.health.push(recipe["health"]);
    }

    // read the sorted results into a display list
    const resultsDisplayList = results.set(item =
        <h3>{recipe.recipeName}</h3>
    );

    // return the results displayed in the sorted order
    return (
        <div className={styles.resultList}>
            <div onClick={props.close}>x</div>
            <h2>Results</h2>

            <ul>{resultsDisplayList}</ul>
        </div>
    )
}