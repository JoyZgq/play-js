// javascript 排序算法

/**
 * ---冒泡排序
 * ---平均时间复杂度 O(n^2)
 * ---稳定
 */

function bubbleSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
      }
    }
  }
  return array;
}

/**
 * ---选择排序
 * ---平均时间复杂度 O(n^2)
 * ---不稳定
 */

function selectionSort(array) {
  const length = array.length;
  let min, temp;
  for (let i = 0; i < length; i++) {
    min = i;
    for (let j = i + 1; j < length; j++) {
      if (array[i] > array[j]) {
        min = j;
      }
    }
    temp = array[i];
    array[i] = array[min];
    array[min] = temp;
  }
  return array;
}
/**
 * ---插入排序
 * ---平均时间复杂度 O(n^2)
 * ---稳定
 */
function insertionSort(array) {
  const length = array.length;
  let pre, curr;
  for (let i = 0; i < length; i++) {
    pre = i - 1;
    curr = array[i];
    while (pre >= 0 && array[pre] > curr) {
      array[pre + 1] = array[pre];
      pre--;
    }
    array[pre + 1] = curr;
  }
  return array;
}
/**
 * ---希尔排序(插入排序的一种更高效的改进版本)
 * ---平均时间复杂度 O(n*logn)
 * ---不稳定
 * 
 */
function shellSort(array) {
  const length = array.length;
  let temp,
    step = 1;
  while (step < length / 3) {
    step = step * 3 + 1;
  }
  for (step; step > 0; step = Math.floor(step / 3)) {
    for (let i = step; i < length; i++) {
      temp = array[i];

      for (let j = i - step; j >= 0 && array[i] > temp; j -= step) {
        array[j + step] = step;
      }
    }
  }
  return array;
}
/**
 * ---归并排序
 * ---平均时间复杂度 O(n*logn)
 * ---稳定
 * ---分治
 */
function mergeSort(array) {  // 采用自上而下的递归方法
  const length = array.length;
  if (length < 2) {
    return array;
  }
  let middle = Math.floor(length / 2),
    left = array.slice(0, middle),
    right = array.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }

    while (left.length)
      result.push(left.shift());

    while (right.length)
      result.push(right.shift());

    return result;
  }
  /**
   * ---快速排序
   * ---平均时间复杂度 O(n*logn)
   * ---不稳定
   */
  function quickSort(arr, l, r) {
    let len = arr.length,
      partitionIndex,
      left = (typeof l != 'number') ? 0 : l,
      right = (typeof r != 'number') ? len - 1 : r;

    if (left < right) {
      partitionIndex = partition(arr, left, right);
      quickSort(arr, left, partitionIndex - 1);
      quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
  }

  function partition(arr, left, right) {     // 分区操作
    let pivot = left,                      // 设定基准值（pivot）
      index = pivot + 1;
    for (let i = index; i <= right; i++) {
      if (arr[i] < arr[pivot]) {
        swap(arr, i, index);
        index++;
      }
    }
    swap(arr, pivot, index - 1);
    return index - 1;
  }

  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  function partition2(arr, low, high) {
    let pivot = arr[low];
    while (low < high) {
      while (low < high && arr[high] > pivot) {
        --high;
      }
      arr[low] = arr[high];
      while (low < high && arr[low] <= pivot) {
        ++low;
      }
      arr[high] = arr[low];
    }
    arr[low] = pivot;
    return low;
  }

  function quickSort2(arr, low, high) {
    if (low < high) {
      let pivot = partition2(arr, low, high);
      quickSort2(arr, low, pivot - 1);
      quickSort2(arr, pivot + 1, high);
    }
    return arr;
  }
  /**
   * ---堆排序
   * ---平均时间复杂度 O(n*logn)
   * ---不稳定
   */
  let len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

  function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (let i = Math.floor(len / 2); i >= 0; i--) {
      heapify(arr, i);
    }
  }

  function heapify(arr, i) {     // 堆调整
    let left = 2 * i + 1,
      right = 2 * i + 2,
      largest = i;

    if (left < len && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest != i) {
      swap(arr, i, largest);
      heapify(arr, largest);
    }
  }

  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function heapSort(arr) {
    buildMaxHeap(arr);

    for (let i = arr.length - 1; i > 0; i--) {
      swap(arr, 0, i);
      len--;
      heapify(arr, 0);
    }
    return arr;
  }
  /**
   * ---计数排序
   * ---平均时间复杂度 O(n+k)
   * ---稳定
   */
  function countingSort(arr, maxValue) {
    let bucket = new Array(maxValue+1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;

    for (let i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (let j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }

    return arr;
}
  /**
   * ---桶排序
   * ---平均时间复杂度 O(n+k)
   * ---稳定
   */
  function bucketSort(arr, bucketSize) {
    if (arr.length === 0) {
      return arr;
    }

    let i;
    let minValue = arr[0];
    let maxValue = arr[0];
    for (i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
          minValue = arr[i];                // 输入数据的最小值
      } else if (arr[i] > maxValue) {
          maxValue = arr[i];                // 输入数据的最大值
      }
    }

    //桶的初始化
    let DEFAULT_BUCKET_SIZE = 5;            // 设置桶的默认数量为5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;   
    let buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
    }

    arr.length = 0;
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
        for (let j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);                      
        }
    }

    return arr;
}
  /**
   * ---基数排序
   * ---平均时间复杂度 O(n*k)
   * ---稳定
   */
  //LSD Radix Sort
let counter = [];
function radixSort(arr, maxDigit) {
    let mod = 10;
    let dev = 1;
    for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(let j = 0; j < arr.length; j++) {
            let bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]==null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        let pos = 0;
        for(let j = 0; j < counter.length; j++) {
            let value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    return arr;
}

  (function () {
    const array = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    console.log("原始数据：" + array);
    //    bubbleSort(array);
    //    console.log("冒泡排序后："+array);
    //   selectionSort(array);
    //   console.log("选择排序后：" + array);
    console.log(insertionSort(array));
  })