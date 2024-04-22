import styles from './Heapsort.module.css';

// takes in the array of [recipe objects, rank]
// sort them inplace with heapsort
export default function Heapsort(resultList) {
    console.log("Before Recipe Sorting", resultList);
    let i = 0;
    let j = 0;

    // heapify down function
    // takes in the root index of the heap and heapifies it down
    const heapifyDown = (root) => {
        index = root;
        // while the index is not a leaf
        while (true) {
            // check if left child exists and is greater, if so, swap
            if (2(index) + 1 < results.length && results[2(index) + 1][1] > results[index][1]) {
                // swap
                temp = results[index];
                results[index] = results[2(index) + 1];
                results[2(index) + 1] = temp;
                // update index
                index = 2(index) + 1;
            }
            // check if right childexists and is greater, if so, swap
            else if (2(index) + 2 < results.length && results[2(index) + 2][1] > results[index][1]) {
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
    const heapify = () => {
        // call heapify down on all internal nodes in reverse level order
        for (let j = (results.length / 2) - 1; j >= 0; j--) {
            heapifyDown(j,n);
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
        let n = results.length;   // how many recipes in results
        heapify();
        // extract max on all elements, update n during process
        for (let i = 0; i < results.length(); i++) {
            extractMax(n);
            n = n - 1;    //decrement n
        }
    }

    var results = resultList;
    heapsort();
    // return the results displayed in the sorted order
    return results;
}