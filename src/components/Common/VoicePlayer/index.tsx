import * as React from "react";
import {useEffect} from "react";


const VoicePlayer = (props:any) => {
    const { text = '' } = props;
    const { isClickPlaying = false, setIsClickPlaying } = props;
    let voices :any[] = [];

    useEffect(()=>{
        if (voices?.length) {
            setIsClickPlaying(false);
            return;
        }
        voices = text.split('').map((char :string) => `./src/public/${char}.wav`);
        playAudio();
    }, [isClickPlaying]);

    const playAudio = () => {
        if (!voices?.length) {
            setIsClickPlaying(false);
            return;
        }
    
        const voice = voices.shift();

        try {
            const audio = new Audio(voice);
            audio.play();
            audio.addEventListener("ended", async () => {
                playAudio();
            });
        } catch (error) {
            playAudio();
        }
    };

    return <></>;
};

export default VoicePlayer;