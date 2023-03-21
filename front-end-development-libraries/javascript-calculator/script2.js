const App = () => {
    const [expression, setExpression] = React.useState("");
    const [answer, setAnswer] = React.useState(0);

    const display = (symbol) => {
        // console.log(`symbol is: ${symbol}`);
        // console.log(`expression is: ${expression}`);

        // const symbol = symbol.replace(/\s/g, "");
        // console.log(`symbol is: ${symbol}`);
        const regexDecimal = /[.]/g;
        const regexOperators = /[-+/*]/g;
        const regexOperatorsNoMinus = /[+/*]/g;
        
        let expressionSplitByOperator;
        let lastItemInExpression;
        let splitExpression;
        let splitExpressionLast;
        
        // checking if expression is a valid string
        if(typeof expression == 'string' ) {
            expressionSplitByOperator = expression.split(regexOperators);
            lastItemInExpression = expressionSplitByOperator[expressionSplitByOperator.length - 1];
            splitExpression = expression.split('');
            splitExpressionLast = splitExpression[splitExpression.length - 1];

            console.log('----------------------');
            console.log(`symbol is: ${symbol}`);
            console.log(`lastItemInExpression is: ${lastItemInExpression}`);
            console.log(`splitExpressionLast is: ${splitExpressionLast}`);
            console.log(`typeof splitExpressionLast is: ${typeof splitExpressionLast}`);
            console.log('----------------------');

            // console.log(lastItemInExpression.match(regexDecimal));
        };

        if(typeof expression == 'string') {
            if(symbol == '0' && expression == '0') {
                setExpression(prev => prev);
            } else if(typeof splitExpressionLast == 'string' && symbol.search(regexOperators) != -1 && splitExpressionLast.search(regexOperators) != -1)  {
                console.log(typeof splitExpressionLast == 'string');
                console.log(symbol.search(regexOperators) != -1);
                console.log(splitExpressionLast.search(regexOperators) != -1);

                if (symbol == '-' && splitExpressionLast != '-') {
                    setExpression(prev => prev + symbol);
                } else {
                    setExpression(prev => prev.substring(0, prev.length - 1) + symbol);
                }
            } else if(regexOperators.test(symbol)) {
                // setAnswer(math.evaluate(expression));
                setExpression(prev => prev + symbol);
            } else if(symbol == '.' && regexDecimal.test(lastItemInExpression)) {
                setExpression(prev => prev);
            } else {
                setExpression(prev => prev + symbol);
            };
        };







        // if(symbol == '.' && expression[expression.length - 1] == '.') {
        //     setExpression(prev => prev);
        // } else if(symbol == '.' && lastItemInExpression.match(regexDecimal)) {
        //     setExpression(prev => prev);
        // } else if(symbol == '0' && lastItemInExpression == '0') {
        //     setExpression(prev => prev);
        // } else if(symbol.match(regexOperators) && splitExpression[splitExpression.length - 1] == '-') {
        //     setExpression(prev => prev.substring(0, prev.length - 1) + symbol);
        // } else if(symbol.match(regexOperatorsNoMinus) && splitExpression[splitExpression.length - 1].match(regexOperatorsNoMinus)) {
        //     setExpression(prev => prev.substring(0, prev.length - 1) + symbol);
        // } else if(symbol == '-' && splitExpressionLast.match(regexOperators)) {
        //     setExpression(prev => prev + symbol);
        // } else {
        //     setExpression(prev => prev + symbol);
        // };

        // setExpression(prev => prev + symbol);

        // to be able to have double display and still passing the tests 
        const answerDiv = document.querySelector('.answer');
        const expressionDiv = document.querySelector('.expression');

        answerDiv.id = ''
        expressionDiv.id = 'display';
    };

    const calculate = () => {
        setAnswer(math.evaluate(expression));
        setExpression(math.evaluate(expression));
    };

    const allClear = () => {
        setExpression("");
        setAnswer(0);
        
        const answerDiv = document.querySelector('.answer');
        const expressionDiv = document.querySelector('.expression');

        expressionDiv.id = '';
        answerDiv.id = 'display'
    };

    const clear = () => {
        if(typeof expression == 'string' ) {
            setExpression(prev => prev.split('').slice(0, prev.length -1).join(''));
            setAnswer("");
        };
    };

    return (
        <div className="container">
            <div className="grid">
                <div onClick={display} className="padButton" id="display-box">
                    <div className="expression" id="">{expression}</div>
                    <div className="answer" id="">{answer}</div>
                </div>
                <div onClick={allClear} className="padButton" id="clear">AC</div>
                <div onClick={clear} className="padButton" id="all-clear">C</div>
                <div onClick={() => display("/")} className="padButton" id="divide">/</div>
                <div onClick={() => display("*")} className="padButton" id="multiply">x</div>
                <div onClick={() => display("7")} className="padButton" id="seven">7</div>
                <div onClick={() => display("8")} className="padButton" id="eight">8</div>
                <div onClick={() => display("9")} className="padButton" id="nine">9</div>
                <div onClick={() => display("-")} className="padButton" id="subtract">-</div>
                <div onClick={() => display("4")} className="padButton" id="four">4</div>
                <div onClick={() => display("5")} className="padButton" id="five">5</div>
                <div onClick={() => display("6")} className="padButton" id="six">6</div>
                <div onClick={() => display("+")} className="padButton" id="add">+</div>
                <div onClick={() => display("1")} className="padButton" id="one">1</div>
                <div onClick={() => display("2")} className="padButton" id="two">2</div>
                <div onClick={() => display("3")} className="padButton" id="three">3</div>
                <div onClick={calculate} className="padButton" id="equals">=</div>
                <div onClick={() => display("0")} className="padButton" id="zero">0</div>
                <div onClick={() => display(".")} className="padButton" id="decimal">.</div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);