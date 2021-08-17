function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const exprArr = [];
    expr = expr.replace(/ /g, '');
    let valDig = "";

    for (let i = 0; i < expr.length; i++) {

        if (expr[i].charCodeAt(0) > 47 && expr[i].charCodeAt(0) < 58) {
            valDig += expr[i];

            if (i == expr.length - 1) {
                exprArr.push(+valDig);
            }
        }

        else if (expr[i].charCodeAt(0) > 39 || expr[i].charCodeAt(0) < 46){
            if (valDig) {
                exprArr.push(+valDig);
                valDig = "";
            }
            exprArr.push(expr[i]);
        }
    }

    function calculator (exprArr, actionArr) {      
        let index = 0;
        let acum = 0;

        for (let i of actionArr) {
            acum = 0;
            index = 0;
            if (i == "*") {
                index = exprArr.indexOf(i, index);
                acum = exprArr[index - 1] * exprArr[index + 1];
                exprArr.splice(index-1, 3, acum);
            }
            else if (i == "/") {
                index = exprArr.indexOf(i, index);
                if (exprArr[index - 1] / exprArr[index + 1] == Infinity || exprArr[index - 1] / exprArr[index + 1] == -Infinity) {
                    throw "TypeError: Division by zero.";
                }
                acum = exprArr[index - 1] / exprArr[index + 1];
                exprArr.splice(index-1, 3, acum);
                }
            else if (i == "+") {
                index = exprArr.indexOf(i, index);
                acum = exprArr[index - 1] + exprArr[index + 1];
                exprArr.splice(index-1, 3, acum);
            }
            else if (i == "-") {
                index = exprArr.indexOf(i, index);
                acum = exprArr[index - 1] - exprArr[index + 1];
                exprArr.splice(index-1, 3, acum);
            }
        }
        return exprArr[0];
    }


    function calculatorBracket(exprArr) {
        let checkBrackets = true;
        let acum = 0;

        while(checkBrackets) {
            acum = 0;
            if ( (exprArr.indexOf(")") < exprArr.indexOf("(")) || (exprArr.indexOf(")") != -1 &&exprArr.indexOf("(") == -1)) {
                throw "ExpressionError: Brackets must be paired";
            }
            if (exprArr.indexOf("(") == -1) {
                break;
            }

            let indexF = exprArr.lastIndexOf("(");
            let indexS = exprArr.indexOf(")", indexF);

            let actionArr = exprArr.slice(indexF, indexS).filter( i => {
                if (i == "*" || i == "/" || i == "-" || i == "+") return true;
            });
            actionArr = actionArr.sort((a, b) => {
                if ((b == '*' || b == '/') && (a == '-' || a == '+')) {
                    return 1;
                }
                else if ((b == '-' || b == '+') && (a == '*' || a == '/')) {
                    return -1;
                }});
      
            acum = calculator(exprArr.slice(indexF + 1, indexS), actionArr);
            exprArr.splice(indexF, indexS - indexF + 1, acum);

        }
        let actionArr = exprArr.filter( i => {
            if (i == "*" || i == "/" || i == "-" || i == "+") return true;
        });
        actionArr = actionArr.sort((a, b) => {
            if ((b == '*' || b == '/') && (a == '-' || a == '+')) {
                return 1;
            }
            else if ((b == '-' || b == '+') && (a == '*' || a == '/')) {
                return -1;
            }});

        return calculator(exprArr, actionArr);
    }

    return calculatorBracket(exprArr);
}

module.exports = {
    expressionCalculator
}