import styles from './Heapsort.module.css';

// takes in the array of [recipe objects, rank]
// sort them inplace with heapsort
export default function Heapsort(resultList) {
    if (resultList.length == 0) {
        console.log("result list is invalid");
        return;
    }
    // first make a deep copy of the resultList
    let sortedArr = resultList.map(arr => [...arr]);

    // declare the size of the resultList into variable and a changable size variable
    let size = resultList.length;
    let n = resultList.length;

    // heapify the array into a min heap
    // by calling heapify down on all internal nodes (floor(n/2) to n-1) in reverse level order
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        heapifyDown(sortedArr, i, size);
    }

    // then extract min on all elements, update n during process
    // so the list will be sorted in descending order with largest rating on top
    while (n > 0) {

        // swap top and last
        const temp = sortedArr[0];
        sortedArr[0] = sortedArr[n-1];
        sortedArr[n-1] = temp;

        // decrement the size variable n
        n--;

        // heapify the new top down (with n-1 elements now)
        heapifyDown(sortedArr, 0, n);
    }

    // return the results displayed in the sorted order
    console.log("Heapsort complete");
    console.log(sortedArr);
    return sortedArr;
}

// heapify down function
// takes in the root index of the heap and heapifies it down
function heapifyDown(results, index, numElements) {
    while (true) {
        // check if left child and right child exists, if so compare them and swap with the largest
        if ((2 * index) + 1 < numElements && (2 * index) + 2 < numElements) {
            // compare the children to find largest child
            // if left child is smaller than or equal to right
            if (results[(2 * index) + 1][1] <= results[(2 * index) + 2][1]) {
                // if left smaller than right, compare left with index, if left smaller, swap
                if (results[(2 * index) + 1][1] < results[index][1]) {
                    // swap
                    let temp = results[index];
                    results[index] = results[(2 * index) + 1];
                    results[(2 * index) + 1] = temp;
                    // update index
                    index = (2 * index) + 1;
                    continue;
                }
            }
            // if right child is smaller than left
            if (results[(2 * index) + 1][1] > results[(2 * index) + 2][1]) {
                // compare right with index, if right smaller, swap
                if (results[(2 * index) + 2][1] < results[index][1]) {
                    // swap
                    let temp = results[index];
                    results[index] = results[(2 * index) + 2];
                    results[(2 * index) + 2] = temp;
                    // update index
                    index = (2 * index) + 2;
                    continue;
                }
            }
        }
        // otherwise there exists no children or only 1 child
        // swap with left or right or none
        if ((2 * index) + 1 < numElements && results[(2 * index) + 1][1] < results[index][1]) {
            // swap
            let temp = results[index];
            results[index] = results[(2 * index) + 1];
            results[(2 * index) + 1] = temp;
            // update index
            index = (2 * index) + 1;
            continue;
        }
        if ((2 * index) + 2 < numElements && results[(2 * index) + 2][1] < results[index][1]) {
            // swap
            let temp = results[index];
            results[index] = results[(2 * index) + 2];
            results[(2 * index) + 2] = temp;
            // update index
            index = (2 * index) + 2;
            continue;
        }
        // if children do not exist or neither are greater, heapify down complete
        break;
    }
}