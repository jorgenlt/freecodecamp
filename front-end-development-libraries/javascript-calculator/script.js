const App = () => {
    const [expression, setExpression] = React.useState("");
    const [answer, setAnswer] = React.useState(0);

    const display = (symbol) => {
        setExpression(prev => prev + symbol);
    };

    const calculate = () => {
        setAnswer(eval(expression));
    };

    const allClear = () => {

    };

    const clear = () => {

    };

    return (
        <div className="container">
            <div className="grid">
                <div onClick={display} className="padButton" id="display">
                    <input type="text" value={expression} placeholder="0" disabled />
                </div>
                <div onClick={allClear} className="padButton" id="all-clear">AC</div>
                <div onClick={clear} className="padButton" id="clear">C</div>
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

ReactDOM.render(<App />, document.querySelector('#root'));