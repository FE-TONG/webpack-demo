
// 2017年4月8日14:23:10
// version 0.0.1
(function(){
    var root = this;
    var log = console.log;

    this._ = {};
    var [ArrayProto, ObjProto, FuncProto] = [
        Array.prototype, Object.prototype, Function.prototype
    ]

    var [push, slice, toString, hasOwnProperty] = [
        ArrayProto.push, ArrayProto.slice, ObjProto.toString, ObjProto.hasOwnProperty
    ];
    var nativeIsArray      = Array.isArray;

   
    _.each = _.foEach = (obj, iteratee, context)=>{
        // 暂时考虑它是数组或对象
        if(nativeIsArray(obj)){ // 数组
            log('arr')
            for(var i=0;i<obj.length;i++){
                iteratee(obj[i], i, obj)
            }        
        }else { // 对象
            log('Object')
            for(var i in obj){
                obj.hasOwnProperty(i) && iteratee(obj[i], i, obj)
            }
        }
        return obj;
    }


    _.map = function(obj, iteratee, context){
        var arr = [];
        for(var i=0;i<obj.length;i++){
            arr.push(iteratee(obj[i], i, obj));
        } 
        return arr;
    }

    // 数组
    function filterArray(arr, n){
        if(n <= 0){
            n = 0
        }else{
            n = n || 1;
        }
        if(n>=arr.length){
            n = arr.length
        }
        return n;
    }
    _.first = function(arr, n){
        n = filterArray(arr, n)
        if(nativeIsArray(arr)){
            return arr.slice(0, n)
        }
    }
    _.initial = function(arr, n){
        n = filterArray(arr, n)
        if(nativeIsArray(arr)){
            return arr.slice(0, arr.length-n)
        }
    }
    _.last = function(arr, n){
        n = filterArray(arr, n)
        if(nativeIsArray(arr)){
            return arr.slice(arr.length-n) 
        }
    }
    _.rest = function(arr, i){
        n = n || 1;
        return arr.slice(i) 
    }
    _.compact = (arr) =>{
        var newArray = [];
        for(var i=0;i<arr.length;i++){
            arr[i] && newArray.push(arr[i])
        }
        return newArray;
    }   
  
    _.flatten = (arr, shallow)=>{ // 暂时不做
        var newArray = [];
        var index=0;
        function sss(...arg){  // 迭代器
            if(nativeIsArray(arg[0])){
                if(shallow)
                return _.each(arg[0], sss)
            }else{
                newArray.push(arg[0])
            }
        }
        _.each(arr, sss);
        return newArray
    }
    _.without = (...arg)=>{
    
    } 
    _.union = ()=>{

    }








}.call(this));