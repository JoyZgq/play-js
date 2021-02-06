 /**
  *  javascript 排序算法
  */

  /**
   * ---冒泡排序
   * ---平均时间复杂度 O(n^2)
   * ---稳定
   */

   function bubbleSort(array) {
       const length = array.length;
       for (let i = 0; i < length; i++) {
           for (let j = 0; j < length-1; j++) {
              if (array[j]>array[j+1]) {
                  const temp = array[j+1];
                  array[j+1] = array[j];
                  array[j]=temp;
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
       let min,temp;
       for (let i = 0; i < length; i++) {
           min=i;
          for (let j = i+1; j <length; j++) {
              if(array[i] > array[j]){
                min = j;
              }
          }
          temp = array[i];
          array[i] = array[min];
          array[min] = temp;
       } 
       return array;
   }

   (function (){
       const array = [9,8,7,6,5,4,3,2,1,0];
       console.log('原始数据：'+array);
    //    bubbleSort(array);
    //    console.log("冒泡排序后："+array);
        selectionSort(array);
        console.log('选择排序后：'+array);
   })()