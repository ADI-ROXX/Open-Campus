// Function to merge two sorted arrays
function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Merge the two arrays while there are elements in both
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex][0] < right[rightIndex][0]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Concatenate any remaining elements
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Recursive Merge Sort function
function mergeSort(pairs) {
    if (pairs.length < 2) {
        return pairs; // Base case: single element arrays are already sorted
    }

    const mid = Math.floor(pairs.length / 2); // Find the middle point
    const left = pairs.slice(0, mid); // Split the array into left half
    const right = pairs.slice(mid); // Split the array into right half

    // Recursively sort each half and merge the results
    return merge(mergeSort(left), mergeSort(right));
}

// Function to enumerate an array into pairs (index, value)
function enumerateArray(arr) {
    return arr.map((value, index) => [value, index]);
}

// Function to extract sorted elements from the sorted pairs
function extractSortedElements(pairs) {
    return pairs.map(pair => pair[0]);
}

// Function to perform binary search for the first positive pair
function findFirstPositivePairBinarySearch(pairs) {
    let left = 0;
    let right = pairs.length - 1;
    let result = null;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (pairs[mid][0] > 0) {
            result = mid;
            right = mid - 1; // Move left to find the first positive pair
        } else {
            left = mid + 1; // Move right to find a positive pair
        }
    }

    return result; // Return the first positive pair found, or null if not found
}



// Example usage
const originalArray = [-10,-20,2,9,19]
const enumeratedArray = enumerateArray(originalArray);
const sortedPairs = mergeSort(enumeratedArray);
const sortedArray = extractSortedElements(sortedPairs);


console.log('Original Array:', originalArray);
console.log('Sorted Array:', findFirstPositivePairBinarySearch(sortedPairs));



