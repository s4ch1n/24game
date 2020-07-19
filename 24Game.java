import java.io.*;
import java.util.*;

class Solution {

    // 4 1 8 7 Has two solutions
    // (4-1)*8*1   (8-4)*(7-1)

    //8-4 * 7-1
    //(8-4)*(7-1)

    List<List<Integer>> permuts ;
    List<List<Character>> opslist ;
    public boolean judgePoint24(int[] nums) {
        permuts = new ArrayList<>();
        opslist = new ArrayList<>();
        getPermutations(nums, 0, new ArrayList<>(), new boolean[nums.length]);
        //System.out.println(permuts);

        char [] ops = {'+', '-', '/', '*'};

        getPermutationsOps(ops, 0, new ArrayList<>());

        /*
        [3,9,7,7]
        [1,9,1,2]
        [1,3,4,6]
        [3,5,1,1]
        [3,3,8,8]
        */

        boolean returnVal = false;

        //List<Integer> numList = new ArrayList<>();
        //numList.add(8);numList.add(3); numList.add(8); numList.add(3);
        //return evaluateAndCheck(numList, opslist) ;
        for(List<Integer> permut : permuts)
            if(evaluateAndCheck(permut, opslist))
                returnVal = true;
        return returnVal;

        //System.out.println(opslist);
        //return true;
    }


    public double operation(double x, double y, char op){
        if(op == '+')
            return (double)(x + y);
        else if(op == '-')
            return (double)(x -y);
        else if(op == '*')
            return (double)(x * y);
        else
            return (double)(x / y);
    }

    public boolean evaluateAndCheck(List<Integer> num, List<List<Character>> ops) {

        boolean returnVal = false;
        for(List<Character> opsline : ops){
            char op1 = opsline.get(0); char op2 = opsline.get(1); char op3 = opsline.get(2);

            int n1 = num.get(0) ;
            int n2 = num.get(1) ;
            int n3 = num.get(2) ;
            int n4 = num.get(3) ;

            // (A op1 B op2 C op3 D)
            double result1 = operation((double) n1, (double) n2, op1);
            result1 = operation(result1,(double) n3, op2);
            result1 = operation(result1,(double) n4, op3);

            //(A op1 B) op2 (D op3 D)
            double result21 = operation((double) n1, (double) n2, op1);
            double result22 = operation((double) n3, (double) n4, op3);
            double result2 = operation(result21, result22, op2);

            // (A op1 ( B op2 ( C op3 D )))
            double result31 = operation((double) n3, (double) n4, op3);
            result31 = operation(n2, result31, op2);
            double result3 = operation(n1, result31, op1);

            double twentyFour = 24.0d;

            if(Math.abs(result1 - 24.0d) < 0.01) {
              returnVal = true;
              System.out.println("" + n1 + op1 + n2 +op2+ n3 + op3 + n4 );
            }

            if(Math.abs(result2 - 24.0d) < 0.01) {
              returnVal = true;
              System.out.println("(" + n1 + op1 + n2 +")"+op2+ "("+n3 + op3 + n4 + ")" );
            }

            if(Math.abs(result3 - 24.0d) < 0.01) {
              returnVal = true;
              System.out.println(result3);
              System.out.println("(" + n1 + op1 +"("+ n2 +op2+ "("+n3 + op3 + n4 + "))" );
            }

        }
        return returnVal;
    }

    public void getPermutations(int [] nums, int offset, List<Integer> tmpList, boolean[] visisted) {

        if(offset == 4 ) {
            //System.out.println(tmpList + " : ") ;
            permuts.add(new ArrayList<>(tmpList));
            return ;
        }

        for(int i=0; i<4; i++){
            if(visisted[i])
                continue;
            visisted[i] = true;
            tmpList.add(nums[i]);
            getPermutations(nums, offset+1, tmpList,visisted);
            visisted[i] = false;
            tmpList.remove(tmpList.size()-1);
        }
    }

    public void getPermutationsOps(char[] ops, int offset, List<Character> tmpList) {
        if(offset == 3 ) {
            //System.out.println(tmpList + " : ") ;
            opslist.add(new ArrayList<>(tmpList));
            return ;
        }

        for(int i=0; i<4; i++){
            //if(visisted[i])
            //    continue;
            //visisted[i] = true;
            tmpList.add(ops[i]);
            getPermutationsOps(ops, offset+1, tmpList);
            //visisted[i] = falsex`x`;
            tmpList.remove(tmpList.size()-1);
        }
    }

}
