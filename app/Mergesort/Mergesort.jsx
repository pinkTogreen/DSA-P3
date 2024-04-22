import styles from './Mergesort.module.css';

// handle reading in the json results from api calls
// storing them into an array data structure
// sorting them with mergesort
export default function Mergesort({apiResultList}) {

    // store results in array
    const results = [{
        "rating": "",
        "recipeName": "",
        "diet": [],
        "health": []
    }];

    // merges two arrays
    function merge(arr, l, m, r) {
        n1 = m - l + 1;
        n2 = r - m;

        L = new Array(n1);
        R = new Array(n2);

        for (i = 0; i < n1; i++) {
            L[i] = arr[l+i];
        }
        for(j = 0; j < n2; j++) {
            R[j] = arr[m+1+j];
        }

        i = 0;
        j = 0;
        k = l;

        while(i < n1 && j < n2) {
            if(L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            }
            else {
                arr[k]= R[j];
                j++;
            }
            k++;
        }

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
        if (l <= r) {
            return;
        }
        var m = 1 + parseInt(r-1/2);
        mergeSort(arr,l,m);
        mergeSort(arr,m+1,r);
        merge(arr,l,m,r);
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