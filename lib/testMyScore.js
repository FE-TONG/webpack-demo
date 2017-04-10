
// 测试

function ceshi(funName,divide,result){
    if(divide.join('.')==result.join('.')){
        log(`参数是${funName.slice(9)} 得出结果是${divide} 猜测结果${result},这个函数${funName}成功`)
    }else{
        log(funName+"失败,参数是")
    }

}
// for(var i=-100;i<=0;i++){
//     ceshi(' _.first([9, 4, 3, 2, 1], 0)', _.first([9, 4, 3, 2, 1], -1) ,[]);
// }
// ceshi(' _.first([9, 4, 3, 2, 1], 0)', _.first([9, 4, 3, 2, 1], 0) ,[]);
// ceshi(' _.first([9, 4, 3, 2, 1], 1)', _.first([9, 4, 3, 2, 1], 1) ,[9]);
// ceshi(' _.first([9, 4, 3, 2, 1], 2)', _.first([9, 4, 3, 2, 1], 2) ,[9,4]);
// ceshi(' _.first([9, 4, 3, 2, 1], 3)', _.first([9, 4, 3, 2, 1], 3) ,[9, 4, 3]);
// ceshi(' _.first([9, 4, 3, 2, 1], 4)', _.first([9, 4, 3, 2, 1], 4) ,[9, 4, 3, 2]);
// ceshi(' _.first([9, 4, 3, 2, 1], 5)', _.first([9, 4, 3, 2, 1], 5) ,[9, 4, 3, 2, 1]);
// ceshi(' _.first([9, 4, 3, 2, 1], 6)', _.first([9, 4, 3, 2, 1], 6) ,[9, 4, 3, 2, 1]);
// ceshi(' _.first([9, 4, 3, 2, 1], 7)', _.first([9, 4, 3, 2, 1], 7) ,[9, 4, 3, 2, 1]);
