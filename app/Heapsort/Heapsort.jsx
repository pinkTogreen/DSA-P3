import styles from './Heapsort.module.css';

// takes in the array of [recipe objects, rank]
// sort them inplace with heapsort
export default function Heapsort(resultList) {
    if (resultList.length == 0) {
        console.log("result list is invalid");
        return;
    }

    let sortedArr = resultList;
    let n = sortedArr.length;
    console.log("Before Recipe Sorting", sortedArr);
    console.log("number of elements in resultList: ", sortedArr.length);


    // first heapify the array:
    // takes in an array and turns it into a max heap
    // by calling heapify down on all internal nodes (floor(n/2) to n-1) in reverse level order
    for (let j = (sortedArr.length / 2) - 1; j >= 0; j--) {
        heapifyDown(sortedArr, j, sortedArr.length);
    }

    // then extract max on all elements, update n during process
    for (let i = 0; i < sortedArr.length; i++) {
        n = sortedArr.length;
        // swap top and last
        let temp = sortedArr[0];
        sortedArr[0] = sortedArr[n-1];
        sortedArr[n-1] = temp;
        // heapify the new top down (with n-1 elements now)
        heapifyDown(sortedArr, 0, n-1);
        n--;    //decrement n
    }

    // return the results displayed in the sorted order
    return sortedArr;
}

// heapify down function
// takes in the root index of the heap and heapifies it down
function heapifyDown(results, index, numElements) {
    // while the index is not a leaf
    while (true) {
        console.log("index: ", index);
        console.log("rating for element: ", results[index][1]);
        // check if left child and right child exists, if so compare them and swap with the largest
        if ((2*index) + 1 < numElements && (2*index) + 2 < numElements) {
            // compare the children to find largest child
            // if left child is larger than right
            if (results[(2*index) + 1][1] >= results[(2*index) + 2][1]) {
                // if left larger than right, compare left with index, if left larger, swap
                if (results[(2 * index) + 1][1] > results[index][1]) {
                    // swap
                    console.log("swap with left");
                    let temp = results[index];
                    results[index] = results[(2 * index) + 1];
                    results[(2 * index) + 1] = temp;
                    // update index
                    index = (2 * index) + 1;
                }
            }
            // if right child is larger than left
            if (results[(2*index) + 1][1] < results[(2*index) + 2][1]) {
                // compare right with index, if right larger, swap
                if (results[(2 * index) + 2][1] > results[index][1]) {
                    // swap
                    console.log("swap with left");
                    let temp = results[index];
                    results[index] = results[(2 * index) + 2];
                    results[(2 * index) + 2] = temp;
                    // update index
                    index = (2 * index) + 2;
                }
            }
        }
        // otherwise there exists no children or only 1 child
        // swap with left or right or none
        else if ((2 * index) + 1 < numElements && results[(2 * index) + 1][1] > results[index][1]) {
            // swap
            console.log("swap with left");
            let temp = results[index];
            results[index] = results[(2 * index) + 1];
            results[(2 * index) + 1] = temp;
            // update index
            index = (2 * index) + 1;
        }
        else if ((2 * index) + 2 < numElements && results[(2 * index) + 2][1] > results[index][1]) {
            // swap
            console.log("swap with right");
            let temp = results[index];
            results[index] = results[(2 * index) + 2];
            results[(2 * index) + 2] = temp;
            // update index
            index = (2 * index) + 2;
        }
        // if children do not exist or neither are greater, heapify down complete
        else {
            console.log("break");
            break;
        }
    }
}