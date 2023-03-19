const audio = [
    {
        keyCode: 81,
        keyTrigger: "Q",
        id: "Heater-1",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    }, 
    {
        keyCode: 87,
        keyTrigger: "W",
        id: "Heater-2",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    }, 
    {
        keyCode: 69,
        keyTrigger: "E",
        id: "Heater-3",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    }, 
    {
        keyCode: 65,
        keyTrigger: "A",
        id: "Heater-4",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    }, 
    {
        keyCode: 83,
        keyTrigger: "S",
        id: "Clap",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    }, 
    {
        keyCode: 68,
        keyTrigger: "D",
        id: "Open-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    }, 
    {
        keyCode: 90,
        keyTrigger: "Z",
        id: "Kick-n'-Hat",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    }, 
    {
        keyCode: 88,
        keyTrigger: "X",
        id: "Kick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    }, 
    {
        keyCode: 67,
        keyTrigger: "C",
        id: "Closed-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
];

const App = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div id="drum-machine" className="drum-wrapper d-flex justify-content-center flex-column p-2">
                <h1 className="text-center">Drum Machine</h1>
                <div>
                    {audio.map(clip => (
                        <Pad key={clip.id} clip={clip} />
                    ))}
                </div>
                <div id="display" className="text-center"></div>
            </div>
        </div>
        );
};
    
const Pad = ({clip}) => {
    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    const handleKeyPress = e => {
        if(e.keyCode === clip.keyCode) {
            playSound();

        };
    };

    const playSound = () => {
        const tag = document.querySelector(`#${clip.keyTrigger}`);
        tag.currentTime = 0;
        tag.play();
        tag.parentNode.classList.add('change-bg');
        setTimeout(() => tag.parentNode.classList.remove('change-bg'), 200);
        const display = document.querySelector('#display');
        display.innerHTML = clip.id;
    };

    return (
        <div id={clip.id} onClick={playSound} className="drum-pad btn btn-primary p-3 m-2">
            <audio className="clip" id={clip.keyTrigger} src={clip.url} />
            {clip.keyTrigger}
        </div>
    );
}; 
    
ReactDOM.render(<App/ >, document.querySelector('#root'));