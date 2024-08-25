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

// Example usage
const originalArray = [-10,-20,2,9,19]
const enumeratedArray = enumerateArray(originalArray);
const sortedPairs = mergeSort(enumeratedArray);
const sortedArray = extractSortedElements(sortedPairs);

f

console.log('Original Array:', originalArray);
console.log('Sorted Array:', sortedPairs);



