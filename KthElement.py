# Name: Peyton Wiederspan
# Date: 10-11-2021
# Description: A function which takes two sorted arrays and a position
# as parameters and returns the element at that position in the combined array using
# the Divide and Conquer method.

def kthElement(arr1, arr2, k):
    full = merge(arr1, arr2)
    for i in range(len(full)):
        if i == k:
            return full[i-1]

def merge(arr1, arr2):
    if arr1 and arr2:
        if arr1[0] > arr2[0]:
            temp = arr1
            arr1 = arr2
            arr2 = temp
        return [arr1[0]] + merge(arr1[1:], arr2)
    return arr1+arr2