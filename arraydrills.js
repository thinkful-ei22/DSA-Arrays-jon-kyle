'use strict';

const Memory = require('./memory.js');
let memory = new Memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Index Error');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  pop() {
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Does Not Exist');
    }
    return memory.get(this.ptr + index);
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Does Not Exist');
    }
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.copy(this.ptr + index+ 1, this.ptr + index,this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Does Not Exist');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
  }
}
function main() {
  Array.SIZE_RATIO = 3;

  //create an instance of the array class
  let arr = new Array();

  //add an item to the array
  arr.push('tauhida');
  // arr.push(3);
  // arr.push(5);
  // arr.push(15);
  // arr.push(19);
  // arr.push(45);
  // arr.push(10);

  // arr.pop();
  // arr.pop();
  // arr.pop();


  // console.log(arr);
  console.log(arr.get(0));
}

main();

// Array { length: 1, _capacity: 3, ptr: 0 }
 
/*
 Array { length: 6, _capacity: 12, ptr: 3 }
 explain: length - is 6 because we have 6 new values, 
          capacity - is now 12, because we reach capacity after pushing 15,
          and this.length + 1 * a size ratio of 3 gives us 12.
          ptr - the array had to resize, which put the new value of ptr at memory address[3]
  
          after pop - length changes from 6 to 3 because we removed three values from the end
          capacity does not change because we never reached capacity, and only removed from the length.
          ptr does not change because we never resized the array, still pointing at the same address 


          The result from pushing Tauhida was NaN. NaN is the result because
          in the constructor of our memory class, memory is set to Float64Array which
          requires the values in the array to be numbers. Since we tried to push a string.
          it is converted to NaN, then stored in memory.

          When adding onto an array, we need to make sure we have sufficient 
          contiguous memory. The resize method will move our array in memory to
          a new space that meets the required contiguous size.
          It also frees the memory from the old space after it is copied.


 */