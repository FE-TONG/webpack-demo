
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
    var nativeIsArray       = Array.isArray,
        nativeKeys          = Object.keys,
        nativeValues        = Object.values,
        nativeCreate        = Object.create;
    // 集合

    // 用于反复传入的函数回调
    function optimizeCb(func, context, argCount){
        if(context === undefined) return func;
        switch (argCount == null ? 3 : argCount) {     
            case 1: return function(value) {
                return func.call(context, value);
            };
            case 2: return function(value, key) {
                return func.call(context, value, key)
            }
            case 3: return function (value, key, collection){
                return func.call(value, key, collection)
            }
        }    
        return function() {
            return func.apply(context, arguments);
        };
        
    }
   
    // isArrayLike
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var isArrayLike = function(collection){
        var length = collection && collection.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    }
    _.each = _.foEach = (obj, iteratee, context)=>{
        iteratee = optimizeCb(iteratee, context)
        // 暂时考虑它是数组或对象
        var i,length;
        if(isArrayLike(obj)){
            for(i=0,length=obj.length;i<length;i++){
                iteratee(obj[i], i, obj)
            }
        }else{
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }     
        return obj;
    }

    // _.map
    _.map = _.collect = function(obj, iteratee, context) {
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
            log(keys,222)
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
    return results;     
        var arr = [];
        for(var i=0;i<obj.length;i++){
            arr.push(iteratee(obj[i], i, obj));
        } 
        return arr;
    }
    // 集合

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
                return  _.each(arg[0], sss)
            }else{
                newArray.push(arg[0])
            }
        }
        _.each(arr, sss);
        return newArray
    }
    _.without = (...arg)=>{
        function sss(...aa){
            for(var i=1;i<arg.length;i++){
                if(aa[0] === arg[i]){

                }
            }
        }
        _.each(arg[0], sss)
    } 
    _.union = ()=>{

    }

    // 函数
    _.bind = function(func, obj, arg){
        var arg = slice.call(arguments, 2);
        return function(){
            return func.apply(obj, arg)
        }
    }

    _.partial = function(func, arg) {

       
    }
    _.before = function(times, func) {
    
    };
    _.once = function(func){
      
    }
    _.once = _.partial(_.before, 2);
    // 对象
    var ObjString               = '[object Object]',
        ArrString               = '[object Array]',
        FunString               = '[object Function]',
        StrString               = '[object String]',
        NumSting                = '[object Number]',
        NullString              = '[object Null]',
        UndefSting              = '[object Undefined]',
        SymStrign               = '[object Symbol]',
        ArgString               = '[object Arguments]',
        ErrString               = '[object Error]',
        RegString               = '[object RegExp]',
        DateString              = '[object Date]',
        BooString               = '[object Boolean]';
   
    _.keys = function(obj){
        if(!_.isObject(obj)) return [];
        if(nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        return keys;
    }
    _.allKeys = function(obj){
        if(!_.isObject(obj)) return [];
        var keys = [];
        for (var key in obj) keys.push(key);
        return keys;
    }
    _.values = function(obj){
        // if(nativeValues) return nativeValues(obj);
        var keys = _.keys(obj);
        var length = keys.length;
        var values = [];
        for(var i=0;i<length;i++){
            values.push(obj[keys[i]])
        }
        return values;
    }
    _.mapObject = function(obj, iteratee, context) {
        _.each(obj, iteratee, context)
    }
    // 把一个对象转变为一个[key, value]形式的数组。
    _.pairs = function(obj){
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = [];
        for(var i=0;i<length;i++){
            pairs.push([keys[i], obj[keys[i]]]);
        }
        return pairs;
    }

    _.invert = function(obj){
        var keys = _.keys(obj);
        var length = keys.length;
        var invert = {};
        for(var i=0;i<length;i++){
            var prop = obj[keys[i]];
            invert[prop] = keys[i]
        }
        return invert
    }
    var Ctor = function(){};
    _.extend = function(destination, sources) {
        var keys = _.keys(sources);
        var length = keys.length;
        for(var i=0;i<length;i++){
            var prop = sources[keys[i]];
            destination[keys[i]] = prop;
        }
        return destination
    }
    _.extendOwn = function(destination, sources){
        var keys = _.keys(sources);
        var length = keys.length;
        for(var i=0;i<length;i++){
            var prop = sources[keys[i]];
            destination[keys[i]] = prop;
        }
        return destination
    }
    // An internal function for creating a new object that inherits from another.
    var baseCreate = function(prototype) {
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
    };
    _.create = function(prototype, props){
        var result = baseCreate(prototype)
        if(props) _.extendOwn(result, props)
        return result;
    }

    _.functions = _.methods = function(object){
        var keys = _.keys(object);
        return keys.sort();
    }
    
    // 等同于object.hasOwnProperty(key)，但是使用hasOwnProperty 函数的一个安全引用，以防意外覆盖。
    _.has = function(obj, key){
        return obj != null && hasOwnProperty.call(obj, key);
    }

    _.property = function(key){
        return function(obj){
            return obj==null ? undefined : obj[key];
        }
    }
    _.propertyOf = function(obj){
        return obj == null ? function(){} : function(key) {
            return obj[key];
        };

    }
    // 对象的判断
    _.isEqual = function(obj, other){
        if(obj === other || (_.isNaN(obj)&&_.isNaN(other))) return true;
        // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    _.isMatch = function(object, properties){
        var keys = _.keys(properties);
        var length = keys.length;
        if(!_.isObject(properties) || length == 0) return true;
        var obj = object;
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (properties[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    } 
    _.isEmpty = function(obj){
        if (obj == null) return true;
        if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
        return _.keys(obj).length === 0;
    } 
    _.isElement = function(obj){
        return !!(obj && obj.nodeType === 1);
    }
    _.isArray = function(obj){
        if(nativeIsArray) return nativeIsArray(obj)
        return toString.call(obj) === ArrString;
    }
    // 在JavaScript中 对象和数组都是 对象。所以数组在这里也属于
    // 返回Boolean  
    _.isObject = function(object){
        return toString.call(object) == ObjString ||  toString.call(object) == ArrString
    }
    _.isArguments = function(obj){
        return toString.call(obj) === ArgString;
    }
    _.isFunction = function(obj){
        return toString.call(obj) === FunString;
    }
    _.isString = function(obj){
        return toString.call(obj) === StrString;
    }
    _.isNumber = function(obj){
        return toString.call(obj) === NumSting;
    }
    _.isFinite = function(obj){
        return isFinite(obj) && !_.isNaN(obj)
    }
    _.isBoolean = function(obj){
        return toString.call(obj) === BooString;
    }
    _.isDate = function(obj){
        return toString.call(obj) === DateString;
    }
    _.isRegExp = function(obj){
        return toString.call(obj) === RegString;
    }
    _.isError = function(obj){
        return toString.call(obj) === ErrString;
    }
    _.isNaN = function(obj){
        return _.isNumber(obj) && (obj !== +obj) 
    }
    _.isNull = function(obj){
        return toString.call(obj) === NullString;
    }
    _.isUndefined = function(obj){
        return toString.call(obj) === UndefSting;
    }



}.call(this));