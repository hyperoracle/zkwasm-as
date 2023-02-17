/**
 * dereference helper
 */
class PtrDeref{
    data:usize
    static read(ptr:usize):usize{
        return changetype<PtrDeref>(ptr).data;
    }
    static write(ptr:usize, val:usize):void{
        changetype<PtrDeref>(ptr).data = val;
    }
}

/**
 * Uint8Array with clean 'new' and fill without memory.fill
 */
export class Bytes extends Uint8Array{
    // clean/unsafe version of new Array<u8>(_len)
    static new(_len:i32): Bytes{
        // alloc Array<u8> mem
        var _bytes_ptr = heap.alloc(12); // offsetof<B>() == 12
        // alloc data mem
        var _arr_heap_ptr = heap.alloc(_len)
        // write data ptr to the 0th, 1st fields of Array<u8>
        PtrDeref.write(_bytes_ptr, _arr_heap_ptr);
        PtrDeref.write(_bytes_ptr+4, _arr_heap_ptr);

        var _bytes = changetype<Bytes>(_bytes_ptr);
        // write data len to the 2nd, 3rd fields of Array<u8>, equivalent to .length=_len
        PtrDeref.write(_bytes_ptr+8, _len);
        return _bytes;
    }
    fill(_val:u8=0): void{
        for (var i:i32=0; i<this.length; i++){
            this[i] = _val;
        }
        // this.arr.fill(_val)
    }
}

export function abort(a:usize, b:usize, c:u32, d:u32):void{}