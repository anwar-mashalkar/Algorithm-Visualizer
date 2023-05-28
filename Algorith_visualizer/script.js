const container = document.querySelector('.array-container');
const arraySize = 10; // Change this to adjust the number of elements
let array = [];

// Create random array elements
for (let i = 0; i < arraySize; i++) {
  const value = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
  array.push(value);
  const element = document.createElement('div');
  element.classList.add('array-element');
  element.style.height = `${value * 3}px`;
  element.innerText = value;
  container.appendChild(element);
}


async function bubbleSort() {
  const elements = document.querySelectorAll('.array-element');
  const n = elements.length;
  let comparisons = 0; // Variable to count comparisons

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight elements being compared
      elements[j].style.backgroundColor = 'red';
      elements[j + 1].style.backgroundColor = 'red';
      await sleep(500); // Add a delay to visualize the comparison

      const value1 = parseInt(elements[j].innerText);
      const value2 = parseInt(elements[j + 1].innerText);
      comparisons++;

      if (value1 > value2) {
        // Swap elements if they are in the wrong order
        elements[j].innerText = value2;
        elements[j + 1].innerText = value1;
        elements[j].style.height = `${value2 * 3}px`;
        elements[j + 1].style.height = `${value1 * 3}px`;
        await sleep(500); // Add a delay to visualize the swap
      }

      // Remove highlight from elements
      elements[j].style.backgroundColor = 'dodgerblue';
      elements[j + 1].style.backgroundColor = 'dodgerblue';
    }

    // Mark the sorted element
    elements[n - i - 1].style.backgroundColor = 'green';
  }

  // Mark the first element as sorted
  elements[0].style.backgroundColor = 'green';
    const timeComplexityElement = document.getElementById('timeComplexity');
  timeComplexityElement.innerText = `Bubble Sort - Time Complexity: O(n^2), Comparisons: ${comparisons}`;   
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function selectionSort() {
  const elements = document.querySelectorAll('.array-element');
  const n = elements.length;
  let comparisons = 0; // Variable to count comparisons

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Highlight the current minimum element
    elements[minIndex].style.backgroundColor = 'red';
    await sleep(500);

    for (let j = i + 1; j < n; j++) {
      // Highlight elements being compared
      elements[j].style.backgroundColor = 'red';
      await sleep(500);

      if (parseInt(elements[j].innerText) < parseInt(elements[minIndex].innerText)) {
        // Update the minimum index if a smaller element is found
        elements[minIndex].style.backgroundColor = 'dodgerblue';
        minIndex = j;
        elements[minIndex].style.backgroundColor = 'red';
      }
      comparisons++;
      // Remove highlight from non-minimum elements
      elements[j].style.backgroundColor = 'dodgerblue';
    }

    // Swap the minimum element with the first unsorted element
    [elements[i].innerText, elements[minIndex].innerText] = [elements[minIndex].innerText, elements[i].innerText];
    elements[i].style.height = `${parseInt(elements[i].innerText) * 3}px`;
    elements[minIndex].style.height = `${parseInt(elements[minIndex].innerText) * 3}px`;
    await sleep(500);

    // Mark the sorted element
    elements[i].style.backgroundColor = 'green';
  }

  // Mark the last element as sorted
  elements[n - 1].style.backgroundColor = 'green';

  const timeComplexityElement = document.getElementById('timeComplexity');
  timeComplexityElement.innerText = `Selection Sort - Time Complexity: O(n^2), Comparisons: ${comparisons}`;
}

// ... Rest of the code remains the same
async function mergeSort(start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);

    await mergeSort(start, mid); // Sort left half
    await mergeSort(mid + 1, end); // Sort right half
    await merge(start, mid, end); // Merge sorted halves
  }
}

