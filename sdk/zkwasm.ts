import { Bytes } from "./type";

// used in asc to rm env.abort
function abort(a:usize, b:usize, c:u32, d:u32):void{}

@external("env", "wasm_input")
declare function wasm_input(x: i32): i64

@external("env", "require")
export declare function require(x: i32): void

export function wasm_private_input(): i64
{
  return wasm_input(0);
}

export function wasm_public_input(): i64
{
  return wasm_input(1);
}

export function read_bytes_from_u64(dst: Bytes, byte_length: i32): Bytes {
    // var a:u64 = ;
    // console.log(a.toString(16))
    var dst64 = changetype<Uint64Array>(dst);
    for (var i:i32 = 0; i * 8 < byte_length; i++)
    {
        if (i * 8 + 8 < byte_length)
        {
            dst64[i] = wasm_public_input();
        }
        else
        {
            // less then 16 bytes on demand
            var u64_cache = wasm_public_input();
            var u8_cache: i64 = u64_cache;
            for (var j:i32 = i * 8; j < byte_length; j++)
            {
                let u8_t =  u8_cache as u8;
                dst[j] = u8_t;
                u8_cache = u8_cache >> 8
            }
        }
    }
    return dst;
}