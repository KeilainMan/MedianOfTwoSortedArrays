


const nums1 = [1,2,4,6,17];
const nums2 = [15,66,78,81];

console.log(medianOfTwoSortedArrays(nums1, nums2));



function medianOfTwoSortedArrays(array1, array2){
    let sizeArray1 = array1.length;
    let sizeArray2 = array2.length;
    if(sizeArray1 > sizeArray2){return (medianOfTwoSortedArrays(array2, array1))} //binary search is always performed on the smaller array
    else {
        /*  Both arrays are devided into two parts. The parts are selected in a way, that the numbers on the left side are smaller,
            than the numbers of the other array on the right side of the divide:

            Array1      [1  3  4  |  7  11]     4 <= 6
            Array2      [   2  5  |  6  12]     5 <= 7
            
            If this is not the case the binary search is reiterated, changing the divide.
            */
        let leftHalf = Math.floor((sizeArray1 + sizeArray2 + 1) / 2);
        let lowBorder = 0;
        let highBorder = sizeArray1;
        while (lowBorder <= highBorder){
            let middleArray1 = Math.floor((lowBorder + highBorder) / 2);
            let middleArray2 = leftHalf - middleArray1;

            let leftArray1 = Number.MIN_SAFE_INTEGER; //cover the cases where one of the four numbers would be non-existent
            let leftArray2 = Number.MIN_SAFE_INTEGER;
            let rightArray1 = Number.MAX_SAFE_INTEGER;
            let rightArray2 = Number.MAX_SAFE_INTEGER;

            if(middleArray1 < sizeArray1){rightArray1 = array1[middleArray1]} // cover the cases where the middle index would be outside the array  
            if(middleArray2 < sizeArray2){rightArray2 = array2[middleArray2]}
            if((middleArray1 - 1) >= 0){leftArray1 = array1[middleArray1 - 1]}
            if((middleArray2 - 1) >= 0){leftArray2 = array2[middleArray2 - 1]}

            if(leftArray1 <= rightArray2 && leftArray2 <= rightArray1){ //check main condition 
                if((sizeArray1 + sizeArray2) % 2 === 1){
                    return Math.max(leftArray1, leftArray2); //return Median when odd
                } else{
                    return (Math.max(leftArray1, leftArray2) + Math.min(rightArray1, rightArray2)) / 2; //return Median when even
                }
            } else if(leftArray1 > rightArray2){  //shift the borders, that determine the binary search
                highBorder = middleArray1 - 1;
            } else{
                lowBorder = middleArray1 + 1;
            }
        }
    } return 0;

}