async function merge(start, mid, end) {
  const elements = document.querySelectorAll('.array-element');
  const n1 = mid - start + 1;
  const n2 = end - mid;

  const leftArray = new Array(n1);
  const rightArray = new Array(n2);

  // Copy data to temporary arrays
  for (let i = 0; i < n1; i++) {
    leftArray[i] = parseInt(elements[start + i].innerText);
    elements[start + i].style.backgroundColor = 'red';
    await sleep(500);
    accesses++;
  }
  for (let j = 0; j < n2; j++) {
    rightArray[j] = parseInt(elements[mid + 1 + j].innerText);
    elements[mid + 1 + j].style.backgroundColor = 'red';
    await sleep(500);
    accesses++;
  }

  let i = 0; // Initial index of left subarray
  let j = 0; // Initial index of right subarray
  let k = start; // Initial index of merged subarray

  // Merge the two arrays
  while (i < n1 && j < n2) {
    comparisons++;
    if (leftArray[i] <= rightArray[j]) {
      elements[k].innerText = leftArray[i];
      elements[k].style.height = `${leftArray[i] * 3}px`;
      i++;
    } else {
      elements[k].innerText = rightArray[j];
      elements[k].style.height = `${rightArray[j] * 3}px`;
      j++;
    }
    await sleep(500);
    k++;
    accesses++;
  }

  // Copy the remaining elements of leftArray, if any
  while (i < n1) {
    elements[k].innerText = leftArray[i];
    elements[k].style.height = `${leftArray[i] * 3}px`;
    await sleep(500);
    i++;
    k++;
    accesses++;
  }

  // Copy the remaining elements of rightArray, if any
  while (j < n2) {
    elements[k].innerText = rightArray[j];
    elements[k].style.height = `${rightArray[j] * 3}px`;
    await sleep(500);
    j++;
    k++;
    accesses++;
  }

  // Remove highlight from merged elements
  for (let x = start; x <= end; x++) {
    elements[x].style.backgroundColor = 'dodgerblue';
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startMergeSort() {
  comparisons = 0;
  accesses = 0;
  await mergeSort(0, arraySize - 1);
  // Display time complexity information
  const timeComplexityElement = document.getElementById('timeComplexity');
  timeComplexityElement.innerHTML = `Comparisons: ${comparisons}, Array Accesses: ${accesses}`;
}


async function heapSort() {
  const elements = document.querySelectorAll('.array-element');
  const n = elements.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(elements, n, i);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Swap the root (max element) with the last element
    [elements[0].innerText, elements[i].innerText] = [elements[i].innerText, elements[0].innerText];
    elements[0].style.height = `${parseInt(elements[0].innerText) * 3}px`;
    elements[i].style.height = `${parseInt(elements[i].innerText) * 3}px`;
    await sleep(500);

    // Heapify the reduced heap
    await heapify(elements, i, 0);
  }

  // Mark the entire array as sorted
  elements.forEach(element => {
    element.style.backgroundColor = 'green';
  });
}

async function heapify(elements, n, rootIndex) {
  let largest = rootIndex;
  const leftIndex = 2 * rootIndex + 1;
  const rightIndex = 2 * rootIndex + 2;

  if (leftIndex < n) {
    comparisons++;
    if (parseInt(elements[leftIndex].innerText) > parseInt(elements[largest].innerText)) {
      largest = leftIndex;
    }
  }

  if (rightIndex < n) {
    comparisons++;
    if (parseInt(elements[rightIndex].innerText) > parseInt(elements[largest].innerText)) {
      largest = rightIndex;
    }
  }

  if (largest !== rootIndex) {
    // Swap elements
    [elements[rootIndex].innerText, elements[largest].innerText] = [elements[largest].innerText, elements[rootIndex].innerText];
    elements[rootIndex].style.height = `${parseInt(elements[rootIndex].innerText) * 3}px`;
    elements[largest].style.height = `${parseInt(elements[largest].innerText) * 3}px`;
    await sleep(500);

    // Recursively heapify the affected subtree
    await heapify(elements, n, largest);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startHeapSort() {
  comparisons = 0;
  accesses = 0;
  await heapSort();
  // Display time complexity information
  const timeComplexityElement = document.getElementById('timeComplexity');
  timeComplexityElement.innerHTML = `Comparisons: ${comparisons}, Array Accesses: ${accesses}`;
}


async function quickSort(start, end) {
  if (start < end) {
    // Partition the array and get the pivot index
    const pivotIndex = await partition(start, end);

    // Recursively sort the left and right subarrays
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
  }
}

async function partition(start, end) {
  const elements = document.querySelectorAll('.array-element');
  const pivotValue = parseInt(elements[end].innerText);
  let pivotIndex = start;

  for (let i = start; i < end; i++) {
    elements[i].style.backgroundColor = 'red';
    await sleep(500);
    accesses++;

    if (parseInt(elements[i].innerText) < pivotValue) {
      // Swap elements
      [elements[i].innerText, elements[pivotIndex].innerText] = [elements[pivotIndex].innerText, elements[i].innerText];
      elements[i].style.height = `${parseInt(elements[i].innerText) * 3}px`;
      elements[pivotIndex].style.height = `${parseInt(elements[pivotIndex].innerText) * 3}px`;
      await sleep(500);
      accesses++;

      pivotIndex++;
    }

    elements[i].style.backgroundColor = 'dodgerblue';
  }

  // Swap the pivot element with the element at pivotIndex
  [elements[pivotIndex].innerText, elements[end].innerText] = [elements[end].innerText, elements[pivotIndex].innerText];
  elements[pivotIndex].style.height = `${parseInt(elements[pivotIndex].innerText) * 3}px`;
  elements[end].style.height = `${parseInt(elements[end].innerText) * 3}px`;
  await sleep(500);
  accesses++;

  // Mark the pivot element
  elements[pivotIndex].style.backgroundColor = 'green';

  return pivotIndex;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startQuickSort() {
  comparisons = 0;
  accesses = 0;
  await quickSort(0, array.length - 1);
  // Display time complexity information
  const timeComplexityElement = document.getElementById('timeComplexity');
  timeComplexityElement.innerHTML = `Comparisons: ${comparisons}, Array Accesses: ${accesses}`;
}
async function startSorting(sortingAlgorithm) {
  switch (sortingAlgorithm) {
    case 'bubble':
      await bubbleSort();
      break;
    case 'selection':
      await selectionSort();
      break;
    case 'merge':
      await mergeSort();
      break;
    case 'quick':
      await quickSort();
      break;
    case 'heap':
      await heapSort();
      break;
    default:
      console.log('Invalid sorting algorithm');
      break;
  }
}