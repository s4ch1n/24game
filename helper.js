function showresult(choise){
  var n1=parseFloat(document.getElementById('num1').value);
  var n2=parseFloat(document.getElementById('num2').value);
  var n3=parseFloat(document.getElementById('num3').value);
  var n4=parseFloat(document.getElementById('num4').value);

  var r = 10 ;
  var c=choise;
  var result = [n1, n2, n2,n4];
  document.getElementById('result').value = result.toString().replace(/,/g, '\n');
}
