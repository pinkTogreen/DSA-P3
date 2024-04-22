import styles from './Mergesort.module.css';

// handle reading in the json results from api calls
// storing them into an array data structure
// sorting them with mergesort
export default function Mergesort(resultList) {
    if (resultList.length == 0) {
        return;
    }

    let mergeSortedArr = resultList.map(arr => [...arr]);
    console.log("Merge Sorted Array: ", mergeSortedArr);
    
    // merge two arrays
    function merge(arr, l, m, r) {
        var n1 = parseInt(m) - l +1;
        var n2 = r-m;

        var L = new Array(n1);
        var R = new Array(n2);


        for (i = 0; i < n1; i++) {
            L[i] = arr[l+i];
        }
        for(j = 0; j < n2; j++) {
            R[j] = arr[m+1+j];
        }

        var i = 0;
        var j = 0;
        var k = l;

        // while lists not empty, add next highest element
        while(i < n1 && j < n2) {
            if(L[i][1] >= R[j][1]) {
                arr[k] = L[i];
                i++;
            }
            else {
                arr[k]= R[j];
                j++;
            }
            k++;
        }

        // add the rest of the elements
        while(i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }
        while(j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    function mergeSort(arr, l, r) {
        // base case, if left is greater than right
        if (l >= r) {
            return;
        }

        var m = l + parseInt((r-l)/2);
        
        mergeSort(arr,l,m);
        mergeSort(arr,m+1,r);
        merge(arr,l,m,r);
    }

    // return the results displayed in the sorted order
    mergeSort(mergeSortedArr, 0, mergeSortedArr.length-1);
    console.log("MERGE SORT");
    console.log("Merge Sorted Array: ", mergeSortedArr);
    return mergeSortedArr;    // merges two arrays
}