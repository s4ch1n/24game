function showresult(choise){
  var n1=parseFloat(document.getElementById('num1').value);
  var n2=parseFloat(document.getElementById('num2').value);
  var n3=parseFloat(document.getElementById('num3').value);
  var n4=parseFloat(document.getElementById('num4').value);

  var r = 10 ;
  var c=choise;

  // Call num permutation
  var nums = [n1, n2, n3,n4];
  var numPermutes = [];
  var tmpRes = [];

  let visited1 = new Array(nums.length).fill(false);
  getPermutationsNum(nums, 0, visited1, tmpRes, numPermutes);

  // Call ops permutation
  var tmpRes2 = [];
  var opsPermute = [];
  var ops = ['+', '-', '*', '/'];
  console.log("Ops Permute " + ops);

  getPermutationsOps(ops, 0, tmpRes2, opsPermute);

  var result = "";

  var hasResult = false;
  var finalResult = [];

  for(let i=0; i<numPermutes.length; i++){
    if(evaluateAndCheck(numPermutes[i], opsPermute, finalResult));
      hasResult = true;
  }

  if(hasResult){
    for(let i=0; i<finalResult.length; i++)
      result = result + finalResult[i] + "\n";
  }
  else {
    result = "No Results available";
  }

  console.log(result);
  document.getElementById('result').value = result;

}

function evaluateAndCheck(numPermute, opsPermute, result){
  var retVal = false;
  for(let i=0; i<opsPermute.length; i++){
    var op1 = opsPermute[i][0]; var op2 = opsPermute[i][1]; var op3 = opsPermute[i][2];

    var n1 = numPermute[0];
    var n2 = numPermute[1];
    var n3 = numPermute[2];
    var n4 = numPermute[3];

    // (A op B op C op D)
    var result1 = executeTwo(n1, n2, op1);
    result1 = executeTwo(result1, n3, op2);
    result1 = executeTwo(result1, n4, op3);

    //(A op B) op (D op D)
    var tmpResult21 = executeTwo(n1, n2, op1);
    var tmpResult22 = executeTwo(n3, n4, op3);
    var result2 = executeTwo(tmpResult21, tmpResult22, op2);

    // (A op1 ( B op2 ( C op3 D )))
    var tmpRes31 = executeTwo(n3, n4, op3);
    var tmpRes31 = executeTwo(n2, tmpRes31, op2);
    var result3 = executeTwo(n1, tmpRes31, op1);

    var TWENTY_FOUR = 24.0;

    if(Math.abs(result1 - TWENTY_FOUR) < 0.01){
      retVal = true;
      console.log("Result : " + n1 + op1 + n2 +op2+ n3 + op3 + n4);
      result.push("" + n1 + op1 + n2 +op2+ n3 + op3 + n4 );
    }

    if(Math.abs(result2 - TWENTY_FOUR) < 0.01){
      retVal = true;
      console.log("Result : (" + n1 + op1 + n2 +")"+op2+ "("+n3 + op3 + n4 + ")")
      result.push("(" + n1 + op1 + n2 +")"+op2+ "("+n3 + op3 + n4 + ")");
    }

    if(Math.abs(result3 - TWENTY_FOUR) < 0.01){
      retVal = true;
      console.log("Result : (" + n1 + op1 +"("+ n2 +op2+ "("+n3 + op3 + n4 + "))" );
      result.push("(" + n1 + op1 +"("+ n2 +op2+ "("+n3 + op3 + n4 + "))");
    }
  }

  return retVal;
}

function executeTwo(x, y, op) {
  if(op == '+')
    return x+y;
  if(op == '-')
    return x-y;
  if(op == '*')
    return x*y;
  else
    return x/y;
}

function getPermutationsNum(nums, offset, visited, tmpRes,result){
  if(offset == 4){
    result.push(tmpRes.slice());
    return;
  }
  for(let i=0; i<4; i++){
    if(visited[i])
      continue;
    visited[i] = true;
    tmpRes.push(nums[i]);
    getPermutationsNum(nums, offset+1, visited, tmpRes, result);
    visited[i] = false;
    tmpRes.pop();
  }
}

function getPermutationsOps(ops, offset, tmpRes, result){
  if(offset == 3){
    result.push(tmpRes.slice());
    return;
  }

  for(let i=0; i<3; i++){
    tmpRes.push(ops[i]);
    getPermutationsOps(ops, offset+1, tmpRes, result);
    tmpRes.pop();
  }
}
